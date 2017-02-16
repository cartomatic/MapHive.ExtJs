(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 16.02.2017.
     */
    Ext.define('mh.controller.Organisation', {
        extend: 'Ext.app.Controller',

    requires: [
        'mh.data.model.Organisation'
    ],

    mixins: [
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.ApiMap',
            'mh.data.model.Organisation',
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
         * Called when the view is created
         */
        init: function() {
            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this);
            this.watchGlobal('auth::userloggedoff', this.onUserLoggedOff, this);

            this.watchGlobal('org::change', this.changeOrg, this);
            this.watchGlobal('org::getcontext', this.getOrgContext, this);


            this.watchGlobal('org::xwindowgetcontext', this.onXWindowGetOrgCtx, this);

            this.watchGlobal('org::xwindowchange', this.onXWindowOrgChange, this);
        },

        /**
         * @private {bool} [userAuthenticated=false]
         * whether or not a user is currently authenticated
         */
        userAuthenticated: false,

        /**
         * user's organisations
         */
        userOrgs: null,

        /**
         * current organisation
         */
        currentOrg: null,

        /**
         * @private
         * user authenticated callback - just keeps the internal track of user being authenticated
         * @param at
         */
        onUserAuthenticated: function(at){
            this.userAuthenticated = at !== null;
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
        getOrgContext: function(e, tunnel){

            //now, this is a bit tricky, because the auth could have been done locally and also xwindow.
            //since auth usually triggers obtaining user orgs, need to do it the very same way - either locally or xwindow, so can both spare multiple backend calls
            //but also, and that is more important, work out the org scope only once - user could have provided and address with an org he has no access to, so if a host
            //decides to reset the org to the user's org, so should the child app.

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
            this.currentOrg = Ext.create('mh.data.model.Organisation', orgCtx.currentOrg);

            this.userOrgs = [];
            Ext.Array.each(orgCtx, function(org){
                this.userOrgs.push(Ext.create('mh.data.model.Organisation', org));
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
                url: this.getApiEndPoint('userOrgs'),
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

            //response should be an arr of organisations
            //so make the instances off the incoming data
            this.userOrgs = [];
            this.currentOrg = null;
            Ext.Array.each(response, function(org){
                var o = Ext.create('mh.data.model.Organisation', org);
                this.userOrgs.push(o);
                if(urlOrgSlug === o.get('slug')){
                    currentOrg = o;
                }
            }, this);

            if(!currentOrg){
                currentOrg = this.userOrgs[0];
            }

            //set the current org!
            this.changeOrg(currentOrg);

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
         * changes organisation
         * @param org
         */
        changeOrg: function(org){
            if(!org || this.currentOrg === org){
                return;
            }
            this.currentOrg = org;

            //note - org ALWAYS has a unique slug
            var updatedUrl = this.updateUrlOrgToken(window.location.href, org.get('slug'));
            history.pushState(null, window.name, updatedUrl);

            //pass down to children
            this.fireGlobal('org::xwindowchange', org.get('slug'), {suppressLocal: true, hosted: true}); //passing back to a child, so hosted direction only!
        },

        /**
         * got org change evt from parent. need to adjust self
         * @param slug
         */
        onXWindowOrgChange: function(slug){
            //basically parent and child orgs should be intact at all times. because of that simply find the org in userOrgs by slug
            var newOrg;
            Ext.Array.each(this.userOrgs, function(o){
                if(o.get('slug') === slug){
                    newOrg = o;
                    return false;
                }
            });
            this.changeOrg(newOrg);
        }
    });
    
}());

