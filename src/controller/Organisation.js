(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 16.02.2017.
     */
    Ext.define('mh.controller.Organisation', {
        extend: 'Ext.app.Controller',
    
        requires: [

        ],

        mixins: [
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.ApiMap',
            'mh.data.model.Organisation'
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


            //????
            //this.fireGlobal('root::getorgcontext');
        },

        /**
         * whether or not the orgs ctx is being currently retrieved
         */
        duringOrgsCtxRetrieval: false,

        //on org context

        onGetOrgsContextSuccess: function(response){




            //waive off app retrieval in progress flag
            this.duringAppsRetrieval = false;

            this.fireForBufferedTunnels('org::context', this.apps);
        },

        /**
         * changes organisation
         * @param org
         */
        changeOrg: function(org){

        }
    });
    
}());

