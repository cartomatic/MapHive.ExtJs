//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.UsersController', {
        extend: 'mh.module.dataView.DataViewBaseController',
        alias: 'controller.mh-users',

        requires: [
            'mh.module.dataView.users.UsersLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation',
            'mh.mixin.CallMeParent'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);

            this.lookupReference('grid').on('selectionchange', this.onGridSelectionChanged, this);
        },

        /**
         * customises the dataview behavior on grid selection change; hides some fields to make more sensible presentation
         * @param grid
         * @param selected
         * @param eOpts
         */
        onGridSelectionChanged: function(grid, selected, eOpts){
            var visibleInCatalogue = this.lookupReference('visibleInCatalogue');
            visibleInCatalogue.setVisible(selected && selected.length === 1 && selected[0].get('visibleInCatalogue'));
        }

    });

}());