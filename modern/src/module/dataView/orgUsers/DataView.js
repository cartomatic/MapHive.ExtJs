//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';



    Ext.define('mh.module.dataView.orgUsers.DataView', {
        extend: 'mh.module.dataView.users.DataView',
        xtype: 'org-users-dataview',

        requires: [
            'mh.module.dataView.orgUsers.DataViewController',
            'mh.module.dataView.orgUsers.DataViewModel',
            //'mh.module.dataView.orgUsers.Editor',
            //'mh.module.dataView.orgUsers.RecordViewer',
            'mh.FontIconsDictionary'
        ],

        controller: 'mh-org-users-dataview',

        viewModel: {
            type: 'mh-org-users-dataview'
        }
    });

}());