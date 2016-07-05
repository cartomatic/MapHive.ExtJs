//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    Ext.define('mh.localisation.LocalisationTemplate', {
    requires: [
        'mh.localisation.Localisation'
    ],
    statics: {

            /**
             * a translations class this class inherits from. basically if it does not override a property, then the lookup continues deeper to a class
             * a translations is marked as inheriting from and so on.
             * The standard inheritance IS NOT used because it would be impossible to recognise what properties have been inherited, what overriden etc.
             * see mh.localisation.Localisation.getTranslation for details
             */
            extends: '',

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