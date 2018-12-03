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
                incompleteFormMsg: {
                    en: 'Form is incomplete. Please make sure to fill in all the required fields.',
                    pl: 'Formularz jest niekompletny. Upewnij się, że wypełnione są wszystkie wymagane pola.'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });
}());
