//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.mixin.DirtyModeLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                dirtyModeTitle: {
                    en: 'Unsaved changes',
                    pl: 'Niezapisane zmiany'
                },
                dirtyModeMsg: {
                    en: 'There are unsaved changes in the current view. They will be lost if you proceed.<br/>Continue?',
                    pl: 'Bieżący widok ma niezapisane zmiany, które zostaną utracone.<br/>Kontynuować?'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());