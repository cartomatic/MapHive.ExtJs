//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * some grid related utilities; class meant to be used as a mixin
     */
    Ext.define('mh.mixin.GridUtils', {

        /**
         * Activates active column tooltips with localised tips or customised getTip functions;
         * first checks for the presence of tooltipTranslationKey activecolumn configuration and if not found consults the customGetTip cfg property
         * customGetTip should be a name of a function to be used
         * @param grid
         *
         *  {
                xtype: 'actioncolumn',
                width: 30,
                iconCls: 'someCls',
                handler: 'someHandler',
                //Note: tips for active columns are a bit tricky, as they require a function here. Therefore in order to ensure view instance encapsulation, customisation is done in the controller; there are two ways of customising a tooltip - via a translation key - this will always apply the same tip to each row, or via specifying a function name, that if present on a controller, will be used as a customised getTip fn; for more details see mh.mixin.GridUtils.activateActiveColsTooltips
                //getTip: 'getTipCustomFn' //it would be lovely if it worked out of the box, huh?
                //
                //this uses a translation key to obtain a tooltip via getTranslation(translationKey)
                //tooltipTranslationKey: 'someTranslationKey',
                //
                //and this provides a customised fn so each tooltip cna be customised on per row basis.
                //this fn takes same args as the orignal getTip fn, so: v, metadata, r, rowIndex, colIndex, store; more info in
                //https://docs.sencha.com/extjs/6.0/6.0.2-classic/#!/api/Ext.grid.column.Action-cfg-items
                //customGetTip: 'getTipCustomFn'
            }
         */
        activateActiveColsTooltips: function(grid){
            var cols = grid.columns,
                c = 0, clen = cols.length,
                col,

            //make a closure here, so if there are more cols,
                getTip = function(tip){
                    return function(){return tip;}
                };

            //TODO - at some point also add inspecting the items property, as active column can actually have a couple of icons!

            for(c; c < clen; c++){
                col = cols[c];

                if(col.$className === 'Ext.grid.column.Action'){

                    if(col.tooltipTranslationKey){
                        col.getTip = getTip(this.getTranslation(col.tooltipTranslationKey));
                    }
                    else if(col.customGetTip){
                        if(Ext.isFunction(this[col.customGetTip])){
                            col.getTip = Ext.bind(this[col.customGetTip], this);
                        }
                    }
                }
            }
        },

        /**
         * Generates html to be used as an icon in a grid cell
         * @param iconCls
         * @returns {*}
         */
        getGridIconHtml: function(iconCls){
            return this.getGridIconWithTooltipHtml(iconCls);
        },

        /**
         * Generates html to be used as an icon in a grid cell
         * @param iconCls
         * @param tooltip
         * @returns {string}
         */
        getGridIconWithTooltipHtml: function(iconCls, tooltip){
            return '<img ' +
                        (Ext.isString(tooltip) && tooltip !== '' ? 'data-qtip="' + tooltip +'"' : '') +
                        'class="mh-grid-icon ' + iconCls + '"' +
                        'src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" role="button"' +
                    '/>';
        }
    });

}());