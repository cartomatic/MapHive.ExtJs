//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.module.langSwitcher.LangSwitcherMini', {
        extend: 'Ext.Button',

        requires: [
            'mh.module.langSwitcher.LangSwitcherMiniController',
            'mh.module.langSwitcher.LangSwitcherMiniModel'
        ],

        xtype: 'mh-lang-switcher-mini',

        controller: 'mh-lang-switcher-mini',
        viewModel: {
            type: 'mh-lang-switcher-mini'
        },

        arrow: false

    });
}());
