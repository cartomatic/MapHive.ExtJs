(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 10.02.2017.
     */
    Ext.define('mh.module.auth.AccountCreator', {
        extend: 'Ext.panel.Panel',
    
        xtype: 'mh-auth-account-creator',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Form',
        'Ext.toolbar.Fill',
        'mh.module.auth.AccountCreatorController',
        'mh.module.auth.AccountCreatorController',
        'mh.module.auth.AccountCreatorModel'
    ],

    controller: 'mh-auth-account-creator',
        viewModel: {
            type: 'mh-auth-account-creator'
        },

        bind: {

        },

        header: {
            bind: {
                title: '{localisation.title}'
            },
            iconCls: 'x-li li-user-plus',
            height: 45
        },

        bodyPadding: '10 10 0 10',

        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },

        items: [
            {
                xtype: 'textfield',
                reference: 'txtEmail',
                height: 35,
                bind: {
                    emptyText: '{localisation.emailEmptyText}'
                }
            },
            {
                xtype: 'textfield',
                reference: 'txtSlug',
                height: 35,
                bind: {
                    emptyText: '{localisation.slugEmptyText}'
                }
            },
            {
                xtype: 'textfield',
                reference: 'txtForename',
                height: 35,
                bind: {
                    emptyText: '{localisation.forenameEmptyText}'
                }
            },
            {
                xtype: 'textfield',
                reference: 'txtSurname',
                height: 35,
                bind: {
                    emptyText: '{localisation.surnameEmptyText}'
                }
            }
        ],
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        bind: {
                            text: '{localisation.btnCancel}'
                        },
                        iconCls: 'x-li li-cross-circle',
                        listeners: {
                            click: 'onBtnCancelClick'
                        }
                    },
                    '->',
                    {
                        xtype: 'button',
                        bind: {
                            text: '{localisation.btnCreate}'
                        },
                        iconCls: 'x-li li-user-plus',
                        listeners: {
                            click: 'onBtnCreateProfileClick'
                        }
                    }
                ]
            }
        ]
    });
    
}());

    