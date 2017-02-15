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

        bind: {
            iconCls: '{mainBtnIconCls}'
        },

        menu: {
            items: [
                {
                    reference: 'userInfo',
                    listeners: {
                        click: 'onBtnUserInfoClick'
                    },
                    bind: {
                        text: '{profileName}',
                        iconCls: '{menuUserIconCls}'
                    },
                    iconCls: ' ' //Note: this is silly, but without specifying cls here, binding seem to not work...
                },
                {
                    reference: 'btnChangePass',
                    iconCls: 'x-i54c i54c-key-22',
                    bind: {
                        text: '{localisation.btnChangePass}'
                    },
                    hidden: true,
                    listeners: {
                        click: 'onBtnChangePassClick'
                    }
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

    