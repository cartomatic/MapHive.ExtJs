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
                mhDataViewPrevious: 'x-i54c i54c-left-13',
                mhDataViewNext: 'x-i54c i54c-right-13',
                mhDataViewNew: 'x-i54 i54-add-note',
                mhDataViewEdit: 'x-i54 i54-edit-note',
                mhDataViewFilter: 'x-i54c i54c-filter',
                mhDataViewBtnEdit: 'x-li li-pencil5',
                mhDataViewBtnCreate: 'x-li li-plus-circle',
                mhDataViewBtnDestroy: 'x-li li-cross-circle',
                mhDataViewBtnRefresh: 'x-li li-sync2'
            });
        }
    });
    
}());