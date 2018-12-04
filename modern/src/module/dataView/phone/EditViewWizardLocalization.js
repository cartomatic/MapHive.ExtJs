//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.EditViewWizardLocalization', {
        requires: [
            'mh.localization.Localization'
        ],
        statics: {
            localization: {
                incompleteFormTitle: {
                    en: 'Incomplete form',
                    pl: 'Niekompletny formularz'
                },
                incompleteFormMsg1: {
                    en: 'Form is incomplete.',
                    pl: 'Formularz jest niekompletny.'
                },
                incompleteFormMsg2: {
                    en: 'Please make sure to fill in all the required fields.',
                    pl: 'Upewnij się, że wypełnione są wszystkie wymagane pola.'
                },
                saveAnywayPrompt: {
                    en: 'Would you like to save it anyway?',
                    pl: 'Czy mimo to chcesz zapisać?'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
