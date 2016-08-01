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
            'mh.module.fileUpload.FileUploadController'
        ],

    controller: 'mh-file-upload',

        iconCls: 'x-fa fa-upload',

        width: 400,

        closeAction: 'hide',

        modal: true,

        bodyPadding: 5,

        layout: 'fit',

        config: {
            multi: true,
            overCls: 'mh-upload-drag-over',
            uploadUrl: null
        },

        items: [
            {
                xtype: 'panel',
                height: 120,
                border: 'solid 1px',

                reference: 'uploadInvitation',

                listeners: {
                    drop: {
                        element: 'el',
                        fn: 'onFilesDrop'
                    },
                    dragstart: {
                        element: 'el',
                        fn: 'addDropZone'
                    },
                    dragenter: {
                        element: 'el',
                        fn: 'addDropZone'
                    },
                    dragover: {
                        element: 'el',
                        fn: 'addDropZone'
                    },
                    dragleave: {
                        element: 'el',
                        fn: 'removeDropZone'
                    },
                    dragexit: {
                        element: 'el',
                        fn: 'removeDropZone'
                    }
                },

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [
                    {
                        xtype: 'container',
                        reference: 'fileUploadHolder',
                        hidden: true
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                            align: 'center'
                        },
                        items: [
                            {
                                xtype: 'button',
                                reference: 'btnChooseFiles',
                                ui: 'mh-upload-button',
                                style: {
                                    textDecoration: 'underline'
                                },
                                listeners: {
                                    click: 'onBtnChooseFilesClick'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                reference: 'uploadDragHere',
                                ui: 'mh-upload-drag-desc'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        padding: 5,
                        reference: 'selectedFiles',
                        scrollable: 'y'
                    }
                ]
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
                        iconCls: 'x-fa fa-upload',
                        bind: {
                            text: '{localisation.btnUpload}'
                        },
                        listeners: {
                            click: 'onBtnUploadClick'
                        }
                    },
                    {
                        reference: 'cancelBtn',
                        iconCls: 'x-fa fa-remove',
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