//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.phone.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                mhEditViewWizardBtnPrev: 'x-li li-chevron-left-circle',
                mhEditViewWizardBtnNext: 'x-li li-chevron-right-circle',
                mhEditViewWizardBtnCancel: 'x-li li-cross-circle',
                mhEditViewWizardBtnSave: 'x-li li-checkmark-circle',
                mhListBtnDestroy: 'x-li li-cross-circle',
                mhListBtnEdit: 'x-li li-pencil5'
            });
        }
    });
    
}());