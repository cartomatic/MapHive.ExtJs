//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Dummy hosted app viewport with some basic examples of xWindow communication + xWindow hash exchange
     */
    Ext.define('mh.dummy.view.Viewport', {
        extend: 'Ext.panel.Panel',

    requires: [
        'mh.dummy.view.BtnModalModeStart',
        'mh.dummy.view.BtnPostChild',
        'mh.dummy.view.BtnPostChild',
        'mh.dummy.view.BtnPostChildDrilldown',
        'mh.dummy.view.BtnPostChildDrilldown',
        'mh.dummy.view.BtnPostParent',
        'mh.dummy.view.BtnPostParent',
        'mh.dummy.view.BtnPostParentBubble',
        'mh.dummy.view.BtnPostParentBubble',
        'mh.dummy.view.BtnPostUmbrella',
        'mh.dummy.view.BtnPostUmbrella',
        'mh.dummy.view.ViewportController',
        'mh.dummy.view.ViewportController'
    ],

    plugins: 'viewport',

        controller: 'viewport',

        border: false,

        ui: window.location.href.indexOf('sidebyside=true') > -1 ? 'orange-panel' : 'blue-panel',

        title: (window.location.href.indexOf('sidebyside=true') > -1 ? 'I am a "SideBySide" example of a hosted app running @' : 'I am a hosted app example running @') + ' <b>' + window.location.href + '</b>',



        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        items: [
            {
                xtype: 'displayfield',
                value: 'Soooo, you may actually think about customising the CLASSIC app launcher to do whatever is needed, no?<br/>Bzzzz, bzzz, bzzzzzz....' +
                '<br/><br/>The app url is: <b>' + window.location.href + '</b>' +
                '<br/><br/><div id="msgbus_xwindowtest_feedback" style="height: 20px;"></div>' +
                '<br/><br/><div id="msgbus_xwindowroutertest_feedback" style="height: 20px;"></div>'
            },
            {xtype: 'fieldcontainer', items: [
                {xtype: 'textfield', reference: 'hashTextBox', width: 300},
                {xtype: 'button', text: 'Send hash to host', listeners: {click: 'onSendHashToHost'}}
            ]
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
                items: [
                    { xtype: 'btn-modalmodestart-test', ui: 'red-button'}
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