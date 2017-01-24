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
            'mh.module.auth.PassChangeController'
        ],

        controller: 'mh-auth-pass-change',
        viewModel: true,

        header: {
            bind: {
                title: '{localisation.title}'
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
                    fieldLabel: '{localisation.oldPass}'
                }
            },
            {
                reference: 'txtNewPass',
                bind: {
                    fieldLabel: '{localisation.newPass}'
                }
            },
            {
                reference: 'txtRepeatPass',
                bind: {
                    fieldLabel: '{localisation.repeatPass}'
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
                            text: '{localisation.btnChangePass}'
                        },
                        listeners: {
                            click: 'onBtnChangePassClick'
                        }
                    },
                    {
                        iconCls: 'x-li li-cross-circle',
                        bind: {
                            text: '{localisation.btnCancel}'
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