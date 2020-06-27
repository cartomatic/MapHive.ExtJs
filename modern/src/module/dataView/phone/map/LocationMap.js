//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 10.10.2018.
     */
    Ext.define('mh.module.dataView.phone.map.LocationMap', {
        extend: 'Ext.Panel',

        requires: [
            'mh.module.dataView.phone.map.LocationMapController',
            'mh.module.dataView.phone.map.LocationMapModel',
            'mh.FontIconsDictionary',
            'mh.module.dataView.phone.map.Icons',
            'mh.module.commonConfig.CommonConfig'
        ],

        xtype: 'mh-phone-location-map',

        controller: 'mh-phone-location-map',

        viewModel: {
            type: 'mh-phone-location-map'
        },

        bodyPadding: 5,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        bind: {
            title: '{localization.title}'
        },

        config: {
            editAllowed: true,
            initialLongitude: null,
            initialLatitude: null,

            /**
             * pushed into map component as a base layer
             */
            baseLayer: 'OSM'
        },

        items: [
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'numberfield',
                        bind: {
                            label: '{localization.longitude}'
                        },
                        reference: 'numFldLon',
                        decimals: 8,
                        minValue: -180,
                        maxValue: 180,
                        flex: 1,
                        listeners: {
                            change: 'onLonChange'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'numberfield',
                        bind: {
                            label: '{localization.latitude}'
                        },
                        reference: 'numFldLat',
                        decimals: 8,
                        minValue: -90,
                        maxValue: 90,
                        flex: 1,
                        margin: '0 5 0 5',
                        listeners: {
                            change: 'onLatChange'
                        },
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'fit',
                flex: 1,
                reference: 'mapOuterContainer',
                items: [
                    //created in controller so can pass through a base layer for a map
                    // {
                    //     xtype: 'mh-ol-map-container',
                    //     reference: 'mapContainer',
                    //     cls: 'edit-wizard-swipe-ignore'
                    // },
                    {
                        xtype: 'button',
                        reference: 'savePositionEditBtn',
                        iconCls: mh.FontIconsDictionary.getIcon('mhMapPositionConfirm'),
                        listeners: {
                            tap: 'onSavePositionEditBtnTap'
                        },
                        ui: 'mh-phone-green-btn raised',
                        top: 10,
                        right: 120,
                        width: (mh.module.commonConfig.CommonConfig.locationMap || {}).btnWidth,
                        height: (mh.module.commonConfig.CommonConfig.locationMap || {}).btnHeight,
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        reference: 'discardPositionEditBtn',
                        iconCls: mh.FontIconsDictionary.getIcon('mhMapPositionCancel'),
                        listeners: {
                            tap: 'onDiscardPositionEditBtnTap'
                        },
                        ui: 'mh-phone-red-btn raised',
                        top: 10,
                        right: 65,
                        width: (mh.module.commonConfig.CommonConfig.locationMap || {}).btnWidth,
                        height: (mh.module.commonConfig.CommonConfig.locationMap || {}).btnHeight,
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        reference: 'gpsBtn',
                        iconCls: mh.FontIconsDictionary.getIcon('mhMapGps'),
                        listeners: {
                            tap: 'onGpsBtnTap'
                        },
                        ui: 'mh-phone-purple-btn raised',
                        top: 10,
                        right: 10,
                        width: (mh.module.commonConfig.CommonConfig.locationMap || {}).btnWidth,
                        height: (mh.module.commonConfig.CommonConfig.locationMap || {}).btnHeight,
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        reference: 'enablePositionEditBtn',
                        iconCls: mh.FontIconsDictionary.getIcon('mhMapPositionEdit'),
                        listeners: {
                            tap: 'onEnablePositionEditBtnTap'
                        },
                        ui: 'mh-phone-blue-btn raised',
                        top: 10,
                        right: 10,
                        width: (mh.module.commonConfig.CommonConfig.locationMap || {}).btnWidth,
                        height: (mh.module.commonConfig.CommonConfig.locationMap || {}).btnHeight,
                        hidden: true
                    }
                ]
            }
        ],

        //because this component is data bound from a form it requires setters to be defined at a definition time, not when controller kicks in

        setLon: function(lon){
            this.getController().setLon(lon);
        },

        setLat: function(lat){
            this.getController().setLat(lat);
        },

        setAccuracy: function(accuracy){
            this.getController().setAccuracy(accuracy);
        }
    });
}());
