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
            'mh.communication.MsgBus'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalizationToViewModel();

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

            this.updateMap();
        },

        onGpsBtnTap: function(){

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

        onLonChange: function(numfld, newV, oldV){
            this.setLongitude(newV);
        },

        onLatChange: function(numfld, newV, oldV){
            this.setLatitude(newV);
        },

        mapUpdateScheduler: null,

        updateMap: function(){
            clearTimeout(this.mapUpdateScheduler);
            this.mapUpdateScheduler = Ext.defer(function(){
                this.updateMapInternal();
            }, 100, this);
        },

        updateMapInternal: function(){
            if(!this.map){
                return;
            }

            var mapV = this.map.getView(),
                currentCenter = ol.proj.transform(mapV.getCenter(), 'EPSG:3857','EPSG:4326'),
                current = {longitude: this.longitude, latitude: this.latitude, accuracy: this.accuracy},
                prev = {longitude: this.prevLongitude, latitude: this.prevLatitude, accuracy: this.prevAccuracy};

            if(currentCenter[0] === this.longitude && currentCenter[1] === this.latitude){
                return;
            }

            mapV.setCenter(ol.proj.transform([this.longitude,this.latitude], 'EPSG:4326', 'EPSG:3857'));
            mapV.setZoom(17);

            this.prevLongitude = this.longitude;
            this.prevLatitude = this.latitude;
            this.prevAccuracy = this.accuracy;

            this.fireEvent('positionchanged', this.getView(), current, prev);

        },

        /**
         * map move end handler
         * @param e
         */
        onMapMoveEnd: function(e){
            var coords = e.map.getView().getCenter(),
                lonLat = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');

            this.setLongitude(lonLat[0], true);
            this.setLatitude(lonLat[1], true);
        }

        //get data - in one step an object??? or an evt...
    });
}());
