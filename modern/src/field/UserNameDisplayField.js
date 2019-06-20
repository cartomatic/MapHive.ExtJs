//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.field.UserNameDisplayField', {
        extend: 'Ext.field.Display',
        xtype: 'mh-username-displayfield',

        mixins: [
            'mh.data.Ajax',
            'mh.mixin.ApiMap'
        ],

        config:{
            emptyValue: '--',
            loadingMsg: 'Loading...'
        },

        setUserId: function(userId){
            //<debug>
            console.log('UserNameDisplayField - loading user: ', userId);
            //</debug>

            if(!userId) {
                this.setHtml(this.getEmptyValue());
                return;
            }

            this.setHtml(this.getLoadingMsg());

            this.doGet({
                url: this.getApiEndPointUrl('userName') + '/' + userId,
                scope: this,
                success: this.onUserNameLoadSuccess,
                failure: this.onUserNameLoadFailure
            });

        },

        onUserNameLoadFailure: function(){
            this.setHtml(this.getEmptyValue())
        },
        onUserNameLoadSuccess: function(userName){
            this.setHtml(userName);
        }
    });
}());
