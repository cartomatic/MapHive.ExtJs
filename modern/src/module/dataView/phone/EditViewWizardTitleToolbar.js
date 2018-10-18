//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.EditViewWizardTitleToolbar', {

        extend: 'Ext.Container',

        xtype: 'mh-phone-edit-view-wizard-title-toolbar',

        docked: 'top',
        style: {
            marginTop: '10px',
            padding: '5px'
        },
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            { xtype: 'container', flex: 1},
            {
                xtype: 'label',
                reference: 'titleBarLabel',
                html: '&nbsp'
            },
            { xtype: 'container', flex: 1}
        ]
    });
}());
