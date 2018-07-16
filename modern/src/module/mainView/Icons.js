//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.mainView.Icons', {
        singleton: true,

        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function() {
            mh.FontIconsDictionary.addIcons({
                navMenuUser: 'x-li li-user',
                navMenuLogOff: 'x-li li-power-switch',
                navMenuExpand: 'x-i54c i54c-right-2',
                navMenuCollapse: 'x-i54c i54c-left-2',
                navMenuApps: 'x-i54 i54-multy-task-2'
            });
        }
    });
    
}());