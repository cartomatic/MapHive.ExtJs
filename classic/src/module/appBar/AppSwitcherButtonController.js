//Disable some of the JSLint warnings
/*global window,document,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * App switcher btn controller - responsible for providing the functionality to switch between the applications.
     * its controller pulls the required settings automatically by contacting the configure endpoint
     */
    Ext.define('mh.module.appBar.AppSwitcherButtonController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-app-switcher-button',

        mixins: [
            'mh.util.console.Formatters',
            'mh.data.Ajax'
        ],

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Column',
        'Ext.panel.Panel'
    ],

        /**
         * @property {Array}
         * Configured applications
         * @private
         */
        apps: null,

        /**
         * @property {Ext.panel.Panel}
         * Panel used to display the configured apps
         * @private
         */
        appSwitcherPanel: null,

        /**
         * Called when the view is created
         */
        init: function() {

            //check if the tbar is visible, or it should be suppressed
            //if toolbar should be hidden, there is no point in triggering the full setup here, as the toolbar is not there anyway!
            var tunnel = (new Date()).getTime();

            this.watchGlobal(
                'root::customhashparam',
                function(value){
                    if(value !== 'true'){
                        this.fireGlobal('root::getcustomhashparam', 'suppress-app-toolbar', {tunnel: tunnel});

                        //wire up some evt listeners
                        this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);

                        //TODO - some kind of app loaded or something. also when there is only one app or running in a standalone mode! Potential problem is - the apps may have same urls and only start from subfolders, or the url may have different hashes than the app. perhaps just comparing the part to # is a good idea. Actually whenever setting up the apps picker some check like this could be made...

                        //need to poke the root to get some apps
                        this.getApps();
                    }
                },
                this,
                {
                    single: true,
                    tunnel: tunnel
                }
            );
            this.fireGlobal('root::getcustomhashparam', 'suppress-app-toolbar', {tunnel: tunnel})
        },

        /**
         * user authenticated - refresh the apps
         */
        onUserAuthenticated: function(){
            this.apps = null;
            this.getApps();
        },

        /**
         * whether or not the get Apps is currently in progress
         */
        getAppsInProgress: false,

        /**
         * Pokes Root Controller to get the apps data!
         */
        getApps: function(){

            if(this.getAppsInProgress){
                return;
            }

            this.getAppsInProgress = true;

            //wire up the root::appsretrieved listener - whenever new apps become available it will be necessary to update the app picker!
            var tunnel = (new Date()).getTime();
            this.watchGlobal('root::appsretrieved', this.onAppsRetrieved, this, {single: true, tunnel: tunnel});
            this.fireGlobal('root::getapps', null, {tunnel: tunnel});
        },


        /**
         *
         * @param {mh.data.model.Application[]} apps
         */
        onAppsRetrieved: function(apps){

            //success, so this should be an array of appDTO objects
            this.apps = apps;
            this.getView().setVisible((this.apps && this.apps.length > 0));

            //also re-create the app switcher panel - this is because after auth -> getapps, its content, order, etc. may have changed
            this.createAppSwitcherPanel();

            this.getAppsInProgress = false;

            //apps made here. make sure though to show the apps switcher only if the get apps was triggerred through a btn click!
            if(this.showAppsPanelRequested){
                this.showAppsPanel();
                this.showAppsPanelRequested = false
            }
        },

        /**
         * (re)creates the app switcher panel
         */
        createAppSwitcherPanel: function(){
            if(this.appSwitcherPanel){
                this.appSwitcherPanel.destroy();
            }

            var btns = [],
                a = 0, alen = this.apps.length;

            //prepare the app switching btns
            for(a; a < alen; a++){
                btns.push({
                    xtype: 'button',
                    text: this.apps[a].get('name'),
                    height: 64,
                    width: 64,
                    columnWidth: 0.33,
                    margin: '0 5 5 0', //trbl
                    listeners: {
                        click: Ext.bind(this.onAppBtnClick, this)
                    },
                    ui: 'green-button',
                    app: this.apps[a]
                });
            }

            //create the app switcher panel
            this.appSwitcherPanel = Ext.create('Ext.panel.Panel', {
                floating: true,
                modal: true,
                layout: {
                    type: 'column'
                },
                bodyPadding: '5 0 0 5', //trbl,
                maxWidth: 225,

                items: btns,

                //need to wire up click evt listeners, so the panel stays on, when clicked; on panel show there is a document evt click wired up
                //that needs to be swallowed;
                listeners: {
                    render: function(panel){
                        panel.getEl().on(
                            'click',
                            function(evt){
                                evt.stopPropagation();
                            }
                        );
                    }
                }
            });
            this.initialiseAppsPanel();
        },

        /**
         * Prepares the apps panel for the first use
         */
        initialiseAppsPanel: function(){
            var p = this.appSwitcherPanel;
            if(p){
                //mke sure the panel is properly initialised, so can grab its element later on (see onAppSwitcherBtnClick);
                p.show();
                p.hide();
                //also make sure to make the panel transparent on init! this way show / hide panel will work seamlesly
                p.getEl().setOpacity(0);
            }
        },

        /**
         * Takes care of showing the apps panel
         */
        showAppsPanel: function(){

            //need the apps to work with!
            if(!this.apps){
                this.getApps();
                return;
            }

            var p = this.appSwitcherPanel,

            //Note: panel's element should be already available, as the panel gets shown/hidden upon instantiation to ensure that
                pel = p.getEl(),

                btn = this.getView();

            //Note:
            //because the apps panel is a modal floating panel, its floatability is managed by the by the global instance of ZIndexManager - Ext.WindowManager
            //Since this object manages other modals too it is important to restore any changes made to the mask on panel hide!
            //get the mask and set its opacity to 0.
            Ext.WindowManager.mask.setOpacity(0);


            p.showBy(btn, 'bl', [0, 5]);
            //Note: panel's opacity should be 0 at this stage, so can nicely fade it in

            //hocus pocus is to fade the panel in...
            pel.animate({
                duration: 500,
                to:{
                    opacity: 1
                },
                listeners: {
                    afteranimate: function(){
                        //wire up a click evt on document. this is so it is possible to hide the app switcher menu whenever a user clicks outside
                        Ext.get(document).on('click', this.docClickWatchCallback, this, {single: true});
                        //just a single evt listener; need to waive it off after the apps panel is closed
                        //Note: since app btns also close the app switcher panel, this evt is always waived off on panel hide
                    },
                    scope: this
                }
            });
        },

        /**
         * Doc click evtg callback - used to hide the app switcher panel if clicked outside it
         */
        docClickWatchCallback: function(){
            this.hideAppsPanel();
        },

        /**
         * Takes care of hiding the apps panel
         */
        hideAppsPanel: function(){
            var p = this.appSwitcherPanel,
                //Note: panel's element should be already available, as the panel gets shown/hidden upon instantiation to ensure that
                pel = p.getEl();

            //Waive off the doc click watch!
            Ext.get(document).un('click', this.docClickWatchCallback, this);

            //hocus pocus is to fade the panel out...
            pel.animate({
                duration: 500,
                to:{
                    opacity: 0
                },
                listeners: {
                    afteranimate: function(){
                        p.hide();

                        //mask's opacity too, so other modal comps are properly masked!
                        //Note: this is important, as the panel's flotability is managed by the global instance of ZIndexManager - Ext.WindowManager
                        Ext.WindowManager.mask.setOpacity(1);
                    },
                    scope: this
                }
            });
        },

        /**
         * Whether or not the show apps panel (and potnetially also pull apps) was requested via btn
         * if so, the apps switcher will be shown whenever the apps become available. Otherwise the apps switcher menu will not appear.
         */
        showAppsPanelRequested: false,

        /**
         * App switcher btn click callback; shows the app switcher panel
         * @param btn
         * @param e
         * @param eOpts
         */
        onAppSwitcherBtnClick: function(btn, e, eOpts){
            this.showAppsPanelRequested = true;
            this.showAppsPanel();
        },

        /**
         * @event root::reloadapp
         * fired whenever user requested app reload
         */

        /**
         * App btn click callback - initiates app change procedure by firing the root::reloadapp that should be handled by mh.controller.AppLoader
         * @param btn
         * @param e
         * @param eOpts
         */
        onAppBtnClick: function(btn, e, eOpts){
            this.hideAppsPanel();

            //load the new url
            this.fireGlobal('root::reloadapp', btn.app);
        }

    });

}());