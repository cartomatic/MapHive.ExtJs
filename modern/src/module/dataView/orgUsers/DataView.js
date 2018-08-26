//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';



    Ext.define('mh.module.dataView.orgUsers.DataView', {
        extend: 'mh.module.dataView.users.DataView',
        xtype: 'mh-org-users-data-view',

        requires: [
            'mh.module.dataView.orgUsers.DataViewController',
            'mh.module.dataView.orgUsers.DataViewModel',
            //'mh.module.dataView.orgUsers.EditView',
            //'mh.module.dataView.orgUsers.RecordView',
            'mh.FontIconsDictionary'
        ],

        statics: {
            //so can manage routes in a limited number of places!
            navigationRoute: 'org-users'
        },

        controller: 'mh-org-users-data-view',

        viewModel: {
            type: 'mh-org-users-data-view'
        }
    });

}());