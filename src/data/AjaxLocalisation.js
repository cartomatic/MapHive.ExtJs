//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.data.AjaxLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        inheritableStatics: {
            localisation: {
                error: {
                    en: 'Error',
                    pl: 'Błąd'
                },
                srvErrMsg: {
                    en: 'Server reported the following error: ',
                    pl: 'Server zgłosił następujący błąd: '
                },
                code403: {
                    en: 'You are not allowed to view this resource.',
                    pl: 'Nie masz uprawnień do wglądu w rządany zasób.'
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
        mh.localisation.Localisation.registerTranslations(this);
    });

}());