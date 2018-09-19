//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.auth.ActivateAccountView', {
        extend: 'Ext.Container',

        xtype:'mh-auth-activate-account',


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
                padding: 10,
                header: {
                    bind: {
                        title: '{localization.titleActivateAccount}'
                    },
                    iconCls: 'x-i54c i54c-pin-code'
                },
                items: [
                    {
                        xtype: 'textfield',
                        reference: 'txtVerificationKey',
                        clearable: true,
                        bind: {
                            placeholder: '{localization.verificationKeyEmptyText}'
                        },
                        cls: 'mh-auth-text-border',
                        margin: '5 0 5 0' //trbl
                    },
                    {
                        xtype: 'textfield',
                        reference: 'txtInitialPassword',
                        clearable: true,
                        bind: {
                            placeholder: '{localization.passEmptyText}'
                        },
                        cls: 'mh-auth-text-border',
                        margin: '5 0 5 0' //trbl
                    },
                    {
                        xtype: 'button',
                        bind: {
                            text: '{localization.btnActivateAccount}'
                        },
                        iconAlign: 'right',
                        iconCls: 'x-li li-chevron-right-circle',
                        ui: 'confirm',
                        listeners: {
                            tap: 'onActivateAccountBtnClick'
                        }
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
