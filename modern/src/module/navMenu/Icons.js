//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.navMenu.Icons', {
        singleton: true,

        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function() {
            mh.FontIconsDictionary.addIcons({
                mhNavMenuUserAnonymous: 'x-i54c i54c-anonymous-2',
                mhNavMenuUser: 'x-i54c i54c-bald-male',
                mhNavMenuLogOff: 'x-li li-power-switch',
                mhNavMenuExpand: 'x-i54c i54c-right-2',
                mhNavMenuCollapse: 'x-i54c i54c-left-2',

                mhNavMenuSandwich: 'x-li li-menu-circle',
                mhNavMenuBack: 'x-li li-chevron-left-circle',

                mhNavMenuUserLarge2x: 'x-i54c i54c-bald-male i54c-2x',
                mhNavMenuUserLarge3x: 'x-i54c i54c-bald-male i54c-3x'
            });
        }
    });
    
}());