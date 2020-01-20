//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.orgUsers.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                mhOrgUsersAdd: 'x-li li-user-plus',
                mhOrgUsersAddOwnUser: 'x-i54 i54-home',
                mhOrgUsersAddExtUser: 'x-i54 i54-searching-group',
                mhOrgUsersOwnUser: 'x-i54 i54-home i54-lg',
                mhOrgUsersExtUser: 'x-i54 i54-global i54-lg',
                mhUserAccountVerified: 'x-i54 i54-user-security-male',
                mhUserAccountNotVerified: 'x-i54c i54c-anonymous-2',
                mhUserAccountActive: 'x-i54 i54-profile-voltage',
                mhUserAccountClosed: 'x-i54c i54c-lock-user1',
                mhUserPassForceSet: 'x-i54c i54c-key-22'
            });
        }
    });
    
}());