//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on

    'use strict';
    Ext.define('mh.module.dataView.EditViewModel', {
        extend: 'Ext.app.ViewModel',

        alias: 'viewmodel.mh-edit-view',

        mixins: [
        ],

        requires: [
            'mh.FontIconsDictionary'
        ],

        data: {
            record: null,
            localization: null
        },

        formulas: {
            viewIcon: {
                bind: {
                    bindTo: '{record.phantom}',
                    deep: true
                },
                get: function (phantom) {
                    return mh.FontIconsDictionary.getIcon(phantom ? 'mhDataViewNew' : 'mhDataViewEdit');
                }
            }
        }
    });

}());