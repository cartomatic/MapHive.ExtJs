(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 16.02.2017.
     */
    Ext.define('mh.controller.Organization', {
        extend: 'Ext.app.Controller',

    requires: [
        'mh.data.model.Organization'
    ],

    mixins: [
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.ApiMap',
            'mh.data.model.Organization',
            'mh.mixin.UrlUtils'
        ],

        /**
         * @event org::context
         * fires with user's orgs context
         * @param eData
         * @param eData.currentOrg
         * @param eData.orgs
         */

        /**
         * @event org::getcontext
         * an observed event. initiates the user's org ctx retrieval
         */

        /**
         * @event org::change
         * an observed event
         */

        /**
         * @event org::changed
         * fires whenever and org changes
         * @param org
         */

        /**
         * Called when the view is created
         */
        init: function() {
            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
            this.watchGlobal('auth::userloggedoff', this.onUserLoggedOff, this);

            this.watchGlobal('org::change', this.changeOrg, this);
            this.watchGlobal('org::changeslug', this.changeOrgBySlug, this);
            this.watchGlobal('org::getcontext', this.getOrgContext, this);


            this.watchGlobal('org::xwindowgetcontext', this.onXWindowGetOrgCtx, this);

            this.watchGlobal('org::xwindowchanged', this.onXWindowOrgChanged, this);
        },

        /**
         * @private {bool} [userAuthenticated=false]
         * whether or not a user is currently authenticated
         */
        userAuthenticated: false,

        /**
         * user's organizations
         */
        userOrgs: null,

        /**
         * current organization
         */
        currentOrg: null,

        /**
         * @private
         * user authenticated callback - just keeps the internal track of user being authenticated
         * @param at
         */
        onUserAuthenticated: function(at){
            this.userAuthenticated = at.accessToken !== null;
            this.userOrgs = null;

            if(this.userAuthenticated){
                this.getOrgContext();
            }
        },

        /**
         * @private
         * user loggod off callback- just keeps the internal track of user being authenticated
         */
        onUserLoggedOff: function(){
            this.userAuthenticated = false;
            this.userOrgs = null;

            //also, since logged off, remove the org token from url, as it does not make sense anymore.
            //Note: not so sure about it though...
            var updatedUrl = this.removeUrlOrgToken(window.location.href);
            history.pushState(null, window.name, updatedUrl);
        },


        /**
         * child asked to get org ctx
         */
        onXWindowGetOrgCtx: function(){
            //just set up a local listener - so can perform the org ctx retrieval locally
            //and subscribe to own evt
            var tunnel = this.getTunnelId();
            this.watchGlobal(
                'org::context',
                function(orgCtx){

                    //Note: data is recs and this is instance based and will not make it through the xwindow. need to pass data only!
                    var userOrgs = [],
                        currentOrg = this.currentOrg.getData();

                    Ext.Array.each(this.userOrgs, function(org){
                        userOrgs.push(org.getData());
                    });

                    //pass down to children
                    this.fireGlobal('org::xwindowcontext', {userOrgs: userOrgs, currentOrg: currentOrg}, {suppressLocal: true, hosted: true}); //passing back to a child, so hosted direction only!
                },
                this,
                {single: true, tunnel: tunnel}
            );
            this.fireGlobal('org::getcontext', null, {tunnel: tunnel});
        },

        /**
         * gets the current org context
         */
        getOrgContext: function(e, eOpts){

            //now, this is a bit tricky, because the auth could have been done locally and also xwindow.
            //since auth usually triggers obtaining user orgs, need to do it the very same way - either locally or xwindow, so can both spare multiple backend calls
            //but also, and that is more important, work out the org scope only once - user could have provided and address with an org he has no access to, so if a host
            //decides to reset the org to the user's org, so should the child app.

            var tunnel = (eOpts || {}).tunnel;

            //if ctx is known OR user is anonymous, return straight away
            if(this.userOrgs || !this.userAuthenticated){
                this.fireGlobal(this.getTunneledEvtName('org::context', tunnel), {
                    userOrgs: this.userOrgs,
                    currentOrg: this.currentOrg
                });
                return;
            }

            //expect many potential subsequent requests
            //IMPORTANT - cache the event by the output event name!!!!
            this.bufferCurrentTunnel('org::context', tunnel);

            if(this.duringOrgsCtxRetrieval){
                return;
            }

            this.duringOrgsCtxRetrieval = true;

            //got here, so reset the ctx data!
            this.userOrgs = null;
            this.currentOrg = null;

            //get the hosted info and trigger the appropriate action
            this.watchGlobal(
                'root::customhashparam',
                function(hosted){
                    if(hosted === 'true'){
                        //this means need delegate the authentication to the parent
                        this.handleGetOrgCtxXWindow();
                    }
                    else {
                        //can authenticate locally
                        this.handleGetOrgCtxLocally();
                    }
                },
                this,
                {single: true, tunnel: tunnel}
            );

            //custom param receive callback properly set up so just fire evt to get the data back
            this.fireGlobal('root::getcustomhashparam', 'hosted', {tunnel: tunnel});
        },

        /**
         * pokes host app for org ctx change
         */
        handleGetOrgCtxXWindow: function(){
            this.watchGlobal('org::xwindowcontext', this.onXWindowOrgCtxRetrieved, this);
            this.fireGlobal('org::xwindowgetcontext', null, {suppressLocal: true, host: true});
        },

        /**
         * xwindow org ctx retrieved
         * @param orgCtx
         */
        onXWindowOrgCtxRetrieved: function(orgCtx){

            //since this is coming xwindow, it's not model instances, but raw data. need to create models
            this.currentOrg = Ext.create('mh.data.model.Organization', orgCtx.currentOrg);

            this.userOrgs = [];
            Ext.Array.each(orgCtx.userOrgs, function(org){
                this.userOrgs.push(Ext.create('mh.data.model.Organization', org));
            }, this);

            //and when all is ready broadcast the data locally!
            this.fireForBufferedTunnels('org::context', {
                userOrgs: this.userOrgs,
                currentOrg: this.currentOrg
            });
        },

        /**
         * retrieves user org context information locally
         */
        handleGetOrgCtxLocally: function(){
            this.doGet({
                url: this.getApiEndPointUrl('userOrgs'),
                scope: this,
                success: this.onGetOrgsContextSuccess,
                failure: this.onGetOrgsContextFailure
            });
        },

        /**
         * whether or not the orgs ctx is being currently retrieved
         */
        duringOrgsCtxRetrieval: false,

        /**
         * org context success
         * @param response
         */
        onGetOrgsContextSuccess: function(response){

            //waive off app retrieval in progress flag
            this.duringOrgsCtxRetrieval = false;

            //get the org slug off the url!
            var urlOrgSlug = this.getUrlOrgIdentifier(),
                currentOrg;

            //response should be an arr of organizations
            //so make the instances off the incoming data
            this.userOrgs = [];
            this.currentOrg = null;
            Ext.Array.each(response, function(org){
                var o = Ext.create('mh.data.model.Organization', org);
                this.userOrgs.push(o);
                if(urlOrgSlug === o.get('slug')){
                    currentOrg = o;
                }
            }, this);

            if(!currentOrg){
                currentOrg = this.userOrgs[0];
            }

            //set the current org!
            this.changeOrg({
                org: currentOrg
            });

            this.fireForBufferedTunnels('org::context', {
                userOrgs: this.userOrgs,
                currentOrg: currentOrg
            });
        },

        /**
         * get org ctx failure...
         */
        onGetOrgsContextFailure: function(){
            //since failed to get org ctx there must be some problems with that...
            //just return empty ctx and let the app handle it locally. they may decide to poke the ctrl again, work without org ctx
            //or make some noise
            this.fireForBufferedTunnels('org::context', {
                userOrgs: this.userOrgs,
                currentOrg: this.currentOrg
            });
        },

        /**
         * gets an org by slug
         * @param slug
         */
        getOrgBySlug: function(slug){
            var org;
            Ext.Array.each(this.userOrgs, function(o){
                if(o.get('slug') === slug){
                    org = o;
                    return false;
                }
            });
            return org;
        },

        /**
         * changes or by slug;
         * @param slug
         */
        changeOrgBySlug: function(eData){
            this.changeOrg({
                org: this.getOrgBySlug(eData.slug),
                replaceState: eData.replaceState
            });
        },

        /**
         * changes organization
         * @param eData
         * @param eData.org
         * @param eData.skipXWindowReBroadcast - when receiving org change request xwindow, there is no point in rebroadcasting it back really; this skips the xwindow evt 'back propagation'
         * @param eData.replaceState - whether or not to prefer history replaceState instead of pushing
         */
        changeOrg: function(eData){
            var org = eData.org,
                updatedUrl;

            if(!org || this.currentOrg === org){
                return;
            }
            this.currentOrg = org;

            //note - org ALWAYS has a unique slug
            updatedUrl = this.updateUrlOrgToken(window.location.href, org.get('slug'));
            if(eData.replaceState === true){
                history.replaceState(null, window.name, updatedUrl);
            }
            else {
                history.pushState(null, window.name, updatedUrl);
            }

            this.fireGlobal('org::changed', org);

            //also pass down to children
            if(eData.skipXWindowReBroadcast !== true){
                this.fireGlobal('org::xwindowchanged',
                    {
                        slug: org.get('slug'),
                        replaceState: eData.replaceState
                    },
                    {
                        suppressLocal: true,
                        //evt is passed in both directions (host / hosted) as do not know really where nor by whom it has been initiated.
                        //xwindow org changed evts will not bounce back anyway, this will not cause an evt pingbacks flood
                        hosted: true, host: true
                    }
                );
            }
        },

        /**
         * got org changed evt from parent. need to adjust self
         * @param eData
         * @param eData.slug
         */
        onXWindowOrgChanged: function(eData){
            this.changeOrg({
                org: this.getOrgBySlug(eData.slug),
                replaceState: eData.eData,
                skipXWindowReBroadcast: true
            });
        }
    });
    
}());

