//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 14.10.2018.
     */
    Ext.define('mh.module.dataView.phone.photo.MultiSnap', {
        extend: 'Ext.Panel',
    
        xtype: 'mh-phone-photo-multi-snap',

        requires: [
            'mh.module.dataView.phone.photo.MultiSnapController'
        ],

        controller: 'mh-phone-photo-multi-snap',

        config: {
            /**
             * output mime when collecting data off the canvas; supported mime are: 'image/png', 'image/jpeg', 'image/gif'
             */
            outputMime: 'image/png'
        },

        layout: 'fit',

        items: [
            {
                xtype: 'button',
                iconCls: mh.FontIconsDictionary.getIcon('mhPhotoDelete'),
                ui: 'mh-phone-red-btn raised',
                left: 15,
                bottom: 15,
                width: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnWidth,
                height: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnHeight,
                listeners: {
                    tap: 'onDeletePhoto'
                }
            },
            {
                xtype: 'button',
                iconCls: mh.FontIconsDictionary.getIcon('mhPhotoSnap'),
                ui: 'mh-phone-green-btn raised',
                right: 15,
                bottom: 15,
                width: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnWidth,
                height: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnHeight,
                listeners: {
                    tap: 'onShowSnapPhotoDialog'
                }
            },
            {
                xtype: 'tabpanel',
                tabBarPosition: 'top',
                reference: 'tabPanel'
            }
        ],
        listeners: {
            activate: '__onViewActivate'
        }

    });
}());
