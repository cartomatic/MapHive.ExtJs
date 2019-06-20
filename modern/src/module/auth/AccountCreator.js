//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.auth.AccountCreator', {
        extend: 'Ext.Container',

        xtype:'mh-auth-account-creator',

        requires: [
            'mh.module.auth.AccountCreatorController',
            'mh.module.auth.AccountCreatorModel'
        ],

        controller: 'mh-auth-account-creator',
        viewModel: {
            type: 'mh-auth-account-creator'
        },

        layout: 'vbox',

        style: {
            backgroundColor: 'transparent'
        },

        items: [
            {
                xtype: 'container',
                flex: 1
            },
            {
                xtype: 'panel',
                reference: 'mainForm',
                header: {
                    bind: {
                        title: '{localization.title}'
                    },
                    iconCls: 'x-li li-user-plus'
                },
                padding: 10,
                items: [
                    {
                        xtype: 'textfield',
                        reference: 'txtEmail',
                        bind: {
                            placeholder: '{localization.emailEmptyText}'
                        },
                        margin: '5 0 0 0' //trbl
                    },
                    {
                        xtype: 'textfield',
                        reference: 'txtSlug',
                        bind: {
                            placeholder: '{localization.slugEmptyText}'
                        },
                        margin: '5 0 0 0' //trbl
                    },
                    {
                        xtype: 'textfield',
                        reference: 'txtForename',
                        bind: {
                            placeholder: '{localization.forenameEmptyText}'
                        },
                        margin: '5 0 0 0' //trbl
                    },
                    {
                        xtype: 'textfield',
                        reference: 'txtSurname',
                        bind: {
                            placeholder: '{localization.surnameEmptyText}'
                        },
                        margin: '5 0 0 0' //trbl
                    },
                    {
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localization.btnCancel}'
                                },
                                iconCls: 'x-li li-cross-circle',
                                listeners: {
                                    tap: 'onBtnCancelClick'
                                },
                                ui: 'decline'
                            },
                            {
                                xtype: 'container',
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localization.btnCreate}'
                                },
                                iconAlign: 'left',
                                iconCls: 'x-li li-user-plus',
                                listeners: {
                                    tap: 'onBtnCreateProfileClick'
                                },
                                ui: 'action'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 1
            }
        ]
    });
}());
