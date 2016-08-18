//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by info_000 on 18-Aug-16.
     */
    Ext.define('mh.module.fileUpload.UploadInvitation', {
        extend: 'Ext.panel.Panel',
    
        xtype: 'mh-file-upload-inivitation',

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
    });

}());