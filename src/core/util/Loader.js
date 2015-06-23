(function(){
    //Make sure strict mode is on
    'use strict';


    /**
     * Js script, css loader;
     * Modification of http://www.sencha.com/forum/showthread.php?107796-Ext.ux.Loader-Load-js-css-Files-Dynamically
     */
    Ext.define('gm.core.util.Loader', {

        singleton: true,

        constructor: function(){},

        /**
         * builds a script or style tag
         * @param filename
         * @param callback
         * @returns {Element}
         */
        buildScriptTag: function(filename, callback) {
            var rnd = '?dc=' + (new Date()).getTime();
            var exten = filename.substr(filename.lastIndexOf('.')+1);
            //console.log('Loader.buildScriptTag: filename=[%s], exten=[%s]', filename, exten);
            if(exten=='js') {
                var script  = document.createElement('script');
                script.type = "text/javascript";
                script.src  = filename + rnd;

                //IE has a different way of handling <script> loads, so we need to check for it here
                if(script.readyState) {
                    script.onreadystatechange = function() {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else {
                    script.onload = callback;
                }
                return script;
            }
            if(exten=='css') {
                var style = document.createElement('link');
                style.rel  = 'stylesheet';
                style.type = 'text/css';
                style.href = filename + rnd;
                callback();
                return style;
            }
        },

        /**
         * Loads scipts or css
         * @param cfg {Object} configuration
         * @param {String|Array} [cfg.fileList]
         * @param {Function} [cfg.callback]
         * @param {Object} [cfg.scope]
         * @param {Boolean} [cfg.preserveOrder] - whether or not scripts should be loaded in the order supplied
         */
        load: function(cfg) {

            if(!cfg) return;

            var fileList = cfg.fileList,
                callback = cfg.callback,
                scope = cfg.scope,
                preserveOrder = cfg.preserveOrder;


            if(!Ext.isArray(fileList)) fileList = [fileList];

            var scope       = scope || this,
                head        = document.getElementsByTagName("head")[0],
                fragment    = document.createDocumentFragment(),
                numFiles    = fileList.length,
                loadedFiles = 0,
                me          = this;


            // Loads a particular file from the fileList by index. This is used when preserving order
            var loadFileIndex = function(index) {
                head.appendChild(
                    me.buildScriptTag(fileList[index], onFileLoaded)
                );
            };

            /**
             * Callback function which is called after each file has been loaded. This calls the callback
             * passed to load once the final file in the fileList has been loaded
             */
            var onFileLoaded = function() {
                loadedFiles ++;

                //if this was the last file, call the callback, otherwise load the next file
                if (numFiles == loadedFiles && typeof callback == 'function') {
                    callback.call(scope);
                } else {
                    if (preserveOrder === true) {
                        loadFileIndex(loadedFiles);
                    }
                }
            };

            if (preserveOrder === true) {
                loadFileIndex.call(this, 0);
            } else {
                //load each file (most browsers will do this in parallel)
                Ext.each(fileList, function(file, index) {
                    fragment.appendChild(
                        this.buildScriptTag(file, onFileLoaded)
                    );
                }, this);

                head.appendChild(fragment);
            }
        }
    });

}());