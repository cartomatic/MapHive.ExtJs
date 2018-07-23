//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
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
                basicInfo: {
                    en: 'Basic info',
                    pl: 'Informacje podstawowe'
                },
                btnBack:{
                    pl: 'Powrót',
                    en: 'Back'
                },
                recordLoadFailure: {
                    en: 'Failed to load a record.',
                    pl: 'Załadowanie rekordu nie powiodło się.'
                },
                loadRecLoadMask: {
                    en: 'Loading...',
                    pl: 'Ładowanie...'
                },
                create: {
                    en: 'Create',
                    pl: 'Utwórz'
                },
                update: {
                    en: 'Update',
                    pl: 'Aktualizuj'
                },
                failedCreate: {
                    en: 'Failed to create a record.',
                    pl: 'Utworzenie rekordu nie powiodło się.'
                },
                failedUpdate: {
                    en: 'Failed to update a record.',
                    pl: 'Aktualizacja rekordu nie powiodła się.'
                },
                createLoadMask: {
                    en: 'Creating record...',
                    pl: 'Tworzenie rekordu...'
                },
                updateLoadMask: {
                    en: 'Updating record...',
                    pl: 'Aktualizacja rekordu...'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());