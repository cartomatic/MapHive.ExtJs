'use strict';

const {execFile} = require('child_process');
const fs = require('fs');
const stripJsonComments = require('strip-json-comments');
const ncp = require('ncp').ncp;
const archiver = require('archiver');
const request = require('request');
const cp = require('child_process');
const compressor = require('node-minify');

/**
 * whether or not command has the test switch
 */
const hasTestSwitch = () => {
    return process.argv[3] && process.argv[3] === 'test';
}

/**
 * whether or not comand has the promote switch
 */
const hasLiveSwitch = () => {
    return process.argv[3] && process.argv[3] === 'live';
}


//content of app.json
var appJson = null;

/**
 * extracts app name off the app.json
 */
const readAppJson = () => {
    if (!appJson) {
        appJson = JSON.parse(stripJsonComments(fs.readFileSync(getCmdRoot() + '/app.json', 'utf8')));
    }
}

/**
 * gets application name as declared in app.json
 */
const getAppName = () => {
    readAppJson();
    return appJson.name;
}

const getBuildProfiles = () => {
    readAppJson();
    return appJson.builds;
}

/**
 * gets application build directory for the appropriate build type (production / testing)
 */
const getBuildDirectory = () => {
    return getCmdRoot() + '\\build\\' + (hasTestSwitch() ? 'testing' : 'production') + '\\' + getAppName();
}

/**
 * extracts application root path off the cmd command
 */
const getCmdRoot = () => {
    //second param should be a root path of the app
    return process.argv[2];
}

//deployer confoguration
var deployerConfiguration = null;

/**
 * reads deployer confoguration json
 */
const readDeployerConfigurationJson = () => {
    if (!deployerConfiguration) {
        var appRoot = getCmdRoot();
        deployerConfiguration = JSON.parse(stripJsonComments(fs.readFileSync(appRoot + '/deployer-configuration.json', 'utf8')));
    }
}

/**
 * gets application deploy id off the deploy confoguration
 */
const getAppDeployId = () => {
    readDeployerConfigurationJson();
    return deployerConfiguration.appId;
}

/**
 * gets application deploy url off the deploy configuration
 */
const getAppDeployUrl = () => {
    readDeployerConfigurationJson();
    return deployerConfiguration.endPoint;
}

/**
 * trims line ends
 * @param {any} input
 */
const trimLineEnds = (input) =>
{
    //i know, could use a regex
    return input.replace('\r', '').replace('\n', '');
}

//this is a tag name, commits since tag if tag present and sha of last commit
var appVersion;

/**
 * extracts app version off the git repo
 */
const getAppVersion = () => {
    return new Promise((resolve, reject) => {

        readDeployerConfigurationJson();

        try {
            process.chdir(getCmdRoot() + deployerConfiguration.gitRepo);
        } catch (err) {
            console.error(`chdir: ${err}`);
        }


        cp.exec('git describe --tags --abbrev=0',
            function (err, stdout) {
                appVersion = (stdout == '' ? 'not-tagged' : trimLineEnds(stdout));

                var tagcountCmd = 'git rev-list --count HEAD';
                if (appVersion !== 'not-tagged') {
                    tagcountCmd = `git rev-list --count ${appVersion}^..HEAD`;
                }

                cp.exec(tagcountCmd,
                    function (err, stdout) {

                        appVersion += '-' + trimLineEnds(stdout);

                        cp.exec('git rev-parse --short HEAD',
                            function (err, stdout) {
                                appVersion += '-' + trimLineEnds(stdout);


                                console.log('App Version: ' + appVersion);
                                resolve();
                            });
                    });
            });
    });
}

var mapHiveVersion;

/**
 * extracts map hive version off its git repo; simpler than app version as maphive has already been tagged
 */
const getMapHiveVersion = () => {
    return new Promise((resolve, reject) => {
    readDeployerConfigurationJson();

        try {
            process.chdir(getCmdRoot() + '\\packages\\local\\mh');
        } catch (err) {
            console.error(`chdir: ${err}`);
        }

        cp.exec('git describe --tags', function (err, stdout) {

            //should really have map hive version here....
            mapHiveVersion = trimLineEnds(stdout);

            console.log('MapHive Version: ' + mapHiveVersion);
            resolve();
        });
    });
}

//deploy branch name
var branchName;

/**
 * extracts branch name off a git repo
 */
const getBranchName = () => {
    return new Promise((resolve, reject) => {
        readDeployerConfigurationJson();

        var cp = require('child_process');

        try {
            process.chdir(getCmdRoot() + deployerConfiguration.gitRepo);
        } catch (err) {
            console.error(`chdir: ${err}`);
        }

        cp.exec('git rev-parse --abbrev-ref HEAD',
            function (err, stdout) {
                branchName = stdout.replace('\r', '').replace('\n', '');
                resolve();
            });
    });
}

/*
 * builds extjs app in either production or testing mode
 */
