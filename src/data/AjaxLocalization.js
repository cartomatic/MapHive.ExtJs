//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.AjaxLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                error: {
                    en: 'Error',
                    pl: 'Błąd'
                },
                srvErrMsg: {
                    en: 'Server reported the following error: ',
                    pl: 'Server zgłosił następujący błąd: '
                },
                errUnknown: {
                    en: 'Unknown (no response available)',
                    pl: 'Nieznany (brak odpowiedzi)'
                },
                code403: {
                    en: 'You are not allowed to view or modify this resource.',
                    pl: 'Nie masz uprawnień do wglądu i modyfikacji rządanego zasobu.'
                },
                opTimedOut: {
                    en: 'Operation timed out.',
                    pl: 'Żądanie do serwera zostało anulowane, ze względu na zbyt długi czas oczekiwania.'
                },
                unrecognisedErr: {
                    en: 'Unrecognised exception.',
                    pl: 'Nieznany wyjątek.'
                },
                tryAgain: {
                    en: 'Please try again or contact the SysAdmin.',
                    pl: 'Spróbuj ponownie, lub skontaktuj się z administratorem systemu.'
                },
                btnTryAgain: {
                    en: 'Try again',
                    pl: 'Spróbuj ponwnie'
                },
                btnCancel: {
                    en: 'Cancel',
                    pl: 'Anuluj'
                },
                btnOk: {
                    en: 'Ok',
                    pl: 'Ok'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());