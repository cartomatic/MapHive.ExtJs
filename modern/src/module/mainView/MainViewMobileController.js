//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var consoleHdr = '[ROUTER@Main]_s::,orange,';

    Ext.define('mh.module.mainView.MainViewMobileController', {
        extend: 'mh.module.mainView.MainViewController',
        alias: 'controller.mh-main-view-mobile',

        mixins: [
            'mh.mixin.Localization',
            'mh.communication.MsgBus',
            'mh.data.Ajax',
            'mh.mixin.Router',
            'mh.mixin.ModalMode',
            'mh.util.console.Formatters'
        ],

        requires: [
            'Ext.data.Model',
            'mh.util.AliasMapper'
        ],


        /**
         * @event route::register
         * @param route
         * watched event, registers a submitted route
         */
        init: function() {
            this.callMeParent(arguments);

            var vw = this.getView();

            vw.add(
                vw.getNavMenu() || {
                    xtype: 'mh-main-view-nav-menu-mobile',
                    docked: 'top'
                }
            )
        }

    });
    
}());