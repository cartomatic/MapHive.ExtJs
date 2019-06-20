//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    let loadedScripts = {};

    Ext.define('mh.module.ogc.Utils', {

        singleton: true,

        requires: [
            'mh.util.Loader'
        ],

        /**
         * gets a unified resources location
         * @returns {string|null}
         */
        getResourcesUrl: function(){
            return Ext.manifest.resources.path;
        },

        /**
         * loads scripts specified and executes a supplied callback if any
         * @param scripts
         * @param callback
         * @param scope
         */
        loadScripts: function(scripts, callback, scope){

            let fileList = this.getFileList(scripts);

            if(fileList.length == 0){
                if(Ext.isFunction(callback)){
                    callback.apply(scope, []);
                }

                return;
            }

            //need to load scripts first
            mh.util.Loader.load({
                fileList: fileList,
                scope: this,
                callback: function(){
                    if(Ext.isFunction(callback)){
                        callback.apply(scope, []);
                    }
                }
            });
        },

        /**
         * gets a file list to be loaded
         * @param scripts
         * @returns {Array}
         */
        getFileList: function(scripts){
            let me = this,
                fileList = [];

            (scripts || []).forEach(f => {
                if(!loadedScripts[f]){
                    fileList.push(
                        f.startsWith('http')
                            ? f
                            : `${me.getResourcesUrl()}/mh/jsLibs/${f}`
                    );
                    loadedScripts[f] = true;
                }
            });

            return fileList;
        },

        /**
         * extracts a base url
         * @param url
         * @returns {*}
         */
        extractBaseUrl: function(url){
            return url.split('?')[0];
        },

        /**
         * extracts params from url
         * @param url to extract params from
         * @param filterOut params to filter out from the
         * @returns {boolean}
         */
        extractUrlParams: function(url, filterOut){
            var params = (url.split('?')[1] || '').split('&').filter(p => {
                return !!p && (filterOut && filterOut.indexOf(p.split('=')[0].toLowerCase()) > -1 ? false : true);
            });
            return params;
        }


    });

}());