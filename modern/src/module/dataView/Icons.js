//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                mhDataViewBasicInfo: 'x-i54 i54-information',
                mhDataViewFilter: 'x-i54c i54c-filter',
                mhDataViewNew: 'x-li li-plus-circle',
                mhDataViewEdit: 'x-li li-pencil5',
                mhDataViewBtnDismiss: 'x-li li-chevron-left-circle',
                mhDataViewBtnPrev: 'x-li li-chevron-left-circle',
                mhDataViewBtnNext: 'x-li li-chevron-right-circle',
                mhDataViewBtnEdit: 'x-li li-pencil5',
                mhDataViewBtnCreate: 'x-li li-plus-circle',
                mhDataViewBtnDestroy: 'x-li li-cross-circle',
                mhDataViewBtnRefresh: 'x-li li-sync2',
                mhDataViewBtnBack: 'x-li li-cross-circle',
                mhDataViewBtnSave: 'x-li li-checkmark-circle'
            });
        }
    });
    
}());