const buildExtJsApp = () => {
    return new Promise((resolve, reject) => {

        try {
            process.chdir(getCmdRoot());
        } catch (err) {
            console.error(`chdir: ${err}`);
        }

        var params = ['app', 'build'];
        if (hasTestSwitch()) {
            params.push('testing');
        }

        console.log('Executing sencha build....');

        execFile('sencha', params, (error, stdout, stderr) => {
            if (error instanceof Error) {
                throw error;
            }
                
            process.stderr.write(stderr);
            process.stdout.write(stdout);
            
            resolve();
        });
    });
}


/**
 * copies a file
 * @param {any} src
 * @param {any} dst
 */
const copyFile = (src, dst) => {
    console.log(`copying ${src} to ${dst}...`);
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

/**
 * copies a directory
 * @param {any} src
 * @param {any} dest
 */
const copyDir = (src, dest) => {
    return new Promise((resolve, reject) => {
        console.log(`copying ${src} to ${dest}...`);
        ncp(src, dest, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

/**
 * copies js libs to build dir
 */
const copyJsLibs = () => {
    return new Promise((resolve, reject) => {

        var root = getCmdRoot();
        var dest = getBuildDirectory();

        if (fs.existsSync(root + '\\jslibs')) {
            copyDir(root + '\\jslibs', dest + '\\jslibs')
                .then(resolve);
        } else {
            resolve();
        }

    });
}

/**
 * copies app resources to build directory
 */
const copyResources = () => {
    return new Promise((resolve, reject) => {
        var root = getCmdRoot();
        
        var dest = getBuildDirectory();

        
        //compress maphive bootstrap for the live version
        var compressBootstrap = compressor.minify({
            compressor: 'uglifyjs',
            input: root + '\\packages\\local\\mh\\bootstrap\\bootstrap.js',
            output: dest + '\\maphive-bootstrap.js'
        });

        //just grab build profiles - if they are present this is a multi profile build
        var buildProfiles = getBuildProfiles();

        //for test build using a testing bootstraper and it loads bootstrap.json, not app.json...
        //this is true for single profile builds
        if (hasTestSwitch() && !buildProfiles) {
            copyFile(dest + '\\app.json', dest + '\\bootstrap.json');    
        }

        copyDir(root + '\\splash', dest + '\\splash')
            .then(copyDir(root + '\\config', dest + '\\config'))
            .then(copyJsLibs)
            .then(compressBootstrap)
            .then(resolve);
    });
}

const extractExtBuildProfilePicker = () => {
    return new Promise((resolve, reject) => {

        //if there are no build profiles ignore the
        if(!getBuildProfiles()){
            resolve();
            return;
        }

        var dst = getBuildDirectory();

    //read the html first
    var html = fs.readFileSync(dst + '\\index.html').toString();

    var startIdx = html.indexOf('//app-build-profile-switcher');
    var endIdx = html.indexOf('//eo-app-build-profile-switcher');

    var bootstrap = html.substr(
        startIdx,
        endIdx - startIdx
    );

    fs.writeFileSync(dst + '\\..\\build-profile-bootstrap.js', bootstrap);

    var compressBootstrap = compressor.minify({
        compressor: 'uglifyjs',
        input: dst + '\\..\\build-profile-bootstrap.js',
        output: dst + '\\build-profile-bootstrap.js'
    });




    console.log('build-profile-bootstrap.js bootstrap extracted');

    resolve();
});
}

/**
 * extracts an ext bootstrap to a file - reads it off html (default bootstrap output for extjs cmd)
 */
const extractExtBootstrap = () => {
    return new Promise((resolve, reject) => {

        var dst = getBuildDirectory();

        //read the html first
        var html = fs.readFileSync(dst + '\\index.html').toString();

        var startIdx = html.indexOf('var Ext=Ext');
        //not minified, so need to customise... bugger; testing build after all ;)
        if (hasTestSwitch()) {
            startIdx = html.indexOf('var Ext = Ext');
        }
        var endIdx = html.indexOf('</script>-->');

        var bootstrap = html.substr(
            startIdx,
            endIdx - startIdx
        );
        
        fs.writeFileSync(dst + '\\bootstrap.js', bootstrap);
        console.log('ext.js bootstrap extracted');

        resolve();
    });
}

/**
 * cleans up index.html - fixes script refs, so app works as expected
 */
const cleanupAndFixScripts = () => {
    return new Promise((resolve, reject) => {

        var dst = getBuildDirectory() + '\\index.html';

        //read the html first
        var html = fs.readFileSync(dst).toString();

        var removeIdxStart = html.indexOf('<!--cleanup_begin-->');
        var removeIdxEnd = html.indexOf('<!--cleanup_end-->') + '<!--cleanup_end-->'.length;

        var firstPart = html.substring(0, removeIdxStart);
        var secondPart = html.substring(removeIdxEnd);

        //add production map hive bootstrap script

        var newHtml =
            [
                `<!--${getAppName()} :: ${appVersion}-->`,
                `<!--MapHive :: ${mapHiveVersion}-->`,
                firstPart,
                `    <script type="text/javascript" src="mh/resources/jsLibs/pako/1.0.6/pako.min.js"></script>`,
                `    <link rel="stylesheet" href="mh/resources/jsLibs/color-picker/color-picker.min.css" type="text/css">`,
                `    <script type="text/javascript" src="mh/resources/jsLibs/color-picker/color-picker.min.js"></script>`,
                `    <script type="text/javascript" src="build-profile-bootstrap.js?r=${new Date().getTime()}"></script>`,
                `    <script type="text/javascript" src="maphive-bootstrap.js?r=${new Date().getTime()}"></script>`,
                secondPart
        ].join('\r\n');

        //resave html
        fs.writeFileSync(dst, newHtml);

        resolve();
    });
}

/**
 * zips application files into a single archive
 */
const zipContent = () => {
    return new Promise((resolve, reject) => {

        var buildDir = getBuildDirectory();

        //zip file one lvl up as otherwise archiver would keep on spinning and zipping including app.zip over and over again...
        var zipTmpPath = buildDir + '\\..\\app.zip';
       

        if (fs.existsSync(zipTmpPath)) {
            fs.unlinkSync(zipTmpPath);
        }
        
        var output = fs.createWriteStream(zipTmpPath);
        var archive = archiver('zip');

        output.on('close', function () {
            console.log('app zipped! - ' + archive.pointer() + ' total bytes');
            
            resolve();
        });

        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                throw err;
            }
        });

        archive.on('error', function (err) {
            throw err;
        });

        archive.pipe(output);

        archive.directory(buildDir, false);
        
        archive.finalize();
    });
}


/**
 * deploys the application - sends the zipped archive to deployer endpoint
 */
const deployApp = () => {
    return new Promise((resolve, reject) => {

        console.log(`Deploying application - branch name:  ${branchName}...`);

        var deployUrl, deployId;
        try {
            deployUrl = getAppDeployUrl();
            deployId = getAppDeployId();
        } catch (ex) {
            console.log('Could not read deployer cfg!');
            console.log('Aborting deploy!');
            console.log(ex.message);
            resolve();
            return;
        }
        
        var archiveToUpload = getBuildDirectory() + '\\..\\app.zip';
        if (!fs.existsSync(archiveToUpload)) {
            reject("app archive to upload not found!");
        }
        
        console.log(`deploying ${deployId} app to ${deployUrl}`);
               

        var req = request({
            rejectUnauthorized: deployUrl.indexOf("localhost") > -1 ? false : true, //for dev mode localhost allow unauthorised self signed ssl certs!!!
            url: deployUrl,
            method: 'POST',
            preambleCRLF: true,
            postambleCRLF: true
        }, function (err, resp, body) {
            if (err) {
                console.log('Error!', err);
                reject(err);
            } else {
                console.log('Deployer output: ' + body);
                resolve();
            }
        });
        var form = req.form();
        form.append('appId', deployId);
        form.append('branchName', branchName);
        form.append('file', fs.createReadStream(archiveToUpload));
    });
}

/**
 * promotes currently deployed dev master branch to live
 */
const promoteToLive = () => {
    return new Promise((resolve, reject) => {
        readDeployerConfigurationJson();
        var promoteUrl = deployerConfiguration.endPoint + '/promote?appId=' + deployerConfiguration.appId;

        console.log(`Deploying dev master to LIVE @ ${promoteUrl}...`);

        var req = request({
            rejectUnauthorized: promoteUrl.indexOf("localhost") > -1 ? false : true, //for dev mode localhost allow unauthorised self signed ssl certs!!!
            url: promoteUrl,
            method: 'GET',
        }, function (err, resp, body) {
            if (err) {
                console.log('Error!', err);
                reject(err);
            } else {
                console.log('Deployer says: ' + body);
                resolve();
            }
        });
    });
}

/**
 * prints hello to console
 */
const printHello = () => {
    return new Promise((resolve, reject) => {
        console.log(`MapHive AppBuilder v 1.0 - hello there ;)`);
        resolve();
    });
}

/**
 * prints finish info to console
 */
const printFinished = () => {
    return new Promise((resolve, reject) => {
        console.log('Done! Hell yeah!');
        resolve();
    });
}

//the actual procedure is chained below...
//----------------------------------------------------------------

if (hasLiveSwitch()) {
    printHello()
        .then(promoteToLive)
        .then(printFinished);
} else {
    printHello()
        .then(getMapHiveVersion)
        .then(getAppVersion)
        .then(buildExtJsApp)
        .then(copyResources)
        .then(extractExtBuildProfilePicker)
        .then(extractExtBootstrap)
        .then(cleanupAndFixScripts)
        .then(zipContent)
        .then(getBranchName)
        .then(deployApp)
        .then(printFinished);
}

