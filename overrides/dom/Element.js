(function(){
    //Make sure strict mode is on
    'use strict';

    var TOP = window.top;
    //try to access a potentially protected property
    //on failure use own window for accessing whatever is needed
    try {
        top.devicePixelRatio;
    }
    catch(e) {
        TOP = window;
    }

    /**
     * Created by domin on 31.01.2017.
     *
     * There are some problems when an ext app is working in an iframe that violates cross origin.
     * Ext is trying to obtain some info off window.top and accessing cross origin iframes is not allowed
     *
     * note: the src file is located in ext/packages/core/src/dom
     */
    Ext.define('mh.overrides.dom.Element', {

        override: 'Ext.dom.Element'

    }, function(){

        //Note: Element is in closure, so unfortunately there is no easy way to override it.
        //let the brut force be with us...

        // /**
        //  * Returns the current zoom level of the viewport as a ratio of page pixels to
        //  * screen pixels.
        //  * @private
        //  * @static
        //  * @return {Number}
        //  */
        Ext.dom.Element.getViewportScale = function() {
            // on deskop devices, the devicePixel ratio gives us the level of zoom that
            // the user specified using ctrl +/- and or by selecting a zoom level from
            // the menu.
            // On android/iOS devicePixel ratio is a fixed number that represents the
            // screen pixel density (e.g. always "2" on apple retina devices)

            //var top = WIN.top; //<- no acces to a variable. defined in closure
            var top = TOP;

            return ((Ext.isiOS || Ext.isAndroid) ? 1 :
                    (top.devicePixelRatio || // modern browsers
                    top.screen.deviceXDPI / top.screen.logicalXDPI)) // IE10m
                * this.getViewportTouchScale();
        }
    });
    
}());