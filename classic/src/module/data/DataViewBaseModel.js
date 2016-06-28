//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Base dataview view model
     */
    Ext.define('mh.module.data.DataViewBaseModel', {
        extend: 'Ext.app.ViewModel',

        alias: 'viewmodel.mh-dataview-base',

        requires: [
        ],

        mixins: [
            'mh.mixin.Localisation'
        ],

        data: {
            //need an empty placeholder, so when property is applied by a child, it does not end up in the root view model
            //https://www.sencha.com/forum/showthread.php?305387
            localisation: null
        },

        stores: {
            //need an empty store here, so it will not get published up the view model stack! also this cannot be null as store would fail to init
            //https://www.sencha.com/forum/showthread.php?305387
            gridstore: {}
        },

        formulas: {
            rec: {
                bind: {
                    bindTo: '{grid.selection}',
                    deep: true
                },
                get: function(rec){
                    return rec;
                }
            },
            editable: {
                bind: {
                    bindTo: '{rec}',
                    deep: true
                },
                get: function(selection){
                    return selection !== null;
                }
            },
            deletable: {
                bind: {
                    bindTo: '{rec}',
                    deep: true
                },
                get: function(selection){
                    return selection !== null;
                }
            }
        }
    });

}());