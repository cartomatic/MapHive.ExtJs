//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    let logHdr = '[IMG GALLERY]_s::,Tomato';

    Ext.define('mh.module.imgGallery.ImgGalleryController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-img-gallery',

        requires: [
            'mh.module.imgGallery.ImgGalleryLocalization'
        ],

        mixins: [
            'mh.communication.MsgBus',
            'mh.mixin.CallMeParent',
            'mh.mixin.PublishApi',
            'mh.mixin.Localization',
            'mh.data.Ajax'
        ],

        /**
         * sets itself up
         */
        init: function(){
            this.callMeParent('init', arguments);
            this.injectLocalizationToViewModel();

            this.publishApi('loadImgsFromMetadataAndShow');


            // let commChannel = 'img-gallery-map_' + new Date().getTime();
            //
            // this.lookupReference('img3d').registerChannel(commChannel);
            //
            // this.watchGlobal('mapcontainer::mapcreated', this.onMapCreated, this, { channel: commChannel });
        },

        loadImgsFromMetadataAndShow: function(metadataUrl){
            //<debug>
            console.log(logHdr, 'loadImgsFromMetadataAndShow', metadataUrl);
            //</debug>

            this.getView().show();

            this.getView().setMasked({
                xtype: 'loadmask',
                message: this.getTranslation('loadingDataMask')
            });

            this.doGet({
                url: metadataUrl,
                scope: this,
                success: this.onMetadataGetSuccess,
                failure: this.onMetadataGetFailure
            });
        },

        onMetadataGetSuccess: function(response){
            //<debug>
            console.log(logHdr, 'onMetadataGetSuccess', response);
            //</debug>

            this.getViewModel().getStore('gridstore').loadData(response);

            //hide grid if one img only???
            //this.lookupReference('filesGrid').setVisibility(response.length === 1 > 1);
            let rec = this.getViewModel().getStore('gridstore').getAt(0);
            this.lookupReference('filesGrid').setSelection(rec);
            this.bindImage(rec);

            this.getView().setMasked(false);
        },

        onMetadataGetFailure: function(){
            let me = this;
            Ext.Msg.show({
                title: this.getTranslation('metadataFailureTitle'),
                message: this.getTranslation('metadataFailureMsg'),
                buttons: Ext.MessageBox.OK,
                fn: function(){
                    me.cleanAndHide();
                }
            });
        },

        cleanAndHide: function(){
            this.getView().setMasked(false);
            this.getView().hide();
        },

        onGridSelect: function(grid, location, eOpts){
            this.bindImage(location.record);
        },

        bindImage: function(rec){
            let me = this,
                url = `${rec.get('url')}?${me.getAccessTokenUrlParam()}`;

            //<debug>
            console.log('url', url);
            //</debug>

            this.lookupReference('img3dPannellum').setVisibility(false);
            this.lookupReference('img3dLeaflet').setVisibility(false);
            this.lookupReference('imgStd').setVisibility(!rec.get('is360'));

            if(rec.get('is360')){
                this.load3dImage(url, rec.get('width'), rec.get('height'));
            }
            else {

                this.lookupReference('imgStd').setSrc(url);
            }
        },

        leafletMap: null,
        leafletLayer: null,

        load3dImage: function(url, width, height){
            if(url.indexOf('360_equirectangular') > -1 || url.indexOf('360_eqr') > -1){
                this.lookupReference('img3dPannellum').setVisibility(true);

                pannellum.viewer('panorama', {
                    "type": "equirectangular",
                    "autoLoad": true,
                    "panorama": url
                });
            }
            else {
                this.lookupReference('img3dLeaflet').setVisibility(true);

                if(!this.leafletMap){
                    this.leafletMap = new L.Map('leaflet', {
                        center: [0, 0],
                        zoom: 0,
                        minZoom: -1,
                        crs: L.CRS.Simple
                    });
                }

                if(this.leafletLayer){
                    this.leafletMap.removeLayer(this.leafletLayer);
                }

                this.leafletLayer = L.tileLayer(url, {
                    tileSize: L.point(width,height),
                    bounds: [[0,-Infinity],[height,Infinity]],
                    maxNativeZoom: 0,
                    minNativeZoom: 0,
                    minZoom: -1
                });

                this.leafletLayer.addTo(this.leafletMap);

                this.leafletMap.setView([0,0], 0);

            }
        }

        // onMapCreated: function(map){
        //     this.map = map;
        //
        //     //remove the default osm layer
        //     this.removeMapLayers();
        // },
        //
        // load3dImage: function(url, width, height){
        //     if(!this.map){
        //         Ext.defer(function(){this.load3dImage(url, width, height);}, 500, this);
        //         return;
        //     }
        //
        //     let projExtent = this.map.getView().getProjection().getExtent(),
        //         // extent = [0, 0, width, height],
        //         // projection = new ol.proj.Projection({
        //         //     code: 'custom-img-proj',
        //         //     units: 'pixels',
        //         //     extent: extent
        //         // }),
        //         layer = new ol.layer.Tile({
        //             source: new ol.source.TileWMS({
        //                 url: url,
        //                 tileGrid: ol.tilegrid.TileGrid({
        //                     extent: projExtent,
        //                     resolutions: [ol.extent.getWidth(projExtent) / width],
        //                     tileSize: [width, height]
        //                 })
        //             })
        //         });
        //         // layer = new ol.layer.Image({
        //         //     source: new ol.source.ImageStatic({
        //         //         url: url,
        //         //         projection: projection,
        //         //         imageExtent: extent
        //         //     })
        //         // });
        //
        //     this.removeMapLayers();
        //
        //     console.log('projection', projection);
        //     console.log('extent', extent);
        //
        //     // this.map.setView(new ol.View({
        //     //     projection: projection,
        //     //     center: ol.extent.getCenter(extent),
        //     //     zoom: 2,
        //     //     maxZoom: 8,
        //     //     wrapX: true
        //     // }));
        //
        //     this.map.addLayer(layer);
        // },
        //
        // removeMapLayers: function(){
        //     let map = this.map,
        //         layers = map.getLayers();
        //     layers.forEach(l => {
        //         map.removeLayer(l)
        //     });
        // }

    }, function(){
        let pannellumPath = `${Ext.manifest.resources.path}/mh/jsLibs/pannellum/2.5.6`,
            leafletPath = `${Ext.manifest.resources.path}/mh/jsLibs/leaflet/1.7.1`;
        mh.util.Loader.load({
            fileList: [
                `${pannellumPath}/pannellum.css`,
                `${pannellumPath}/pannellum.js`,
                `${leafletPath}/leaflet.css`,
                `${leafletPath}/leaflet.js`
            ]
        });
    });

}());