//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Base data view localization
     */
    Ext.define('mh.module.dataView.DataViewBaseLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                btnCreate:{
                    pl: 'Nowy',
                    en: 'New'
                },
                btnEdit: {
                    pl: 'Edytuj',
                    en: 'Edit'
                },
                btnDelete: {
                    pl: 'Usuń',
                    en: 'Delete'
                },
                gridTitle: {
                    en: 'Some grid title',
                    pl: 'Widok tabelaryczny'
                },
                formTitle: {
                    pl: 'Widok rekordu',
                    en: 'Data view'
                },
                createDate: {
                    pl: 'Data utworzenia',
                    en: 'Create date'
                },
                modifyDate: {
                    pl: 'Data os. modyfikacji',
                    en: 'Modify date'
                },

                editorCfgErrTitle: {
                    en: 'Error'
                },
                editorCfgErrMsg: {
                    en: 'Failed to create editor instance; full err msg is:<br/>'
                },

                confirmDeleteManyTitle: {
                    en: 'Delete records',
                    pl: 'Usuń rekordy'
                },
                confirmDeleteSingleTitle: {
                    en: 'Delete record',
                    pl: 'Usuń rekord'
                },
                confirmDeleteManyRecords: {
                    en: 'Are you sure you want to delete selected records?',
                    pl: 'Czy na pewno chcesz usunąć zaznaczone rekordy?'
                },
                confirmDeleteSingleRecord: {
                    en: 'Are you sure you want to delete selected record?',
                    pl: 'Czy na pewno chcesz usunąć zaznaczony rekord?'
                },
                deleteLoadmaskMany: {
                    en: 'Deleting records...',
                    pl: 'Usuwanie rekordów...'
                },
                deleteLoadmaskSingle: {
                    en: 'Deleting record...',
                    pl: 'Usuwanie rekordu...'
                },
                deleteFailureMsg: {
                    en: 'Failed to delete record.',
                    pl: 'Usunięcie rekordu nie powiodło się'
                },

                btnFilterOn: {
                    en: 'Filter by...',
                    pl: 'Filtruj po...'
                },
                btnFilterOnTooltip: {
                    en: 'Chose fields to filter by',
                    pl: 'Wybierz pola filtra'
                },
                filterBlankText: {
                    en: 'Type to filter records...',
                    pl: 'Filtruj rekordy...'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());