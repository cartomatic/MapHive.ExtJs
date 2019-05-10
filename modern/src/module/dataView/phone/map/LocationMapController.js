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

            this.publishApi('getLocationData', 'isComplete');

            var vw = this.getView(),
                commChannel = 'locationmap_' + new Date().getTime(),
                mapContainer = this.lookupReference('mapContainer'),
                mapOuterContainer = this.lookupReference('mapOuterContainer');

            //this.getView().down('mh-ol3-map-container').registerChannel(commChannel);
            mapContainer.registerChannel(commChannel);

            this.watchGlobal('mapcontainer::mapcreated', this.onMapCreated, this, { channel: commChannel });



            this.editAllowed = vw.getEditAllowed();

            vw.on('painted', function(){
                mapOuterContainer.setBodyPadding(1);
                setTimeout(function(){
                    //<debug>
                    console.warn('Resizing map viewport... Should make the map re-appear in a brut force way...');
                    console.warn('mapOuterContainer padding', mapOuterContainer.getBodyPadding());
                    //</debug>
                    mapOuterContainer.setBodyPadding(0);
                    //<debug>
                    console.warn('mapOuterContainer padding', mapOuterContainer.getBodyPadding());
                    //</debug>
                })
            });
        },

        editAllowed: false,

        /**
         * start position edit
         */
        onEnablePositionEditBtnTap: function(){
            //first enforce orig position
            this.updateMapInternal(true);
            //next make editable
            this.setEditable(true);
        },

        /**
         * save position edit
         */
        onSavePositionEditBtnTap: function(){
            this.reportChange();
            this.setEditable(false);
            this.updateMapInternal(true);
        },

        /**
         * discard position edit
         */
        onDiscardPositionEditBtnTap: function(){
            this.setEditable(false);
            this.setLon(this.snapLon);
            this.setLat(this.snapLat);
            this.setAccuracy(this.snapAccuracy);
        },

        /**
         * sets the module editability
         * @param editable
         */
        setEditable: function(editable){
            this.editable = editable;

            if(!this.mapMoveEndCallback){
                this.mapMoveEndCallback = Ext.bind(this.onMapMoveEnd, this);
            }


            this.lookupReference('enablePositionEditBtn').setVisibility(!editable && this.editAllowed);
            this.lookupReference('gpsBtn').setVisibility(editable);
            this.lookupReference('discardPositionEditBtn').setVisibility(editable);
            this.lookupReference('savePositionEditBtn').setVisibility(editable);

            this.lookupReference('numFldLat').setReadOnly(!editable);
            this.lookupReference('numFldLon').setReadOnly(!editable);

            if(editable){
                this.map.on('moveend', this.mapMoveEndCallback);

                document.getElementById(this.mapCenterMarkerId).style.display = 'block';
                //<debug>
                document.getElementById(this.mapCenterDebugMarkerId).style.display = 'block';
                //</debug>

                this.markerLayer.setVisible(false);

                //take a snapshot of the current values
                this.snapLon = this.lon;
                this.snapLat = this.lat;
                this.snapAccuracy = this.accuracy;

            }
            else {
                this.map.un('moveend', this.mapMoveEndCallback);

                document.getElementById(this.mapCenterMarkerId).style.display = 'none';
                //<debug>
                document.getElementById(this.mapCenterDebugMarkerId).style.display = 'none';
                //</debug>

                this.markerLayer.setVisible(true);

                //reset gps just in a case
                this.geolocation.setTracking(false);
            }
        },

        /**
         * map instance
         */
        map: null,

        /**
         * edit mode marker div id
         */
        mapCenterMarkerId: null,

        //<debug>
        /**
         * edit mode debug marker id
         */
        mapCenterDebugMarkerId: null,
        //</debug>

        /**
         * marker layer
         */
        markerLayer: null,

        /**
         * @private
         */
        mapMoveEndCallback: null,

        /**
         * map created callback
         */
        onMapCreated: function(map){
            //observe map position change & update txt fields + fire evts

            this.map = map;

            this.mapCenterMarkerId = this.getId() + '-marker';
            this.mapCenterDebugMarkerId = this.getId() + '-debug-marker';

            //add a div that will display in the center of the map
            Ext.dom.Helper.append(
                this.lookupReference('mapContainer').el,
                '<div id="' + this.mapCenterMarkerId + '" class="' + mh.FontIconsDictionary.getIcon('mhMapPositionPin') + '" style="position: absolute; left: 50%; top: 50%; width: 2px; height:2px; margin-left:-21px; margin-top:-27px; display: none;" />');
            //<debug>
            //debug red dot, so can ensure positioning is ok
            Ext.dom.Helper.append(
                this.lookupReference('mapContainer').el,
                '<div id="' + this.mapCenterDebugMarkerId + '" style="position: absolute; left: 50%; top: 50%; width: 2px; height:2px; margin-left:-1px; margin-top:-1px; background-color: red; display: none;" />'
            );
            //</debug>


            this.setUpGeoLocation(map);

            //this sucks a bit as the first call does not return the char because of some reason...

            while(!mh.FontIconsDictionary.getFontChar('.i54c-location-4::before')){
                //bleh
                //<debug>
                console.warn('Waiting for the bloody font icon...');
                //</debug>
            }

            var fontIcon = String.fromCharCode(mh.FontIconsDictionary.getFontChar('.i54c-location-4::before'));

            //set up center layer
            this.markerLayer = new ol.layer.Vector({
                source: new ol.source.Vector(),
                style: new ol.style.Style({
                    text: new ol.style.Text({
                        text: fontIcon,
                        font: 'normal 31pt icon54com',
                        textBaseline: 'bottom',
                        fill: new ol.style.Fill({
                            color: '#000000'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#c1c1c1',
                            width: 2
                        }),
                        offsetY: 3
                    })
                })
            });
            map.addLayer(this.markerLayer);

            //after setup. initially set the editability off!
            this.setEditable(false);

            //force redraw on init
            this.updateMap(true);
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
            var
                //not using accuracy geom, as need to save the value and render it independently
                // accuracy = new ol.Feature({
                //     geometry: this.geolocation.getAccuracyGeometry()
                // }),
                lonLat = ol.proj.transform(this.geolocation.getPosition(), 'EPSG:3857', 'EPSG:4326');

            //see comments above
            // this.olVectorLayerGps.getSource().clear();
            // this.olVectorLayerGps.getSource().addFeatures([accuracy]);

            this.setLon(lonLat[0], true);
            this.setLat(lonLat[1], true);
            this.setAccuracy(this.geolocation.getAccuracy(), true);

            this.geolocation.setTracking(false);

            //when using the std setters, they should reposition the map
            this.updateMapInternal(true); //true to force update
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
        lon: null,

        /**
         * lon snapshot so can be restored on dismiss
         */
        snapLon: null,

        /**
         * previous lon
         */
        prevLon: null,

        /**
         * current lat
         */
        lat: null,

        /**
         * lar snapshot so can be restored on dismiss
         */
        snapLat: null,

        /**
         * previous lat
         */
        prevLat: null,

        /**
         * curent gps accuracy; present only when position set via gps
         */
        accuracy: null,

        /**
         * accuracy snapshot so can be restored on dismiss
         */
        snapAccuracy: null,

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
        setLon: function(lon, silent){
            if(!Ext.isNumber(lon) || lon > 180 || lon < -180){
                lon = this.getView().getInitialLongitude() || 0;
            }

            if(this.lon !== lon){
                this.lon = lon;

                //avoid triggering multiple map updates
                //after all an update call is trigerred below based on the silent flag
                var fld = this.lookupReference('numFldLon');
                fld.suspendEvent('change');
                fld.setValue(lon);
                fld.resumeEvent('change');

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
        setLat: function(lat, silent){
            if(!Ext.isNumber(lat) || lat > 90 || lat < -90){
                lat = this.getView().getInitialLatitude() || 0;
            }

            if(this.lat !== lat){
                this.lat = lat;

                //avoid triggering multiple map updates
                //after all an update call is trigerred below based on the silent flag
                var fld = this.lookupReference('numFldLat');
                fld.suspendEvent('change');
                fld.setValue(lat);
                fld.resumeEvent('change');

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
            this.setLon(newV);
        },

        /**
         * lat input change listener
         * @param numfld
         * @param newV
         * @param oldV
         */
        onLatChange: function(numfld, newV, oldV){
            this.setLat(newV);
        },

        /**
         * map update scheduler
         */
        mapUpdateScheduler: null,

        /**
         * triggers map update
         * @param force
         */
        updateMap: function(force){
            clearTimeout(this.mapUpdateScheduler);
            this.mapUpdateScheduler = Ext.defer(function(){
                this.updateMapInternal(force);
            }, 100, this);
        },

        /**
         * internal map update procedure
         * @param force
         */
        updateMapInternal: function(force){
            if(!this.map){
                return;
            }

            //<debug>
            console.log('update map internal');
            //</debug>

            var mapV = this.map.getView(),
                currentCenter = ol.proj.transform(mapV.getCenter(), 'EPSG:3857','EPSG:4326'),
                newCenter,
                accuracy;

            if(!force && currentCenter[0] === this.lon && currentCenter[1] === this.lat){
                return;
            }

            newCenter = ol.proj.transform([this.lon,this.lat], 'EPSG:4326', 'EPSG:3857');

            mapV.setCenter(newCenter);
            mapV.setZoom(17);


            //draw accuracy marker if accuracy present!
            this.olVectorLayerGps.getSource().clear();
            if(this.accuracy){
                accuracy = new ol.Feature(new ol.geom.Circle(newCenter, this.accuracy));
                this.olVectorLayerGps.getSource().addFeatures([accuracy])
            }

            if(!this.editable){
                this.markerLayer.getSource().clear();
                this.markerLayer.getSource().addFeatures([
                    new ol.Feature(new ol.geom.Point(newCenter))
                ]);
            }
        },

        /**
         * reports state change
         */
        reportChange: function(){

            var vw = this.getView(),
                current, prev;

            current = {lon: this.lon, lat: this.lat, accuracy: this.accuracy};
            prev = {lon: this.prevLon, lat: this.prevLat, accuracy: this.prevAccuracy};

            this.prevLon = this.lon;
            this.prevLat = this.lat;
            this.prevAccuracy = this.accuracy;

            vw.fireEvent('locationchanged', this.getView(), current, prev);
        },

        /**
         * map move end handler
         * @param e
         */
        onMapMoveEnd: function(e){

            var coords = e.map.getView().getCenter(),
                lonLat = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');

            //reset accuracy when map has changed and this is not GPS position
            //gps sets position directly and triggers map update internal, so this will be 'moveend' callback
            if(this.lon !== lonLat[0] || this.lat !== lonLat[1]){
                this.resetAccuracy();
            }

            this.setLon(lonLat[0], true);
            this.setLat(lonLat[1], true);
        },

        /**
         * returns a complete set of handled location data
         */
        getLocationData: function(){
            return {
                lon: this.lon,
                lat: this.lat,
                accuracy: this.accuracy
            }
        },

        isComplete: function(){
            var vw = this.getView();

            if(!this.map){
                //late binding, so no data yet unfortunately. pretend form is valid
                return true;
            }

            if(this.editable){
                return this.getTranslation('incompleteLocationNotSaved');
            }

            if(this.lon === vw.getInitialLongitude() && this.lat === vw.getInitialLatitude() || !this.lon && !this.lat){
                return this.getTranslation('incompleteLocationMsg');
            }
            return true;
        }
    });
}());
