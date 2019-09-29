Ext.define('mh.overrides.ux.colorpick.ColorUtils', {

    override: 'Ext.ux.colorpick.ColorUtils',

    /**
     * alphaFormat fucks up parsing alpha back to a number when separator is different than '.';
     * this fixes it by formatting the number and parsing it back to float
     * @param color
     * @param alphaFormat
     * @returns {null|*}
     */
    parseColor: function(color, alphaFormat) {
        var me = this,
            rgb, match, ret, hsv;

        if (!color) {
            return null;
        }

        rgb = me.colorMap[color];

        if (rgb) {
            ret = {
                r: rgb[0],
                g: rgb[1],
                b: rgb[2],
                a: 1
            };
        }
        else if (color === 'transparent') {
            ret = {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            };
        }
        else {
            match = me.hexRe.exec(color);

            if (match) {
                match = match[1]; // the captured hex

                switch (match.length) {
                    default:
                        return null;

                    case 3:
                        ret = {
                            // double the number (e.g. 6 - > 66, a -> aa) and convert to decimal
                            r: parseInt(match[0] + match[0], 16),
                            g: parseInt(match[1] + match[1], 16),
                            b: parseInt(match[2] + match[2], 16),
                            a: 1
                        };
                        break;

                    case 6:
                    case 8:
                        ret = {
                            r: parseInt(match.substr(0, 2), 16),
                            g: parseInt(match.substr(2, 2), 16),
                            b: parseInt(match.substr(4, 2), 16),
                            a: parseInt(match.substr(6, 2) || 'ff', 16) / 255
                        };
                        break;
                }
            }
            else {
                match = me.rgbaRe.exec(color);

                if (match) {
                    // proper css => rgba(r,g,b,a)
                    ret = {
                        r: parseFloat(match[1]),
                        g: parseFloat(match[2]),
                        b: parseFloat(match[3]),
                        a: parseFloat(match[4])
                    };
                }
                else {
                    match = me.rgbaAltRe.exec(color);

                    if (match) {
                        // scss shorthands =?
                        // rgba(red, 0.4),rgba(#222, 0.9), rgba(#444433, 0.8)
                        ret = me.parseColor(match[1]);
                        // we have HSV filled in, so poke on "a" and we're done
                        ret.a = parseFloat(match[2]);

                        return ret;
                    }

                    match = me.rgbRe.exec(color);

                    if (match) {
                        ret = {
                            r: parseFloat(match[1]),
                            g: parseFloat(match[2]),
                            b: parseFloat(match[3]),
                            a: 1
                        };
                    }
                    else {
                        return null;
                    }
                }
            }
        }

        //fucked up in 7.x
        //uses Ext.util.Format.decimalSeparator for stringifying, so will not be able to parse back when comma is used
        // format alpha channel
        if (alphaFormat) {
            //orig: ret.a = Ext.util.Format.number(ret.a, alphaFormat);
            ret.a = parseFloat(Ext.util.Format.number(ret.a, alphaFormat).replace(Ext.util.Format.decimalSeparator, '.'));
        }

        hsv = this.rgb2hsv(ret.r, ret.g, ret.b);

        return Ext.apply(ret, hsv);
    }
});