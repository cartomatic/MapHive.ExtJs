//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * some more commonly used ol3 map utils
     */
    Ext.define('mh.module.map.Ol3MapUtils', {

        singleton: true,

        requires: [
            'mh.util.Fashion',
            'mh.util.Color'
        ],

        enableLayerDarkModeHandling: function(l){
            l.on('postrender', this.layerPostRenderDarkModeHandler);
        },
        disableLayerDarkModeHandling: function(l){
            l.un('postrender', this.layerPostRenderDarkModeHandler);
        },

        layerPostRenderDarkModeHandler: function(e){

            //todo - dark mode detection!

            var ctx = e.context,
                imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height),
                pixels = imgData.data;

            for (var i=0; i<pixels.length; i+=4) {

                //let modifiedPixel = mh.util.Color.grayScale([pixels[i],pixels[i+1],pixels[i+2]]);
                let modifiedPixel = mh.util.Color.hueChromaLightness(
                    [pixels[i],pixels[i+1],pixels[i+2]],
                    0,
                    25,
                    50
                );

                pixels[i] = modifiedPixel[0];
                pixels[i+1] = modifiedPixel[1];
                pixels[i+2] = modifiedPixel[2];
            }

            ctx.putImageData(imgData, 0, 0);
        }

    });

}());