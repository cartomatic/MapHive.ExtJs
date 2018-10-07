//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.simpleDictionary.DataView', {
        extend: 'mh.module.dataView.desktop.DataView',

        requires: [
            'mh.module.dataView.desktop.simpleDictionary.Icons',
            'mh.module.dataView.desktop.simpleDictionary.DataViewController',
            'mh.module.dataView.desktop.simpleDictionary.DataViewModel',
            'mh.module.dataView.desktop.simpleDictionary.EditView',
            'mh.module.dataView.desktop.simpleDictionary.RecordView',
            'mh.FontIconsDictionary'
        ],

        config:{
            /**
             * model to set up this view for
             */
            model: null,

            /**
             * @cfg title to be applied to single rec views; all the dicts use the very same instances of record, create & edit views
             */
            singleRecViewTitle: null,

            autoLoad: false,

            /**
             * default record view for this module
             */
            recordView: 'mh.module.dataView.desktop.simpleDictionary.RecordView',

            /**
             * default create/edit view for this module
             */
            editView: 'mh.module.dataView.desktop.simpleDictionary.EditView'
        },


        xtype: 'mh-desktop-simple-dictionary-data-view',

        controller: 'mh-desktop-simple-dictionary-data-view',

        viewModel: {
            type: 'mh-desktop-simple-dictionary-data-view'
        },

        gridCfg: {
            xtype:'mh-desktop-data-view-grid',
            columns: [
                {
                    bind: {
                        text: '{localization.name}'
                    },
                    dataIndex: 'name',
                    flex: 1,
                    filter: {
                        type: 'string',
                        operator: 'like'
                    }
                },
                {
                    bind: {
                        text: '{localization.description}'
                    },
                    dataIndex: 'description',
                    flex: 1,
                    filter: {
                        type: 'string',
                        operator: 'like'
                    }
                }
            ]
        }
    });

}());