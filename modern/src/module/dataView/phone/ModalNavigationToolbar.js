//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.ModalNavigationToolbar', {
        extend: 'Ext.Toolbar',
    
        xtype: 'mh-phone-modal-navigation-toolbar',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.navMenu.Icons'
        ],

        docked: 'top',
        items: [
            {
                xtype: 'button',
                iconCls: mh.FontIconsDictionary.getIcon('mhNavMenuBack'),
                listeners: {
                    tap: 'onDismissBtnTap'
                }
            },
            '->',
            {
                xtype: 'label',
                flex: 1,
                bind: {
                    html: '{viewTitle}'
                }
            },
            '->',
            {
                xtype: 'spacer',
                width: 30
            }
        ]
    });
}());
