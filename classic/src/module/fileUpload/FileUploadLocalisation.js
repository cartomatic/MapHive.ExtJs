(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 31-Jul-16.
     */
    Ext.define('mh.module.fileUpload.FileUploadLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
                uploadTitle: {
                    en: 'File upload',
                    pl: 'Zapisywanie pliku'
                },
                uploadDescription: {
                    en: 'Drag files below or use a side button...',
                    pl: 'Przeciągnij i upuść pliki poniżej, lub użyj przycisku...'
                },
                chooseFilesBtn: {
                    en: 'Choose a file',
                    pl: 'Wybierz plik'
                },
                chooseFilesBtnMulti: {
                    en: 'Choose files',
                    pl: 'Wybierz pliki'
                },
                uploadDragHere: {
                    en: 'or drag it here...',
                    pl: 'lub przeciągnij tutaj...'
                },
                uploadDragHereMulti: {
                    en: 'or drag them here...',
                    pl: 'lub przeciągnij je tutaj...'
                },
                selectedFile: {
                    en: 'Selected file:',
                    pl: 'Wybrany plik:'
                },
                selectedFiles: {
                    en: 'Selected files:',
                    pl: 'Wybrane pliki:'
                },
                btnUpload: {
                    en: 'Upload',
                    pl: 'Zapisz'
                },
                btnCancel: {
                    en: 'Cancel',
                    pl: 'Anuluj'
                },
                loadMask: {
                    en: 'Uploading...',
                    pl: 'Zapisywanie...'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });
}());