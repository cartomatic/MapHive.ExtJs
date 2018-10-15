//Disable some of the JSLint warnings
/*global window,console,Ext*/
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

        layout: 'fit',

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        iconCls: mh.FontIconsDictionary.getIcon('mhPhotoDelete'),
                        ui: 'decline round',
                        listeners: {
                            tap: 'onDeletePhoto'
                        }
                    },
                    {
                        reference: 'swapCamerasBtn',
                        iconCls: mh.FontIconsDictionary.getIcon('mhPhotoDelete'),
                        ui: 'action round',
                        listeners: {
                            tap: 'onSwapCameras'
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: mh.FontIconsDictionary.getIcon('mhPhotoSnap'),
                        ui: 'confirm round',
                        listeners: {
                            tap: 'onShowSnapPhotoDialog'
                        }
                    },
                    '->'
                ]
            },
            {
                xtype: 'tabpanel',
                tabBarPosition: 'bottom',
                reference: 'tabPanel'
            }
        ],
        listeners: {
            activate: 'onViewActivate'
        }

    });
}());
