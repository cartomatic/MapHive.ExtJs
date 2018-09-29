(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.usersCatalogue.UsersCatalogueController', {
        extend: 'mh.module.dataView.links.LinksPickerController',
        alias: 'controller.mh-users-catalogue',

        requires: [
            'mh.module.dataView.usersCatalogue.UsersCatalogueLocalization',
            'mh.module.dataView.usersCatalogue.UsersCatalogueModel',
            'mh.module.dataView.users.DataView'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent(arguments);

            var usersView = Ext.create('mh.module.dataView.users.DataView', {
                header: false,
                autoLoad: false, //false, as links picker loads content automatically on each show!

                //just browsing, no crud on globally visibile users
                preventCreate: true,
                preventEdit: true,
                preventDestroy: true,
                disableGridDblTap: true,

                viewModel: {
                    type: 'mh-users-catalogue'
                }
            });

            //set own view
            this.setDataView(usersView);
        },

        /**
         * overrides the default set title
         */
        setTitle: function(){
            this.getView().setTitle(this.getTranslation('title'));
        }
    });
    
}());
    