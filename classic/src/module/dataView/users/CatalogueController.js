(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 28.02.2017.
     */
    Ext.define('mh.module.dataView.users.CatalogueController', {
        extend: 'mh.module.dataView.LinksPickerController',
        alias: 'controller.mh-userscatalogue',

    requires: [
        'mh.module.dataView.users.CatalogueLocalization',
        'mh.module.dataView.users.CatalogueUsersModel',
        'mh.module.dataView.users.Users'
    ],

    mixins: [
            'mh.mixin.CallMeParent'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);

            var usersView = Ext.create('mh.module.dataView.users.Users', {
                selMode: 'SINGLE', //<- just one user at a time
                hideGridHeader: true,
                hideFormHeader: true,
                form: false,
                autoLoad: false, //false, as links picker loads content automatically on each show!
                viewModel: {
                    type: 'mh-catalogueusers'
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
    