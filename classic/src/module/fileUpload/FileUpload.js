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

        layout: 'anchor',

        defaults: {
            anchor: '100%'
        },

        items: [
            {
                xtype: 'container',
                reference: 'fileUploadHolder',
                hidden: true
            },
            {
                xtype: 'panel',
                height: 80,
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
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                            align: 'center'
                        },
                        items: [
                            {
                                xtype: 'button',
                                bind: {
                                    text: '{localisation.uploadBtn}'
                                },
                                ui: 'mh-upload-button',
                                style: {
                                    textDecoration: 'underline'
                                },
                                listeners: {
                                    click: 'onBtnUploadClick'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                ui: 'mh-upload-drag-desc',
                                bind: {
                                    value: '{localisation.uploadDragHere}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        bodyPadding: 5,
                        reference: 'selectedFiles',
                        scrollable: 'y',
                        height: 40
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
                        }
                    },
                    {
                        reference: 'cancelBtn',
                        iconCls: 'x-fa fa-remove',
                        bind: {
                            text: '{localisation.btnCancel}'
                        }
                    }
                ]
            }
        ]
    });
}());