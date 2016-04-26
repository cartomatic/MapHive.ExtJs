//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * This is a simplistic example of a hosted app CLASSIC view. it simply sets up some
     */
    Ext.define('mh.dummy.view.ViewportController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.viewport',

        mixins: [
            'mh.communication.MsgBus',
            'mh.mixin.ModalMode'
        ],

        routes: {
            'test' : 'onTest'
        },

        onTest: function(){
            console.warn('TEST route detected');

            //Note:
            //This could really be a on before action handler...
            //Alternatively - in a case of using a card layout to handle the app views handling may be redirected to a common view switcher
            //that will take care of modal mode watching

            //properly handle EDIT MODE!
            if(this.getModalModeActive()){

                //<debug>
                console.warn('[ROUTER@Main]', 'prevented route adjustment - edit mode active!');
                //</debug>

                window.location.hash = this.getModalModeRouteSnapshot();
                return;
            }

            //handle whatever is to be handled by a view
        },


        onUnmatchedRoute: function(){
            console.warn('TEST unmatched route in the main controller!');

            //properly handle EDIT MODE!
            if(this.getModalModeActive()){

                //<debug>
                console.warn('[ROUTER@Main]', 'prevented route adjustment - edit mode active!');
                //</debug>

                window.location.hash = this.getModalModeRouteSnapshot();
                return;
            }

            //silently redirect to a default route
            Ext.defer(
                function(){
                    //this.redirectTo(Ext.app.Application.instance.getDefaultToken() || '');
                },
                1,
                this
            );
        },

        /**
         * Called when the view is created
         */
        init: function() {

            //it is required to init the History object prior to using it
            Ext.util.History.init();

            var me = this;

            this.listen({
                controller: {
                    '#': {
                        unmatchedroute: this.onUnmatchedRoute
                    }
                }
            });



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

            //this is the xWindow router messaging demo functionality
            this.watchGlobal('root::applyexternalroute', function(newRoute){

                //update a temp hash text box to
                this.lookup('hashTextBox').setValue(newRoute);

                var el = Ext.get('msgbus_xwindowroutertest_feedback');
                el.setHtml('[root::applyexternalroute] ' + newRoute);
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
                                1000
                            );
                        }
                    }
                });
            }, this);

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
        },

        onSendHashToHost: function(){
            //this will trigger the standard hash handling!
            window.location.hash = this.lookup('hashTextBox').getValue();
        }
    });

}());