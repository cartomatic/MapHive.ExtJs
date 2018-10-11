//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 10.10.2018.
     */
    Ext.define('mh.module.dataView.phone.map.LocationMapController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-location-map',

        requires: [
            'mh.module.dataView.phone.map.LocationMapLocalization'
        ],

        mixins: [
            'mh.mixin.Localization',
            'mh.communication.MsgBus',
            'mh.mixin.PublishApi'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalizationToViewModel();

            this.publishApi('getLocationData');

            var commChannel = 'locationmap_' + new Date().getTime();
            //this.getView().down('mh-ol3-map-container').registerChannel(commChannel);
            this.lookupReference('mapContainer').registerChannel(commChannel);

            this.watchGlobal('mapcontainer::mapcreated', this.onMapCreated, this, { channel: commChannel });

        },

        map: null,

        /**
         * map created callback
         */
        onMapCreated: function(map){
            //observe map position change & update txt fields + fire evts

            this.map = map;

            //create an accuracy layer

            //add a div that will display in the center of the map
            Ext.dom.Helper.append(
                this.lookupReference('mapContainer').el,
                '<div class="' + mh.FontIconsDictionary.getIcon('mhMapPositionPin') + '" style="position: absolute; left: 50%; top: 50%; width: 2px; height:2px; margin-left:-21px; margin-top:-27px;" />');
            //<debug>
            //debug red dot, so can ensure positioning is ok
            Ext.dom.Helper.append(
                this.lookupReference('mapContainer').el,
                '<div style="position: absolute; left: 50%; top: 50%; width: 2px; height:2px; margin-left:-1px; margin-top:-1px; background-color: red;" />'
            );
            //</debug>

            map.on('moveend', Ext.bind(this.onMapMoveEnd, this));

            this.setUpGeoLocation(map);

            this.updateMap();
        },

        /**
         * ol geolocation object
         */
        geolocation: null,

        /**
         * gps readout layer
         */
        olVectorLayerGps: null,

        /**
         * sets up geolocation
         * @param map
         */
        setUpGeoLocation: function(map){

            //gps stuf
            this.geolocation = new ol.Geolocation({
                trackingOptions: {
                    enableHighAccuracy: true,
                    timeout: 180000,
                    maximumAge: 0
                },
                projection: map.getView().getProjection()
            });
            this.geolocation.on('change', Ext.bind(this.onGeolocationChange, this));
            this.geolocation.on('error', Ext.bind(this.onGeolocationError, this));

            this.olVectorLayerGps = new ol.layer.Vector({
                source: new ol.source.Vector(),
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: [0,52,153,0.8]
                    }),
                    fill: new ol.style.Fill({
                        color: [0,51,153,0.2]
                    })
                    //no image, using a pin!,
                    // image: new ol.style.Icon({
                    //     src: 'resources/images/gps.png',
                    //     size: [20,20]
                    // })
                })
            });

            map.addLayer(this.olVectorLayerGps);

        },

        /**
         * geolocation change evt listener
         * @param evt
         */
        onGeolocationChange: function(evt){
            var accuracy = new ol.Feature({
                    geometry: this.geolocation.getAccuracyGeometry()
                }),
                lonLat = ol.proj.transform(this.geolocation.getPosition(), 'EPSG:3857', 'EPSG:4326');

            // this.olVectorLayerGps.getSource().clear();
            // this.olVectorLayerGps.getSource().addFeatures([accuracy]);

            this.setLongitude(lonLat[0]);
            this.setLatitude(lonLat[1]);
            this.setAccuracy(this.geolocation.getAccuracy());

            this.geolocation.setTracking(false);

            //when using the std setters, they should reposition the map
            this.updateMapInternal();
        },

        /**
         * geolocation err
         */
        onGeolocationError: function(){
            this.resetAccuracy();
        },

        /**
         * resets accuracy
         */
        resetAccuracy: function(){
            this.setAccuracy(null);
            this.olVectorLayerGps.getSource().clear();
        },

        /**
         * gps tap btn handler
         */
        onGpsBtnTap: function(){
            this.geolocation.setTracking(true);
        },

        /**
         * current lon
         */
        longitude: null,

        /**
         * previous lon
         */
        prevLongitude: null,

        /**
         * current lat
         */
        latitude: null,

        /**
         * previous lat
         */
        prevLatitude: null,

        /**
         * curent gps accuracy; present only when position set via gps
         */
        accuracy: null,

        /**
         * previous gps accuracy
         */
        prevAccuracy: null,

        /**
         * accuracy setter
         * @param accuracy
         * @param silent
         */
        setAccuracy: function(accuracy, silent){
            this.accuracy = accuracy;

            if(!this.map){
                return;
            }

            if(silent !== true){
                this.updateMap();
            }
        },

        /**
         * lon settere
         * @param lon
         * @param silent
         */
        setLongitude: function(lon, silent){
            if(!Ext.isNumber(lon) || lon > 180 || lon < -180){
                lon = this.getView().getInitialLongitude() || 0;
            }

            if(this.longitude !== lon){
                this.lookupReference('numFldLon').setValue(lon);
                this.longitude = lon;

                if(silent !== true){
                    this.updateMap();
                }
            }
        },

        /**
         * lat setter
         * @param lat
         * @param silent
         */
        setLatitude: function(lat, silent){
            if(!Ext.isNumber(lat) || lat > 90 || lat < -90){
                lat = this.getView().getInitialLatitude() || 0;
            }

            if(this.latitude !== lat){
                this.lookupReference('numFldLat').setValue(lat);
                this.latitude = lat;

                if(silent !== true){
                    this.updateMap();
                }
            }
        },

        /**
         * lon input change listener
         * @param numfld
         * @param newV
         * @param oldV
         */
        onLonChange: function(numfld, newV, oldV){
            this.setLongitude(newV);
        },

        /**
         * lat input change listener
         * @param numfld
         * @param newV
         * @param oldV
         */
        onLatChange: function(numfld, newV, oldV){
            this.setLatitude(newV);
        },

        /**
         * map update scheduler
         */
        mapUpdateScheduler: null,

        /**
         * triggers map update
         */
        updateMap: function(){
            clearTimeout(this.mapUpdateScheduler);
            this.mapUpdateScheduler = Ext.defer(function(){
                this.updateMapInternal();
            }, 100, this);
        },

        /**
         * internal map update procedure
         */
        updateMapInternal: function(){
            if(!this.map){
                return;
            }

            var mapV = this.map.getView(),
                currentCenter = ol.proj.transform(mapV.getCenter(), 'EPSG:3857','EPSG:4326'),
                newCenter,
                accuracy;

            if(currentCenter[0] === this.longitude && currentCenter[1] === this.latitude){
                return;
            }

            newCenter = ol.proj.transform([this.longitude,this.latitude], 'EPSG:4326', 'EPSG:3857');

            mapV.setCenter(newCenter);
            mapV.setZoom(17);


            //draw accuracy marker if accuracy present!
            if(this.accuracy){
                accuracy = new ol.Feature(new ol.geom.Circle(newCenter, this.accuracy));
                this.olVectorLayerGps.getSource().clear();
                this.olVectorLayerGps.getSource().addFeatures([accuracy])
            }

        },

        reportChange: function(){

            var current = {lon: this.longitude, lat: this.latitude, accuracy: this.accuracy},
                prev = {lon: this.prevLongitude, lat: this.prevLatitude, accuracy: this.prevAccuracy};

            this.prevLongitude = this.longitude;
            this.prevLatitude = this.latitude;
            this.prevAccuracy = this.accuracy;

            this.getView().fireEvent('locationchanged', this.getView(), current, prev);
        },

        /**
         * map move end handler
         * @param e
         */
        onMapMoveEnd: function(e){
            var coords = e.map.getView().getCenter(),
                lonLat = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');

            //reset accuracy when map has changed and this is not GPS position
            //gps sets position directly and triggers map update internal, so this will be move end callback
            if(this.longitude !== lonLat[0] || this.latitude !== lonLat[1]){
                this.resetAccuracy();
            }

            this.setLongitude(lonLat[0], true);
            this.setLatitude(lonLat[1], true);

            this.reportChange();
        },

        /**
         * returns a complete set of handled location data
         */
        getLocationData: function(){
            return {
                lon: this.longitude,
                lat: this.latitude,
                accuracy: this.accuracy
            }
        }
    });
}());
