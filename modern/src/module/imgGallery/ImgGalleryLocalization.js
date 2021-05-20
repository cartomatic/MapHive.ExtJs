//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.imgGallery.ImgGalleryLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                viewName: {
                    en: 'Image Gallery',
                    pl: 'Galeria obrazów'
                },
                gridTitle: {
                    en: 'Images',
                    pl: 'Pliki'
                },
                loadingDataMask: {
                    en: 'Loading...',
                    pl: 'Ładowanie...'
                },
                metadataFailureTitle: {
                    en: 'Metadata failure',
                    pl: 'Błąd metadanych'
                },
                metadataFailureMsg: {
                    en: 'Failed to get gallery metadata',
                    pl: 'Błąd pobierania metadanych galerii'
                },
                fName: {
                    en: 'File name',
                    pl: 'Nazwa pliku'
                }
            }
        }

    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());