//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.desktop.translations.EditViewModel', {
        extend: 'mh.module.dataView.EditViewModel',
        alias: 'viewmodel.mh-desktop-translations-edit-view',

        formulas: {
            translationsEditable:{
                bind: {
                    bindTo: '{record}',
                    deep: true
                },
                get: function(rec){
                    if(!rec){
                        return false;
                    }

                    return !rec.get('inherited') || !!rec.get('inherited') && !!rec.get('overwrites');
                }
            }
        }
    });
}());
