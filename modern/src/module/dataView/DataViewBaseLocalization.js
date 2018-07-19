//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.module.dataView.DataViewBaseLocalization', {
        requires: [
            'wg.localization.Localization'
        ],
        statics: {
            localization: {
                add:{
                    pl: 'Dodaj',
                    en: 'Add'
                },
                edit:{
                    pl: 'Edytuj',
                    en: 'Edit'
                },
                cancel:{
                    pl: 'Anuluj',
                    en: 'Cancel'
                },
                back:{
                    pl: 'Powrót',
                    en: 'Back'
                },
                save:{
                    pl: 'Zapisz',
                    en: 'Save'
                },
                btnCreate:{
                    pl: 'Nowy',
                    en: 'New'
                },
                create: {
                    pl: 'Utwórz',
                    en: 'Create'
                },
                btnEdit: {
                    pl: 'Edytuj',
                    en: 'Edit'
                },
                btnDestroy: {
                    pl: 'Usuń',
                    en: 'Delete'
                },
                btnRefresh: {
                    pl: 'Odśwież',
                    en: 'Refresh'
                },

                createDate: {
                    pl: 'Data utworzenia',
                    en: 'Create date'
                },
                modifyDate: {
                    pl: 'Data zmiany',
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
                confirmDestroySingleTitle: {
                    en: 'Delete record',
                    pl: 'Usuń rekord'
                },
                confirmDeleteManyRecords: {
                    en: 'Are you sure you want to delete selected records?',
                    pl: 'Czy na pewno chcesz usunąć zaznaczone rekordy?'
                },
                confirmDestroySingleRecord: {
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
                destroyFailureMsg: {
                    en: 'Failed to delete record.',
                    pl: 'Usunięcie rekordu nie powiodło się.'
                },
                saveLoadMask: {
                    en: 'Saving changes...',
                    pl: 'Zapisywanie zmian...'
                },

                recordLoadFailure: {
                    en: 'Failed to load a record.',
                    pl: 'Załadowanie rekordu nie powiodło się.'
                },
                loadRecLoadMask: {
                    en: 'Loading...',
                    pl: 'Ładowanie...'
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
                    pl: 'Filtruj...'
                },
                yes: {
                    en: 'Yes',
                    pl: 'Tak'
                },
                no: {
                    en: 'No',
                    pl: 'Nie'
                },
                pageSize: {
                    en: 'Display',
                    pl: 'Wyświetl'
                }
            }
        }
    }, function(){
        wg.localization.Localization.registerTranslations(this);
    });

}());