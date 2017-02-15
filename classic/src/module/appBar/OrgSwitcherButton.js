(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 15.02.2017.
     */
    Ext.define('mh.module.appBar.OrgSwitcherButton', {
        extend: 'Ext.button.Split',
    
        xtype: 'mh-org-switcher-button',

        requires: [
            'mh.module.appBar.OrgSwitcherButtonController',
            'mh.module.appBar.OrgSwitcherButtonModel'
        ],

        controller: 'mh-org-switcher-button',

        viewModel: {
            type: 'mh-org-switcher-button'
        },

        ui: 'default-toolbar',

        scale: 'medium',

        menuAlign: 'tl-bl?',
        arrowVisible: false,

        bind: {
            text: '{currentOrgName}'
        },

        menu: {
            items: []
        },

        hidden: true,

        listeners: {
            click: 'onUserOrgsBtnClick'
        }
    });
    
}());

    