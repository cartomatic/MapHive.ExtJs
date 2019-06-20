//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.module.langSwitcher.LangSwitcherMiniModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-lang-switcher-mini',

        data: {
            //need an empty placeholder, so when property is applied by a child, it does not end up in the root view model
            //https://www.sencha.com/forum/showthread.php?305387
            localization: null
        }

    });
}());
