//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * some ol.source.VectorTile helpers
     */
    Ext.define('mh.module.map.ol.VectorTileUtils', {

        singleton: true,

        /**
         * enables custom tile cache for vector tile source. custom cache is usable for tile interactions, such as reading features off them
         * @param src
         */
        enableCustomTileCache: function (src) {

            //WARNING - this is bad, bad, bad... More than likely to explode with future versions of OL
            //at some point should either create an own build of ol, that exposes some functionality to iterate through the
            //layer features OR keep on upgrading this code along with ol versions!


            //custom feature cache when vector tile source uses features for rendering
            //and another for tiles

            if(src.format_.featureClass_ === ol.Feature){
                src.on('tileloadend', (e)=>{

                    let fCache = src.fCache || {},
                        z = e.tile.getTileCoord()[0],
                        features = e.tile.getFeatures();

                    fCache[z] = fCache[z] || {};

                    features.forEach((f) => {
                        let mh_id = f.getProperties()[__mhcfg__.mhIdCol];
                        if(!fCache[z][mh_id]){
                            fCache[z][mh_id] = f;
                        }
                    });

                    src.fCache = fCache;
                });
            }
            else {
                let tileLoadFunction = src.getTileLoadFunction();

                src.setTileLoadFunction(function (t) {

                    //todo - should wipe out cache from time to time. preferably in the same cycles as the source itself
                    //potential problem though is that orig src tile cache seems to be empty for specific map zooms and bounds
                    //and in such cases widgets would not recalculate properly
                    //so initially not cleaning the cache
                    //src.tileCache.entries_

                    src.mhTileCache = src.mhTileCache || {};
                    //just using a flat cache with no zoom lvl separation. pretty much the same as in ol vector tile src itself
                    src.mhTileCache[t.tileCoord.join('/')] = t;
                    tileLoadFunction.apply(this, arguments);
                });
            }

            return src;
        },

        /**
         * @param src
         * @param zoom - since 6.x not an int anymore but Math.floor(map.zoom) - 1
         * @param mapExtent
         */
        getTilesForMapZoomAndExtent: function (src, zoom, mapExtent) {
            let outTiles = [];

            Object.keys(src.mhTileCache || {}).forEach(k => {

                let t = src.mhTileCache[k];

                if(t.tileCoord[0] === zoom && ol.extent.intersects(mapExtent, t.extent)){
                    outTiles.push(t);
                }
            });
            return outTiles;
        },

        /**
         * gets tile cache for given zoom
         * @param src
         * @param zoom
         * @returns {[]}
         */
        getTilesForMapZoom: function (src, zoom) {
            let outTiles = [];

            Object.keys(src.mhTileCache || {}).forEach(k => {

                let t = src.mhTileCache[k];

                if(t.tileCoord[0] === zoom){
                    outTiles.push(t);
                }
            });
            return outTiles;
        },

        /**
         * wires up tile load evts observers to know if a layer has finished loading its tiles
         * @param src
         */
        wireUpVectorTileLayerSourceTileEvents: function(src){

            //In order to get viable widget outputs need to track the vector tile layer tile loading in order to provide proper widget stats.
            src.tileTracker = 0;

            src.on('tileloadstart', (e) => { src.tileTracker += 1; });
            src.on('tileloadend', (e) => { src.tileTracker -= 1; });

            src.on('tileloaderror', (e) => {
                src.tileTracker -= 1;
                //<debug>
                console.error('fuck - tile load error');
                console.log('err evt', e);
                //</debug>
            });
        }
    });
}());