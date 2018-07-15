//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by info_000 on 17-Aug-16.
     */
    Ext.define('mh.module.auth.PassChange', {
        extend: 'Ext.window.Window',
    
        xtype: 'mh-auth-pass-change',

    requires: [
        'Ext.form.field.Text',
        'Ext.layout.container.Anchor',
        'Ext.toolbar.Fill',
        'mh.module.auth.PassChangeController'
    ],

    controller: 'mh-auth-pass-change',
        viewModel: true,

        header: {
            bind: {
                title: '{localization.title}'
            },
            iconCls: 'x-i54c i54c-key-22',
            height: 45
        },

        modal: true,
        closeAction: 'hide',
        closable: false,
        layout: 'anchor',

        width: 400,

        defaults: {
            anchor: '100%',
            xtype: 'textfield',
            inputType: 'password',
            labelAlign: 'top',
            margin: '0 0 0 0'//trbl
        },

        bodyPadding: 10,

        items: [
            {
                reference: 'txtOldPass',
                bind: {
                    fieldLabel: '{localization.oldPass}'
                }
            },
            {
                reference: 'txtNewPass',
                bind: {
                    fieldLabel: '{localization.newPass}'
                }
            },
            {
                reference: 'txtRepeatPass',
                bind: {
                    fieldLabel: '{localization.repeatPass}'
                }
            }
        ],
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        iconCls: 'x-li li-refresh',
                        bind: {
                            text: '{localization.btnChangePass}'
                        },
                        listeners: {
                            click: 'onBtnChangePassClick'
                        }
                    },
                    {
                        iconCls: 'x-li li-cross-circle',
                        bind: {
                            text: '{localization.btnCancel}'
                        },
                        listeners: {
                            click: 'onBtnCancelClick'
                        }
                    }
                ]
            }
        ]
    });

}());