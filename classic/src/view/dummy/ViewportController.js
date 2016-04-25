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

        mixins: [
            'mh.communication.MsgBus'
        ],

        /**
         * Called when the view is created
         */
        init: function() {

            var me = this;

            this.watchGlobal('msgbus::xwindowtest', function(eData){

                var el = Ext.get('msgbus_xwindowtest_feedback');
                el.setHtml('[msgbus::xwindowtest] evt received from: ' + eData.origin);
                el.animate({
                    to: {
                        duration: 250,
                        backgroundColor: '#FECC00'
                    },
                    listeners: {
                        afteranimate: function(){
                            setTimeout(
                                function(){
                                    el.animate({
                                        duration: 250,
                                        backgroundColor: '#FFFFFF'
                                    });
                                },
                                1500
                            );
                        }
                    }
                });
            });

            var runningSideBySide = window.location.href.indexOf('sidebyside=true') > -1,
                suppressNestedApps = window.location.href.indexOf('suppressnested=true') > -1,
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

                if(suppressNestedApps){
                    umbrellaApps.hide();
                    btnPostParent.show();
                }
                else {
                    if(parent !== window){
                        btnPostParent.show();
                    }

                    btnPostChild.show();

                    umbrellaApps.on(
                        'render',
                        function(){
                            var tunnel = (new Date()).getTime();
                            me.watchGlobal('root::appsretrieved', function(apps){

                                var modifyUrl = function(url){
                                    var urlBase, urlParams = [], urlHash, urlParts;

                                    if(url.indexOf('?') > -1){
                                        urlParts = url.split('?');
                                        urlBase = urlParts[0];

                                        if(urlParts[1].indexOf('#') > -1){
                                            urlParts = urlParts[1].split('#');
                                            urlParams = urlParts[0].split('&');
                                            urlHash = urlParts[1];
                                        }
                                        else {
                                            urlParams = urlParts[1].split('&');
                                        }
                                    }
                                    else {
                                        //no params, maybe hash
                                        urlParts = url.split('#');
                                        urlBase = urlParts[0];
                                        urlHash = urlParts[1];
                                    }

                                    urlParams.push('sidebyside=true');

                                    urlHash = urlHash || '';
                                    urlHash += ';suppress-app-toolbar:true';

                                    return urlBase + (urlParams.length > 0? '?' + urlParams.join('&') : '') + (urlHash ? '#' + urlHash : '');
                                }

                                //since this is a demo, there should be 3 rec...

                                document.getElementById('umbrella-iframe-1').src = modifyUrl(apps[1].get('url').split('#')[0] + '#some/hash/123/456') ;
                                document.getElementById('umbrella-iframe-2').src = modifyUrl(apps[2].get('url'));

                            }, me, {single: true, tunnel: tunnel})
                            me.fireGlobal('root::getapps', null, {tunnel: tunnel});
                        }
                    );
                }
            }
        }
    });

}());