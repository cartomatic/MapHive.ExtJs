//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
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
            'mh.module.userProfile.Icons',
            'mh.widget.RoundImage',
            'mh.module.langSwitcher.LangSwitcher',
            'Ext.field.Container'
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
                        xtype: 'mh-roundimg',
                        imgWidth: 200,
                        imgHeight: 200,
                        editable: true,
                        bind: {
                            image: '{record.profilePictureGeneric}'
                        },
                        listeners: {
                            imgreset: 'onUserProfilePhotoReset',
                            imgchanged: 'onUserProfilePhotoChanged'
                        }
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
                        xtype: 'fieldcontainer',
                        bind: {
                            label: '{localization.uiLang}'
                        },
                        margin: '50 0 0 0',
                        items: [
                            {
                                xtype: 'mh-lang-switcher',
                                flex: 1
                            }
                        ]
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
