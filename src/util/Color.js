//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/

(function(){
    //Make sure strict mode is on
    'use strict';

    let Xn = 0.950470,
        Yn = 1,
        Zn = 1.088830,
        t0 = 4 / 29,
        t1 = 6 / 29,
        t2 = 3 * t1 * t1,
        t3 = t1 * t1 * t1,
        twoPi = 2 * Math.PI;

    /**
     * Color manipulation utils
     *
     * Color manipulation functions below are adapted from:
     * https://github.com/d3/d3-color.
     * https://openlayers.org/en/latest/examples/color-manipulation.html
     * https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
     */
    Ext.define('mh.util.Color', {
        singleton: true,

        /**
         * Convert an RGB pixel into an HCL pixel.
         * @param {Array<number>} pixel A pixel in RGB space.
         * @return {Array<number>} A pixel in HCL space.
         */
        rgb2hcl: function (pixel) {
            let red = this.rgb2xyz(pixel[0]),
                green = this.rgb2xyz(pixel[1]),
                blue = this.rgb2xyz(pixel[2]),

                x = this.xyz2lab(
                    (0.4124564 * red + 0.3575761 * green + 0.1804375 * blue) / Xn),
                y = this.xyz2lab(
                    (0.2126729 * red + 0.7151522 * green + 0.0721750 * blue) / Yn),
                z = this.xyz2lab(
                    (0.0193339 * red + 0.1191920 * green + 0.9503041 * blue) / Zn),

                l = 116 * y - 16,
                a = 500 * (x - y),
                b = 200 * (y - z),

                c = Math.sqrt(a * a + b * b),
                h = Math.atan2(b, a);

            if (h < 0) {
                h += twoPi;
            }

            pixel[0] = h;
            pixel[1] = c;
            pixel[2] = l;

            return pixel;
        },


        /**
         * Convert an HCL pixel into an RGB pixel.
         * @param {Array<number>} pixel A pixel in HCL space.
         * @return {Array<number>} A pixel in RGB space.
         */
        hcl2rgb: function (pixel) {
            let h = pixel[0],
                c = pixel[1],
                l = pixel[2],

                a = Math.cos(h) * c,
                b = Math.sin(h) * c,

                y = (l + 16) / 116,
                x = isNaN(a) ? y : y + a / 500,
                z = isNaN(b) ? y : y - b / 200;

                y = Yn * this.lab2xyz(y);
                x = Xn * this.lab2xyz(x);
                z = Zn * this.lab2xyz(z);

            pixel[0] = this.xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
            pixel[1] = this.xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
            pixel[2] = this.xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

            return pixel;
        },

        xyz2lab: function (t) {
            return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
        },

        lab2xyz: function (t) {
            return t > t1 ? t * t * t : t2 * (t - t0);
        },

        rgb2xyz: function (x) {
            return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
        },

        xyz2rgb: function (x) {
            return 255 * (x <= 0.0031308 ?
                12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
        },

        /**
         * transforms pixel to gray scale;
         * based on https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
         * quite nice shit there really ;)
         * @param pixel
         * @returns {[number, number, number]}
         */
        grayScale: function(pixel) {

            let r = pixel[0],
                g = pixel[1],
                b = pixel[2],
                // CIE luminance for the RGB
                // The human eye is bad at seeing red and blue, so we de-emphasize them.
                v = 0.2126*r + 0.7152*g + 0.0722*b;
            return [v,v,v];
        },


        hueChromaLightness: function(pixel, hue, chroma, lightness){
            hue = hue || 0; //degrees - -180 / 180; 0 normal
            chroma = chroma || 100; //%; if 0 then grayscale; 100% normal
            lightness = lightness || 100; //%; if 0 then black; 100% normal;

            let hcl = this.rgb2hcl(pixel),
                h = hcl[0] + Math.PI * hue / 180;

            if (h < 0) {
                h += twoPi;
            } else if (h > twoPi) {
                h -= twoPi;
            }
            hcl[0] = h;

            hcl[1] *= (chroma / 100);
            hcl[2] *= (lightness / 100);

            return this.hcl2rgb(hcl);
        }

    });
    
}());