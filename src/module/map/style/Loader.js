//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * style loading utils
     */
    Ext.define('mh.module.map.style.Loader', {

        requires: [
            'mh.util.Loader'
        ],

        singleton: true,

        /**
         * reads a style from SLD - returns a collection of mh.data.model.map.Style objects by calling a provided callback
         * @param sld
         * @param colMapper an object allowing for column mapping: friendly names -> actual names; ignored if not provided
         * @param callback
         */
        loadSld: function(sld, colMapper, callback){
            let me = mh.module.map.style.Loader,
                parser = new GeoStylerSLDParser.SldStyleParser();

            //<debug>
            //console.log('sld', sld);
            //</debug>

            parser.readStyle(sld)
                .then(function(parsed) {
                    //<debug>
                    console.log('parsed', parsed);
                    //</debug>
                    callback(me.mhStylesFromGeoStyle(parsed.output, colMapper));
                })
                .catch(error => console.log(error));
        },

        /**
         * reads a style from QML - returns a collection of mh.data.model.map.Style objects by calling a provided callback
         * @param qml
         * @param colMapper an object allowing for column mapping: friendly names -> actual names; ignored if not provided
         * @param callback
         */
        loadQml: function(qml, colMapper, callback){
            let me = mh.module.map.style.Loader,
                parser = new GeoStylerQGISParser.QGISStyleParser();

            //<debug>
            console.log('qml', qml);
            //</debug>

            parser.readStyle(qml)
                .then(function(parsed) {
                    //<debug>
                    console.log('parsed', parsed);
                    //</debug>
                    if(parsed.errors && parsed.errors.length > 0){
                        callback();
                    }
                    else {
                        callback(me.mhStylesFromGeoStyle(parsed.output, colMapper));
                    }
                })
                .catch(error => console.log(error));
        },

        /**
         * transforms a geoStyle into mh styles
         * @param geoStyle
         * @param colMapper
         * @returns {*[]}
         */
        mhStylesFromGeoStyle: function(geoStyle, colMapper){
            //<debug>
            console.log('geoStyle', geoStyle);
            //</debug>

            let me = mh.module.map.style.Loader,
                geoStyleRules = geoStyle.rules || [],
                mhStyles = [];

            //basically a single geoStyle rule maps to a mhStyle

            for(let i = 0; i < geoStyleRules.length; i++){
                let styles = me.mhStylesFromGeoStyleRule(geoStyleRules[i], colMapper);
                for(let s = 0; s < styles.length; s++){
                    mhStyles.push(styles[s]);
                }
            }

            //<debug>
            console.log('mhStyles', mhStyles);
            //</debug>

            return mhStyles;
        },

        /**
         * transforms a geoStyle rule into a mh style object
         * @param geoStyleRule
         * @param colMapper
         */
        mhStylesFromGeoStyleRule: function(geoStyleRule, colMapper){
            //geostyle rule is an obj with the following properties: filter, name, symbolizers
            //when no filters are specified a style applies to all objects
            //filter is a 3 position array: operator, fieldName, field value
            //when a filter is complex, the operator expresses a logical relation, for example &&, or || (note: not sure how or looks like yet!)
            //also, not sure if a logical operator allows for more filters to be specified and what is the nesting.
            //
            //in mh, the style is a bit different - it contains a set of filters (geo style rules) as opposed to a rule with attached styles.
            //therefore if a geostyle rule has multiple symbolizers, they need to become multiple styles and a rule/filters need to be repeated
            //mh filter nesting is as follows:
            //filter groups - operator between them - AND/OR
            //   filters - with operators between them - AND/OR

            //<debug>
            console.log('geoStyleRule', geoStyleRule);
            //</debug>

            //work out a filter first
            let me = mh.module.map.style.Loader,
                styles = [],
                filters = geoStyleRule.filter ? me.mhFilterGroupsFromGeoStyleFilter(geoStyleRule.filter, colMapper) : undefined;

            //<debug>
            //console.log('mh filters', filters);
            //</debug>

            //for each symbolizer create a style with the above filter
            for(let s = 0; s < geoStyleRule.symbolizers.length; s++){
                let style = me.mhStyleSymbolizerFromGeoStyleSymbolizer(geoStyleRule.symbolizers[s]);
                style.allObjects = !filters;
                style.filters = filters;
                style.name = geoStyleRule.name;

                //<debug>
                console.log('style', style);
                //</debug>

                styles.push(style);
            }
            //TODO text placement - if there is a text symboliser, it needs to be applied to poly, line and point; mh allows for separate definitions
            //changing this now is soso, wish to have known about it sooner, before mh styles...

            return styles;
        },

        /**
         * transforms geoStyle symbolizer into mh style symbolizer
         * @param geoStyleSymbolizer
         */
        mhStyleSymbolizerFromGeoStyleSymbolizer: function(geoStyleSymbolizer){
            let me = mh.module.map.style.Loader,
                mhSymbolizer = {};

            me.mhPointSymbolizerFromGeoStyleSymbolizer(geoStyleSymbolizer, mhSymbolizer);
            me.mhLineSymbolizerFromGeoStyleSymbolizer(geoStyleSymbolizer, mhSymbolizer);
            me.mhPolySymbolizerFromGeoStyleSymbolizer(geoStyleSymbolizer, mhSymbolizer);

            return mhSymbolizer;
        },

        mhColor: function(hex, opacity){
            if(!hex){
                return undefined;
            }
            return `${hex.replace('#', '')}${Ext.util.Format.hex(255*(opacity || 1))}`;
        },

        mhPointShapeFromGeoStyleWellKnownName: function(geoStyleWellKnownName){
            return 'circle'; //TODO some sort of well known shapes mapper
        },

        /**
         * transforms geostyle symbolizer into mh style point symbolizer
         * @param geoStyleSymbolizer
         * @param mhSymbolizer
         */
        mhPointSymbolizerFromGeoStyleSymbolizer: function(geoStyleSymbolizer, mhSymbolizer){
            let me = mh.module.map.style.Loader;
            if(geoStyleSymbolizer.kind === 'Mark'){
                mhSymbolizer.point = true;
                mhSymbolizer.pointShape = me.mhPointShapeFromGeoStyleWellKnownName(geoStyleSymbolizer.wellKnownName);
                mhSymbolizer.pointSize = geoStyleSymbolizer.radius  || 5;
                mhSymbolizer.pointStrokeColor = geoStyleSymbolizer.strokeWidth ? me.mhColor(geoStyleSymbolizer.strokeColor, geoStyleSymbolizer.strokeOpacity) : undefined;
                mhSymbolizer.pointStrokeWidth = geoStyleSymbolizer.strokeWidth;
                mhSymbolizer.pointFillColor = me.mhColor(geoStyleSymbolizer.color, geoStyleSymbolizer.fillOpacity);

                // pointLabels:false
                // pointLabelAlign:"center"
                // pointLabelBaseLine:"middle"
                // pointLabelColor:"000000ff"
                // pointLabelDeclutter:false
                // pointLabelFont:"Arial"
                // pointLabelFontStyle:"Normal"
                // pointLabelLineHeight:1
                // pointLabelMaxAngle:45
                // pointLabelOffsetX:0
                // pointLabelOffsetY:0
                // pointLabelOutlineColor:"ffffff00"
                // pointLabelOutlineWidth:0
                // pointLabelOverflow:false
                // pointLabelPlacement:"point"
                // pointLabelRotation:0
                // pointLabelSize:10
                // pointLabelWrap:"wrap"


            }

            //https://geostyler.github.io/geostyler-style/docs/main/interfaces/MarkSymbolizer.html
            //interface MarkSymbolizer {
            //     avoidEdges?: boolean | GeoStylerBooleanFunction;
            //     blur?: number | GeoStylerNumberFunction;
            //     color?: string | GeoStylerStringFunction;
            //     fillOpacity?: number | GeoStylerNumberFunction;
            //     kind: "Mark";
            //     offset?: [number | GeoStylerNumberFunction, number | GeoStylerNumberFunction];
            //     offsetAnchor?: "map" | GeoStylerStringFunction | "viewport";
            //     opacity?: number | GeoStylerNumberFunction;
            //     pitchAlignment?: "map" | GeoStylerStringFunction | "viewport";
            //     pitchScale?: "map" | GeoStylerStringFunction | "viewport";
            //     radius?: number | GeoStylerNumberFunction;
            //     radiusUnit?: DistanceUnit;
            //     rotate?: number | GeoStylerNumberFunction;
            //     strokeColor?: string | GeoStylerStringFunction;
            //     strokeOpacity?: number | GeoStylerNumberFunction;
            //     strokeWidth?: number | GeoStylerNumberFunction;
            //     strokeWidthUnit?: DistanceUnit;
            //     visibility?: boolean | GeoStylerBooleanFunction;
            //     wellKnownName: WellKnownName;
            // }

        },

        /**
         * transforms geostyle symbolizer into mh line point symbolizer
         * @param geoStyleSymbolizer
         * @param mhSymbolizer
         */
        mhLineSymbolizerFromGeoStyleSymbolizer: function(geoStyleSymbolizer, mhSymbolizer){
            let me = mh.module.map.style.Loader;
            if(geoStyleSymbolizer.kind === 'Line'){
                mhSymbolizer.line = true;
                mhSymbolizer.lineStrokeColor = geoStyleSymbolizer.width ? me.mhColor(geoStyleSymbolizer.color, geoStyleSymbolizer.opacity) : undefined;
                mhSymbolizer.lineStrokeWidth = geoStyleSymbolizer.width;

                // mhSymbolizer.lineLabels:false
                // mhSymbolizer.lineLabelAlign:"center"
                // mhSymbolizer.lineLabelBaseLine:"middle"
                // mhSymbolizer.lineLabelColor:"000000ff"
                // mhSymbolizer.lineLabelDeclutter:false
                // mhSymbolizer.lineLabelFont:"Arial"
                // mhSymbolizer.lineLabelFontStyle:"Normal"
                // mhSymbolizer.lineLabelLineHeight:1
                // mhSymbolizer.lineLabelMaxAngle:45
                // mhSymbolizer.lineLabelOffsetX:0
                // mhSymbolizer.lineLabelOffsetY:0
                // mhSymbolizer.lineLabelOutlineColor:"ffffff00"
                // mhSymbolizer.lineLabelOutlineWidth:0
                // mhSymbolizer.lineLabelOverflow:false
                // mhSymbolizer.lineLabelPlacement:"point"
                // mhSymbolizer.lineLabelRotation:0
                // mhSymbolizer.lineLabelSize:10
                // mhSymbolizer.lineLabelWrap:"wrap"
            }

            //https://geostyler.github.io/geostyler-style/docs/main/interfaces/LineSymbolizer.html
            //interface LineSymbolizer {
            //     blur?: number | GeoStylerNumberFunction;
            //     cap?: "square" | "butt" | "round" | GeoStylerStringFunction;
            //     color?: string | GeoStylerStringFunction;
            //     dashOffset?: number | GeoStylerNumberFunction;
            //     dasharray?: (number | GeoStylerNumberFunction)[];
            //     gapWidth?: number | GeoStylerNumberFunction;
            //     gapWidthUnit?: DistanceUnit;
            //     gradient?: any[];
            //     graphicFill?: PointSymbolizer;
            //     graphicStroke?: PointSymbolizer;
            //     join?: "round" | "bevel" | "miter" | GeoStylerStringFunction;
            //     kind: "Line";
            //     miterLimit?: number | GeoStylerNumberFunction;
            //     opacity?: number | GeoStylerNumberFunction;
            //     perpendicularOffset?: number | GeoStylerNumberFunction;
            //     roundLimit?: number | GeoStylerNumberFunction;
            //     spacing?: number | GeoStylerNumberFunction;
            //     spacingUnit?: "em" | DistanceUnit;
            //     visibility?: boolean | GeoStylerBooleanFunction;
            //     width?: number | GeoStylerNumberFunction;
            //     widthUnit?: DistanceUnit;
            // }
        },

        /**
         * transforms geostyle symbolizer into mh style poly symbolizer
         * @param geoStyleSymbolizer
         * @param mhSymbolizer
         */
        mhPolySymbolizerFromGeoStyleSymbolizer: function(geoStyleSymbolizer, mhSymbolizer){
            let me = mh.module.map.style.Loader;
            if(geoStyleSymbolizer.kind === 'Fill'){
                mhSymbolizer.poly = true;
                mhSymbolizer.polyFillColor = me.mhColor(geoStyleSymbolizer.color, geoStyleSymbolizer.fillOpacity);
                mhSymbolizer.polyStrokeColor = geoStyleSymbolizer.outlineWidth ? me.mhColor(geoStyleSymbolizer.outlineColor, geoStyleSymbolizer.outlineOpacity) : undefined;
                mhSymbolizer.polyStrokeWidth = geoStyleSymbolizer.outlineWidth || 1;

                // mhSymbolizer.polyLabels:false
                // mhSymbolizer.polyLabelAlign:"center"
                // mhSymbolizer.polyLabelBaseLine:"middle"
                // mhSymbolizer.polyLabelColor:"000000ff"
                // mhSymbolizer.polyLabelDeclutter:false
                // mhSymbolizer.polyLabelFont:"Arial"
                // mhSymbolizer.polyLabelFontStyle:"Normal"
                // mhSymbolizer.polyLabelLineHeight:1
                // mhSymbolizer.polyLabelMaxAngle:45
                // mhSymbolizer.polyLabelOffsetX:0
                // mhSymbolizer.polyLabelOffsetY:0
                // mhSymbolizer.polyLabelOutlineColor:"ffffff00"
                // mhSymbolizer.polyLabelOutlineWidth:0
                // mhSymbolizer.polyLabelOverflow:false
                // mhSymbolizer.polyLabelPlacement:"point"
                // mhSymbolizer.polyLabelRotation:0
                // mhSymbolizer.polyLabelSize:10
                // mhSymbolizer.polyLabelWrap:"wrap"
            }

            //https://geostyler.github.io/geostyler-style/docs/main/interfaces/FillSymbolizer.html
            //interface FillSymbolizer {
            //     antialias?: boolean | GeoStylerBooleanFunction;
            //     color?: string | GeoStylerStringFunction;
            //     fillOpacity?: number | GeoStylerNumberFunction;
            //     graphicFill?: PointSymbolizer;
            //     kind: "Fill";
            //     opacity?: number | GeoStylerNumberFunction;
            //     outlineCap?: "square" | "butt" | "round" | GeoStylerStringFunction;
            //     outlineColor?: string | GeoStylerStringFunction;
            //     outlineDasharray?: (number | GeoStylerNumberFunction)[];
            //     outlineJoin?: "round" | "bevel" | "miter" | GeoStylerStringFunction;
            //     outlineOpacity?: number | GeoStylerNumberFunction;
            //     outlineWidth?: number | GeoStylerNumberFunction;
            //     outlineWidthUnit?: DistanceUnit;
            //     visibility?: boolean | GeoStylerBooleanFunction;
            // }

        },

        /**
         * transforms geoStyle filter into mh filter groups
         * @param geoStyleFilter
         * @param colMapper
         */
        mhFilterGroupsFromGeoStyleFilter: function(geoStyleFilter, colMapper){
            //filter is an array:
            //0: operator
            //1: field name OR sub filter
            //2: value OR subfilter
            //x: potentially more subfilters

            //initially supporting only a 2 level nesting for a rule - filter group + filters
            //operator in the filter specifies the actual relation between filter objects

            let me = mh.module.map.style.Loader,
                fg = [{
                join: 0, //single filter groups at the time being, so OR join between groups
                filters: me.mhFiltersFromGeoStyleFilter(geoStyleFilter, colMapper)
            }];

            return fg;
        },

        /**
         * transforms geoStyleFilter into mh filters
         * @param geoStyleFilter
         * @param colMapper
         */
        mhFiltersFromGeoStyleFilter: function(geoStyleFilter, colMapper){
            let me = mh.module.map.style.Loader,
                filters = [],
                join = me.mhJoinFromGeoStyleFilterJoin(geoStyleFilter[0]);

            if(join === undefined){ //not a nested filter
                filters.push(me.mhFilterFromGeoStyleFilter(geoStyleFilter, join, colMapper));
            }
            else {
                for(let i = 1; i < geoStyleFilter.length; i++){
                    filters.push(me.mhFilterFromGeoStyleFilter(geoStyleFilter[i], join, colMapper));
                }
            }

            return filters;
        },

        /**
         * transforms geostyle filter into mh filter
         * @param geoStyleFilter
         * @param join
         * @param colMapper
         * @returns {{column: *, join: number, value: *, operator: number}}
         */
        mhFilterFromGeoStyleFilter: function(geoStyleFilter, join, colMapper){
            let me = mh.module.map.style.Loader;
            return {
                join: join || 0, //default to OR
                operator: me.mhFilterOperatorFromGeoStyleFilterOperator(geoStyleFilter[0]),
                column: (colMapper || {})[geoStyleFilter[1]] || geoStyleFilter[1],
                value: geoStyleFilter[2]
            };
        },

        /**
         * transforms geostyle filter operator into mh filter operator
         * @param geoStyleFilterOperator
         * @returns {number}
         */
        mhFilterOperatorFromGeoStyleFilterOperator: function(geoStyleFilterOperator){
            switch(geoStyleFilterOperator){
                case '==': return 0;//Equal
                case '!=': return 1;//NotEqual; requires confirmation!
                case '>': return 2;//GreaterThan
                case '>=': return 3;//GreaterThanOrEqual
                case '<': return 4;//LowerThan
                case '<=': return 5;//LowerThanOrEqual
                case '%': return 6;//Like; requires confirmation!
                default: return 0;
            }
        },

        /**
         * transforms geoStyle filter join into mh join
         * @param geoStyleFilterJoin
         * @returns {undefined|number}
         */
        mhJoinFromGeoStyleFilterJoin: function(geoStyleFilterJoin){
            switch(geoStyleFilterJoin){
                case '&&': return 1;
                case '||': return 0;
                default: return undefined;
            }
        }

    },
    function(){
        let basePath = `${Ext.manifest.resources.path}/mh/jsLibs/geostyler`;
        mh.util.Loader.load({
            fileList: [
                `${basePath}/qgis-parser/3.0.0/qgisStyleParser.iife.js`,
                `${basePath}/sld-parser/6.1.2/sldStyleParser.iife.js`
            ]
        });
    });

}());