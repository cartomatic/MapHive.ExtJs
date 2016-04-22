//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by domin on 4/22/2016.
     */
    Ext.define('mh.view.dummy.ViewportController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.viewport',
    
        /**
         * Called when the view is created
         */
        init: function() {

            var runningSideBySide = window.location.hash.indexOf('sidebyside:true') > -1,
                umbrellaApps = this.lookupReference('umbrellaApps'),
                btnPostParent = this.lookupReference('btnPostParent'),
                btnPostParentBubble = this.lookupReference('btnPostParentBubble'),
                btnPostChild = this.lookupReference('btnPostChild'),
                btnPostChildDrillDown = this.lookupReference('btnPostChildDrillDown'),
                btnPostUmbrella = this.lookupReference('btnPostUmbrella');

            if(runningSideBySide){
                //no need to nesting deeper - would kill the browser obviously ;)
                umbrellaApps.hide();

                //since running side by side, can only post up
                btnPostParent.show();
                btnPostParentBubble.show();
                btnPostUmbrella.show();
            }
            else {
                //running as standalone, or nested, so need to wire up 2 nested umbrella com apps
                //and show some btns

                if(parent !== window){
                    btnPostParent.show();
                }

                btnPostChild.show();

                umbrellaApps.on(
                    'render',
                    function(){

                        document.getElementById('umbrella-iframe-1').src = 'https://app2.maphive.local/#some/hash/123/456|sidebyside:true|suppress-app-toolbar:true';
                        document.getElementById('umbrella-iframe-2').src = 'https://app3.maphive.local/#sidebyside:true|suppress-app-toolbar:true';
                    }
                );
            }
        }
    });

}());