//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.imgGallery.ImgGallery', {
        extend: 'Ext.Panel',

        xtype: 'mh-img-gallery',

        requires: [
            'mh.module.imgGallery.ImgGalleryController',
            'mh.module.imgGallery.ImgGalleryModel',
            'mh.FontIconsDictionary',
            'mh.module.imgGallery.Icons'
        ],

        controller: 'mh-img-gallery',
        viewModel: {
            type: 'mh-img-gallery'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhImgGallery'),

        bind: {
            title: '{localization.viewName}'
        },

        width: '75%',
        height: '75%',
        centered: true,
        floated: true,
        modal: true,
        closable: true,
        closeAction: 'hide',
        hideOnMaskTap: true,
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        bodyPadding: 10,
        items: [
            {
                xtype: 'grid',
                width: 250,
                reference: 'filesGrid',
                bind: {
                    title: '{localization.gridTitle}',
                    store: '{gridstore}'
                },
                iconCls: mh.FontIconsDictionary.getIcon('mhImgGalleryImgStd'),
                hideHeader: true,
                columns: [
                    {
                        dataIndex: 'name',
                        cell: {
                            encodeHtml: false
                        },
                        width: 30,
                        tpl: [
                            '<span class="icon {[this.getIcon(values.is360)]}"></span>',
                            {
                                getIcon: function(is360){
                                    return mh.FontIconsDictionary.getIcon(
                                        is360 ? 'mhImgGalleryImg360' : 'mhImgGalleryImgStd'
                                    );
                                }
                            }
                        ]
                    },
                    {
                        dataIndex: 'name',
                        bind: {
                            text: '{localization.fName}'
                        },
                        flex: 1
                    }
                ],
                listeners: {
                    childtap: 'onGridSelect'
                }
            },
            {
                xtype: 'img',
                margin: '0 0 0 10',
                reference: 'imgStd',
                flex: 1,
                hidden: true
            },
            // {
            //     xtype: 'mh-ol-map-container',
            //     margin: '0 0 0 10',
            //     reference: 'img3d',
            //     flex: 1
            // }
            {
                xtype: 'container',
                reference: 'img3dPannellum',
                margin: '0 0 0 10',
                flex: 1,
                html: '<div id="panorama" style="width: 100%; height: 100%; position: absolute;"></div>',
                hidden: true
            },
            {
                xtype: 'container',
                reference: 'img3dLeaflet',
                margin: '0 0 0 10',
                flex: 1,
                html: '<div id="leaflet" style="width: 100%; height: 100%; position: absolute;"></div>',
                hidden: true
            }
        ]
    });

}());