//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.ModalRecordViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-phone-modal-record-view',
    
        stores: {
        },
    
        data: {
            record: null
        },

        formulas: {
            viewTitle: {
                bind: {
                    bindTo: '{record}',
                    deep: true
                },
                get: function (rec) {
                    return this.get('localization.recordViewTitle');
                }
            }
        }
    });
}());
