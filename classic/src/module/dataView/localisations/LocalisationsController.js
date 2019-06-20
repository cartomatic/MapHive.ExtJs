//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localizations.LocalizationsController', {
        extend: 'Ext.app.ViewController',

        alias: 'controller.mh-localizations',

    requires: [
        'Ext.app.Application',
        'mh.module.dataView.localizations.LocalizationsLocalization'
    ],

    mixins: [
            'mh.mixin.Localization',
            'mh.mixin.CallMeParent',
            'mh.mixin.GridUtils',
            'mh.mixin.RouteUtils'
        ],

        routes: {
            'localizations': 'onViewKickIn',
            'localizations/:subView': 'onViewKickIn'
        },

        mainRoute: 'localizations',

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);
            this.injectLocalizationToViewModel();

            //this is a startup, so need to grab the route manually and feed it into the route handler for the view...
            this.getView().on('afterrender', function(){
                //this is init. and there is a chance the view has been created dynamically just after a route has been recognised
                //make sure to force route execution again this one time
                this.redirectTo(window.location.hash.substring(1), true);
            }, this);

            //tabs should have their routes too; routes are based on their refs
            this.getView().on(
                'tabchange',
                function(panel, newCard, oldCard){
                    window.location.hash = this.mainRoute + '/' + newCard.reference;
                },
                this
            );
        },

        /**
         * Dbl checks if a view that is requested can be handled and turns it on if so. Otherwise it redirects to the app's default view
         * @param view
         */
        onViewKickIn: function(subView){

            if(subView){

                var view = this.lookupReference(subView);

                if(view){
                    this.getView().setTitle(view.getTitle());
                    this.getView().setIconCls(view.getIconCls());
                    this.getView().getLayout().setActiveItem(view);
                }
                else {
                    //okey dokey, this is an unmatched route after all, so redirect to a default route
                    this.redirectToDefaultRoute();
                }
            }
            else {
                //no subview defined. this will display whatever is configured initially
                //just make sure to apply proper title
                this.getView().setTitle(this.getTranslation('title'));
                this.getView().setIconCls('x-i54 i54-speach-bubbles-1');
            }
        }
    });

}());