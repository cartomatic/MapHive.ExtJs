//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.localisation.LocalisationTemplate', {
    requires: [
        'mh.localisation.Localisation',
        'mh.localisation.Localisation'
    ],
    statics: {
            localisation: {
                /**
                 * Here go translations in a form of:
                 *  {
                 *      translationKey: { //<-- this is a string to call when using localisation service / mixin
                 *          en: 'en specific string',
                 *          pl: 'po polsku'
                 *      }
                 *  }
                 */
            }
        }
    }, function(){
        //register translations with a localisation service / mixin,
        //so requiring this class is enough for it to kick in
        mh.localisation.Localisation.registerTranslations(this);
    });

}());