(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 03.02.2017.
     */
    Ext.define('mh.module.appBar.UserProfileButton', {
        extend: 'Ext.button.Split',
    
        xtype: 'mh-user-profile-button',

    requires: [
        'mh.dummy.view.BtnModalModeStart',
        'mh.module.appBar.UserProfileButtonController',
        'mh.module.appBar.UserProfileButtonViewModel'
    ],

    controller: 'mh-user-profile-button',

        viewModel: {
            type: 'mh-user-profile-button'
        },

        ui: 'default',

        scale: 'medium',

        menuAlign: 'tr-br?',
        arrowVisible: false,

        menu: {
            items: [
                {
                    reference: 'userInfo'
                },
                {
                    xtype: 'menuseparator'
                },
                {
                    reference: 'btnLogOn',
                    iconCls: 'x-i54c i54c-enter-2',
                    bind: {
                        text: '{localisation.btnLogOn}'
                    },
                    listeners: {
                        click: 'onBtnLogOnClick'
                    }
                },
                {
                    reference: 'btnLogOff',
                    iconCls: 'x-i54c i54c-exit-2',
                    bind: {
                        text: '{localisation.btnLogOff}'
                    },
                    listeners: {
                        click: 'onBtnLogOffClick'
                    },
                    hidden: true
                }
            ]
        },

        listeners: {
            click: 'onUserProfileBtnClick'
        }
    });
    
}());

    