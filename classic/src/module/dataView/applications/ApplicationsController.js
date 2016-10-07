//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.applications.ApplicationsController', {
        extend: 'mh.module.dataView.DataViewBaseController',

        alias: 'controller.mh-applications',

        requires: [
            'mh.module.dataView.applications.ApplicationsLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation',
            'mh.mixin.CallMeParent',
            'mh.mixin.GridUtils'
        ],
    
        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);

            //activate active column tooltips
            this.activateActiveColsTooltips(this.lookupReference('grid'));
        },

        /**
         * appNavigateTo actionColumn click handler
         * @param view
         * @param rowIdx
         * @param colIdx
         * @param item
         * @param e
         * @param record
         */
        onAppNavigateToClick: function(view, rowIdx, colIdx, item, e, record){
            if(record && record.get('urls')){
                var hostParts = window.location.host.split('.'),
                    domain = (hostParts.length > 2 ? hostParts.splice(hostParts.length - 2) : hostParts).join('.'),
                    urls = record.get('urls').split('|'),
                    url;
                Ext.Array.each(urls, function(u){
                    if(u.indexOf(domain) > -1){
                        url = u;
                        return false;
                    }
                });
                url = url || urls[0];
                if(url){
                    window.open(url);
                }
            }
        },

        /**
         * Customised get tip handler for the appNavigateTo action column
         * @param v
         * @param metadata
         * @param r
         * @param rowIndex
         * @param colIndex
         * @param store
         */
        getTipAppNavigateTo: function(v, metadata, r, rowIndex, colIndex, store){
            return this.getTranslation('appNavigateToDynamicTooltip').replace('{app_name}', r.get('name'));
        }
    });

}());