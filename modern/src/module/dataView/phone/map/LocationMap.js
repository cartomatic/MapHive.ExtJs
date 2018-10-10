//Disable some of the JSLint warnings
/*global window,console,Ext*/
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
            'mh.module.dataView.phone.map.Icons'
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
            initialLongitude: null,
            initialLatitude: null
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
                        }
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
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: mh.FontIconsDictionary.getIcon('mhMapGps'),
                        listeners: {
                            tap: 'onGpsBtnTap'
                        },
                        ui: 'mh-phone-location-map-soft-green-btn',
                        width: 50,
                        height: 50
                    }
                ]
            },
            {
                xtype: 'mh-ol3-map-container',
                reference: 'mapContainer',
                flex: 1
            }
        ],

        //because this component is data bound from a form it requires setters to be defined at a definition time, not when controller kicks in

        setLongitude: function(lon){
            this.getController().setLongitude(lon);
        },

        setLatitude: function(lat){
            this.getController().setLatitude(lat);
        },

        setAccuracy: function(accuracy){
            this.getController().setAccuracy(accuracy);
        }
    });
}());
