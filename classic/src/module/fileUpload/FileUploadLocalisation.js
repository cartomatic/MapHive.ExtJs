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
                uploadBtn: {
                    en: 'Choose a file',
                    pl: 'Wybierz plik'
                },
                uploadDragHere: {
                    en: 'or drag it here...',
                    pl: 'lub przeciągnij tutaj...'
                },
                btnUpload: {
                    en: 'Upload',
                    pl: 'Zapisz'
                },
                btnCancel: {
                    en: 'Cancel',
                    pl: 'Anuluj'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });
}());