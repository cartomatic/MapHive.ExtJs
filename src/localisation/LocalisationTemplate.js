//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 5/11/2016.
     */
    Ext.define('wg.localisation.LocalisationTemplate', {
        requires: [
            'wg.localisation.Localisation'
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
        wg.localisation.Localisation.registerTranslations(this);
    });

}());