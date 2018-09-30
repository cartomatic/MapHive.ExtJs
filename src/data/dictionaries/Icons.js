//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.data.dictionaries.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                dictOrgRoleOwner: 'x-i54c i54c-master-yoda i54c-lg',
                dictOrgRoleAdmin: 'x-i54c i54c-geek-1 i54c-lg',
                dictOrgRoleMember: 'x-i54c i54c-male-2 i54c-lg'
            });
        }
    });
}());
