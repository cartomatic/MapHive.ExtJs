//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    var logHdr = '[MODAL EDIT],_s::,LightSeaGreen,';

    /**
     * allows for modal record viewing or editing - assumes a standardised edit / record view to be passed
     */
    Ext.define('mh.module.dataView.ModalDataView', {
        singleton: true,

        mixins: [
            'mh.mixin.Router'
        ],



        /**
         * shows modal view with a content view worked out based on the passed hash
         * @param url
         */
        show: function(hash){

            //<debug>
            console.log(logHdr, 'hash', hash);
            //</debug>

            //need to work out a view based on hash and init an appropriate modal view for it
            var route = hash.replace('#', ''),
                isDataRoute = this.routeIsDataRoute(route),
                routeParams = isDataRoute
                    ? this.getDataRouteParamsForRoute(route)
                    : this.getNavRouteParamsForRoute(route),
                xtype = isDataRoute
                    ? this.getDataViewXtypeFromRoute(route)
                    : this.getNavViewXTypeFromRoute(route);

            //<debug>
            console.warn(logHdr, 'xtype', xtype);
            console.warn(logHdr, 'routeParams', routeParams);
            //</debug>


            //TODO - need to make sure to monitor modal mode!!!
            //TODO - build it into the record/edit/create & dataviews
            //something like auto show/hide/close evt listeners that also check the isFloating property an if is floating, then a view
            //automatically starts tracking the modal mode but also automatically provides close / closeable tools


            if(isDataRoute){
                //data view

            }
            else {
                //this is not a data route, so need to init a view in a wrapper with a close btn, as otherwise there would be no chance to dismiss it

                //TODO
                console.error('modal data view routes not yet supported');
            }

        }
    });
}());
