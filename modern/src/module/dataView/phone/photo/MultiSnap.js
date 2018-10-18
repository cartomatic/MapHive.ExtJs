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
                xtype: 'button',
                iconCls: mh.FontIconsDictionary.getIcon('mhPhotoDelete'),
                ui: 'mh-phone-photo-dismiss-btn raised',
                left: 20,
                bottom: 20,
                listeners: {
                    tap: 'onDeletePhoto'
                }
            },
            {
                xtype: 'button',
                iconCls: mh.FontIconsDictionary.getIcon('mhPhotoSnap'),
                ui: 'mh-phone-photo-snap-btn raised',
                right: 20,
                bottom: 20,
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
            activate: 'onViewActivate'
        }

    });
}());
