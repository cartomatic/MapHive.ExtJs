//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * a generic toolbar for data views
     */
    Ext.define('mh.module.dataView.DataViewToolbarDesktop', {

        extend: 'Ext.Toolbar',

        xtype: 'mh-data-view-toolbar-desktop',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.Icons'
        ],

        ui: 'tools',

        defaults: {
            ui: 'base'
        },
        reference: 'dataviewtoolbar',

        items: [
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                reference: 'btnCreate',
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnCreate'),
                handler: 'onBtnCreateTap',
                bind: { text: '{localization.btnCreate}'}
            },
            {
                xtype: 'button',
                reference: 'btnEdit',
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnEdit'),
                bind: {
                    text: '{localization.btnEdit}',
                    disabled: '{!editable}'
                },
                handler: 'onBtnEditTap'
            },
            {
                xtype: 'button',
                reference: 'btnDestroy',
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDestroy'),
                handler: 'onBtnDestroyTap',
                bind: {
                    text: '{localization.btnDestroy}',
                    disabled: '{!deletable}'
                }
            }
        ]
    });
}());