//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.view.dummy.Viewport', {
        extend: 'Ext.panel.Panel',

        requires: [
        'mh.view.dummy.ViewportController'
    ],

    plugins: 'viewport',

        controller: 'viewport',

        border: false,

        ui: window.location.hash.indexOf('sidebyside:true') > -1 ? 'orange-panel' : 'blue-panel',

        title: (window.location.hash.indexOf('sidebyside:true') > -1 ? 'I am a "SideBySide" example of a hosted app running @' : 'I am a hosted app example running @') + ' <b>' + window.location.href + '</b>',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Display',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.plugin.Viewport',
        'mh.communication.MsgBus',
        'mh.view.dummy.BtnPostChild',
        'mh.view.dummy.BtnPostChildDrilldown',
        'mh.view.dummy.BtnPostParent',
        'mh.view.dummy.BtnPostParentBubble',
        'mh.view.dummy.BtnPostUmbrella',
        'mh.view.dummy.ViewportController'
    ],

    layout: {
            type: 'vbox',
            align: 'stretch'
        },

    items: [
            {
                xtype: 'displayfield',
                value: 'Soooo, you may actually think about customising the CLASSIC app launcher to do whatever is needed, no?<br/>Bzzzz, bzzz, bzzzzzz....' +
                '<br/><br/>The app url is: <b>' + window.location.href + '</b>'
            },
            {
                xtype: 'panel',
                items: [
                    { xtype: 'btn-postparent-test', reference: 'btnPostParent', hidden: true  },
                    { xtype: 'btn-postparentbubble-test', reference: 'btnPostParentBubble', hidden: true },
                    { xtype: 'btn-postchild-test', reference: 'btnPostChild', hidden: true  },
                    { xtype: 'btn-postchilddrilldown-test', reference: 'btnPostChildDrillDown', hidden: true },
                    { xtype: 'btn-postumbrella-test', reference: 'btnPostUmbrella', hidden: true }
                ]
            },
            {
                xtype: 'panel',
                flex: 1,
                reference: 'umbrellaApps',
                title: 'And here are 2 more nested apps - each in an own iframe and each running in a different host',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'container',
                        flex: 1,
                        html: '<iframe id="umbrella-iframe-1" style="width:100%; height:100%;" src="about:blank"></iframe>'
                    },
                    {
                        flex: 1,
                        xtype: 'container',
                        html: '<iframe id="umbrella-iframe-2" style="width:100%; height:100%;" src="about:blank"></iframe>'
                    }
                ]
            }
        ]
    });

}());