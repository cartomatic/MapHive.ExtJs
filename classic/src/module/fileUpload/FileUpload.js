(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 28-Jul-16.
     */
    Ext.define('mh.module.fileUpload.FileUpload', {
        extend: 'Ext.window.Window',
    
        xtype: 'mh-file-upload',

        requires: [
            'mh.module.fileUpload.FileUploadController',
            'mh.module.fileUpload.UploadInvitation'
        ],

    controller: 'mh-file-upload',

        iconCls: 'x-i54c i54c-upload',

        width: 400,

        closeAction: 'hide',

        modal: true,

        bodyPadding: 5,

        layout: 'fit',

        config: {
            multi: true,
            overCls: 'mh-upload-drag-over',
            uploadUrl: null,
            //file upload callbacks
            fileUploadSuccess: null,
            fileUploadFailure: null
        },

        items: [
            {
                xtype: 'mh-file-upload-inivitation'
            }
        ],

        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        reference: 'uploadBtn',
                        iconCls: 'x-i54c i54c-upload',
                        bind: {
                            text: '{localization.btnUpload}'
                        },
                        listeners: {
                            click: 'onBtnUploadClick'
                        }
                    },
                    {
                        reference: 'cancelBtn',
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