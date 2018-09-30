//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                mhOrgUsersAddFromCatalogue: 'x-i54 i54-searching-group',
                mhOrgUsersOwnUser: 'x-i54 i54-home i54-lg',
                mhOrgUsersExternalUser: 'x-i54 i54-global i54-lg'
            });
        }
    });
    
}());