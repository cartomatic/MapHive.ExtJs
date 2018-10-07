(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.desktop.usersCatalogue.UsersCatalogueController', {
        extend: 'mh.module.dataView.desktop.links.LinksPickerController',
        alias: 'controller.mh-desktop-users-catalogue',

        requires: [
            'mh.module.dataView.desktop.usersCatalogue.UsersCatalogueLocalization',
            'mh.module.dataView.desktop.usersCatalogue.UsersCatalogueModel',
            'mh.module.dataView.desktop.users.DataView'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.mixin.OrganizationUtils'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent(arguments);

            var usersView = Ext.create('mh.module.dataView.desktop.users.DataView', {
                header: false,
                autoLoad: false, //false, as links picker loads content automatically on each show!

                //just browsing, no crud on globally visibile users
                preventCreate: true,
                preventEdit: true,
                preventDestroy: true,
                disableGridDblTap: true,

                viewModel: {
                    type: 'mh-desktop-users-catalogue'
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
        },

        onShow: function(){
            this.callMeParent(arguments);

            this.dataView.getViewModel().getStore('gridstore').setFilters([
                {
                    //pick up users marked as visible in catalogue
                    property: 'visibleInCatalogue',
                    operator: '==',
                    value: true,
                    exactMatch: true,
                    andJoin: true,
                    nestedFilters: [
                        //BUT discard own users
                        {
                            property: 'parentOrganizationId',
                            operator: '!guid',
                            value: this.getCurrentOrgId()
                        },
                        {
                            property: 'userOrgId',
                            operator: '!guid',
                            value: this.getCurrentOrgId()
                        }
                    ]
                }
            ]);
        }
    });
    
}());
    