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
            outputMime: 'image/png',

            /**
             * whether or not photo snapping is allowed
             */
            allowPhoto: true,

            /**
             * whether or not module should work in upload mode instead
             */
            allowUpload: false
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
                reference: 'snapPhotoBtn',
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
                xtype: 'button',
                reference: 'uploadBtn',
                hidden: true,
                iconCls: mh.FontIconsDictionary.getIcon('mhPhotoUpload'),
                ui: 'mh-phone-purple-btn raised',
                right: 15,
                bottom: ((mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnHeight || 50) + 10,
                width: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnWidth,
                height: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnHeight,
                listeners: {
                    tap: 'onUploadPhotoDialog'
                }
            },
            {
                xtype: 'tabpanel',
                tabBarPosition: 'top',
                reference: 'tabPanel',
                layout: {
                    type: 'card',
                    animation: 'fade'
                }
            }
        ],
        listeners: {
            activate: '__onViewActivate'
        }

    });
}());
