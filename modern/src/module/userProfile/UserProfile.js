//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * User profile
     */
    Ext.define('mh.module.userProfile.UserProfile', {
        extend: 'Ext.Panel',

        requires: [
            'mh.util.AliasMapper',
            'mh.module.userProfile.UserProfileController',
            'mh.module.userProfile.UserProfileModel',
            'mh.FontIconsDictionary',
            'mh.module.userProfile.Icons'
        ],

        xtype: 'mh-user-profile',

        statics: {
            aliases: [
                'user-profile',
                'userprofile'
            ]
        },

        controller: 'mh-user-profile',
        viewModel: {
            type: 'mh-user-profile'
        },

        layout: {
            type: 'hbox',
            align: 'stretch'
        },

        items: [
            { xtype: 'container', flex: 1},
            {
                xtype: 'panel',
                width: 400,
                padding: 10,
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {xtype: 'container', flex: 1},
                            {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'img',
                                        reference: 'profilePicture',
                                        width: 200,
                                        height: 200,
                                        style: {
                                            borderRadius: '50%'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: mh.FontIconsDictionary.getIcon('mhUserProfileResetProfilePicture'),
                                        left: 0,
                                        bottom: 0,
                                        ui: 'mh-user-profile-photo-reset-btn',
                                        listeners: {
                                            tap: 'userProfilePhotoResetBtnTap'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: mh.FontIconsDictionary.getIcon('mhUserProfileUploadProfilePicture'),
                                        right: 0,
                                        bottom: 0,
                                        ui: 'mh-user-profile-photo-add-btn',
                                        listeners: {
                                            tap: 'userProfilePhotoAddBtnTap'
                                        }
                                    }
                                ]
                            },
                            {xtype: 'container', flex: 1}
                        ]
                    },
                    {
                        xtype: 'textfield',
                        bind: {
                            label: '{localization.forename}',
                            value: '{record.forename}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        bind: {
                            label: '{localization.surname}',
                            value: '{record.surname}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        bind: {
                            label: '{localization.email}',
                            value: '{record.email}'
                        },
                        required: true
                    },
                    {
                        xtype: 'textfield',
                        bind: {
                            label: '{localization.slug}',
                            value: '{record.slug}'
                        }
                    },
                    {
                        xtype: 'button',
                        bind: {
                            text: '{localization.saveChanges}'
                        },
                        iconCls: mh.FontIconsDictionary.getIcon('mhUserProfileSaveChanges'),
                        margin: '10 0 0 0',
                        listeners: {
                            tap: 'onBtnSaveChangesTap'
                        },
                        width: '100%'
                    },
                    {
                        xtype: 'button',
                        bind: {
                            text: '{localization.changePass}'
                        },
                        iconCls: mh.FontIconsDictionary.getIcon('mhUserProfileChangePass'),
                        margin: '20 0 0 0',
                        listeners: {
                            tap: 'onBtnChangePassTap'
                        },
                        width: '100%'
                    },
                    {
                        xtype: 'combobox',
                        reference: 'langSwitcher',
                        margin: '50 0 0 0',
                        editable: false,
                        valueField: 'code',
                        displayField: 'name',
                        triggerAction: 'all',
                        queryMode: 'local',
                        bind: {
                            label: '{localization.uiLang}',
                            store: '{langs}'
                        },
                        listeners: {
                            change: 'onLangChange'
                        }
                    }
                ]
            },
            { xtype: 'container', flex: 1}
        ],

        listeners: {
            show: 'onShow'
        }

    }, function(){
        mh.util.AliasMapper.registerAliases(this);
    });
}());
