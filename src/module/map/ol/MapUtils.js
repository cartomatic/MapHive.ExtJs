//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * some more commonly used ol3 map utils
     */
    Ext.define('mh.module.map.ol.MapUtils', {

        singleton: true,

        requires: [
            'mh.util.DarkMode',
            'mh.util.Color'
        ],

        mixins: [
            'mh.communication.MsgBus'
        ],

        constructor: function(){
            this.layerPostRenderDarkModeHandler = Ext.bind(this.layerPostRenderDarkModeHandlerInternal, this);
        },

        layerPostRenderDarkModeHandler: null,

        enableLayerDarkModeHandling: function(l){
            l.on('postrender', this.layerPostRenderDarkModeHandler);
        },
        disableLayerDarkModeHandling: function(l){
            l.un('postrender', this.layerPostRenderDarkModeHandler);
        },

        /**
         * makes map force re-render when ui mode is changed
         * @param map
         */
        enableMapDarkModeHandling: function(map){
            this.watchGlobal('ui-map-mode-changed', () => {
                //debug>
                console.log('ui mode changed - re-rendering map');
                //</debug>
                map.renderSync();
            });
        },

        layerPostRenderDarkModeHandlerInternal: function(e){

            if(!mh.util.DarkMode.darkMapModeOn){
                return;
            }

            //gives nice dark map but very slow...
            //this.mapDarken(e.context);

            this.mapGrayOut(e.context);
            //this.mapGrayScale(e.context);
        },

        /**
         * darkens map canvas
         * @param ctx
         */
        mapDarken: function(ctx){
            var imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
            this.modifyPixels(
                imgData.data,
                function(pixel){return mh.util.Color.hueChromaLightness(pixel,0,25,50)}
            );

            ctx.putImageData(imgData, 0, 0);
        },

        /**
         * modifies pixels with given modifier
         * @param pixels
         * @param modifier
         */
        modifyPixels: function(pixels, modifier){
            for (var i=0; i<pixels.length; i+=4) {

                let modifiedPixel = modifier([pixels[i],pixels[i+1],pixels[i+2]]);

                pixels[i] = modifiedPixel[0];
                pixels[i+1] = modifiedPixel[1];
                pixels[i+2] = modifiedPixel[2];
            }
        },

        /**
         * makes map canvas grayscale
         * @param ctx
         */
        mapGrayScale: function(ctx){
            var imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

            this.modifyPixels(imgData.data, mh.util.Color.grayScale);

            ctx.putImageData(imgData, 0, 0);
        },

        /**
         * grays out map canvas - makes it gray-ish
         * @param ctx
         */
        mapGrayOut: function(ctx){
            var imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height),
                tmpC = document.createElement("canvas"),
                a = ctx.globalAlpha;

            tmpC.height = ctx.canvas.height;
            tmpC.width = ctx.canvas.width;

            ctx.globalAlpha = 0.35;

            //layer rendering done, so make it gray!
            tmpC.getContext('2d').drawImage(ctx.canvas, 0, 0);

            this.modifyPixels(imgData.data, mh.util.Color.grayScale)

            ctx.putImageData(imgData, 0, 0);

            ctx.drawImage(tmpC, 0, 0);

            ctx.globalAlpha = a;
        },

        /**
         * prints a map to pdf
         * @private
         * @param map
         * @param cfg
         * @param cfg.resolution resolution expressed in dpi
         * @param cfg.size printout dimensions expressed in mm: [height, width]
         * @param cfg.callback a callback to call when a printout is ready - dataUrl is passed as the param
         */
        mapPrint: function(map, cfg){

            if(!Ext.isFunction(cfg.callback)){
                console.error('Map printer requires a callback to be provided');
                return;
            }

            const width = Math.round((cfg.size[0] * cfg.resolution) / 25.4);
            const height = Math.round((cfg.size[1] * cfg.resolution) / 25.4);
            const size = map.getSize();
            const viewResolution = map.getView().getResolution();

            map.once('rendercomplete', function () {
                const mapCanvas = document.createElement('canvas');
                mapCanvas.width = width;
                mapCanvas.height = height;
                const mapContext = mapCanvas.getContext('2d');
                Array.prototype.forEach.call(
                    document.querySelectorAll('.ol-layer canvas'),
                    function (canvas) {
                        if (canvas.width > 0) {
                            const opacity = canvas.parentNode.style.opacity;
                            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                            const transform = canvas.style.transform;
                            // Get the transform parameters from the style's transform matrix
                            const matrix = transform
                                .match(/^matrix\(([^\(]*)\)$/)[1]
                                .split(',')
                                .map(Number);
                            // Apply the transform to the export map context
                            CanvasRenderingContext2D.prototype.setTransform.apply(
                                mapContext,
                                matrix,
                            );
                            mapContext.drawImage(canvas, 0, 0);
                        }
                    },
                );
                mapContext.globalAlpha = 1;
                mapContext.setTransform(1, 0, 0, 1, 0, 0);

                //let the map return to its orig size before assembling a pdf - render canvas in mem first, then resize map, then do pdf
                const imgData = mapCanvas.toDataURL('image/jpeg');

                // Reset original map size
                map.setSize(size);
                map.getView().setResolution(viewResolution);

                cfg.callback(imgData);
            });

            // Set print size
            const printSize = [width, height];
            map.setSize(printSize);
            const scaling = Math.min(width / size[0], height / size[1]);
            map.getView().setResolution(viewResolution / scaling);
        }

    });

}());