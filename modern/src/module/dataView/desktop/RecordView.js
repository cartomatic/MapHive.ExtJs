//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.desktop.RecordView', {
        extend: 'Ext.Panel',

        requires: [
            'Ext.tab.Panel',
            'mh.FontIconsDictionary',
            'mh.module.dataView.desktop.RecordViewController',
            'mh.module.dataView.RecordViewModel',
            'mh.module.dataView.Icons'
        ],

        controller: 'mh-desktop-record-view',

        viewModel: {
            type: 'mh-record-view'
        },

        eventedConfig: {
            record: null
        },

        config: {
            /**
             * hook for providing definitions of child components. they are pushed into view's tab panel on init
             * this way it is not necessary to re-declare tab panel every time a view is extended
             */
            screens: null,

            btnNextUi: 'mh-record-view-btn-next',
            btnPrevUi: 'mh-record-view-btn-prev',
            btnEditUi: 'mh-record-view-btn-edit',
            btnBackUi: 'mh-record-view-btn-back',

            /**
             * whether or not hash should be adjusted when a tab changes
             */
            adjustHash: true,

            /**
             * whether or not should show next / prev btns;
             * next / prev btns are hidden by default
             */
            showPrevNextBtns: false,

            /**
             * whether or not edit should be allowed from this modul
             */
            preventEdit: false

            //TODO
            // /**
            //  * customization hook for adjusting tab panel cfg
            //  */
            // tabPanelCfg: null
        },
        bind: {
            title: '{record.name}'
        },

        layout: 'fit',
        height: 512,
        width: 512,

        tools: {
            prev: {
                xtype: 'button',
                reference: 'btnPrev',
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnPrev'),
                handler: 'onBtnPrevTap',
                hidden: true
            },
            next: {
                xtype: 'button',
                reference: 'btnNext',
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnNext'),
                handler: 'onBtnNextTap',
                hidden:true,
                weight: 5
            },
            spacer: {
                xtype: 'spacer',
                weight: 10
            },
            action: {
                xtype: 'button',
                reference: 'btnEdit',
                bind: {
                    text: '{localization.btnEdit}'
                },
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnEdit'),
                margin: '0 10 0 0',
                weight: 30,
                handler: 'onBtnEditTap'
            },

            back: {
                xtype: 'button',
                reference: 'btnBack',
                bind: {
                    text: '{localization.btnBack}'
                },
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnBack'),
                margin: '0 10 0 0',
                weight: 40,
                handler: 'onBtnBackTap'
            }
        },

        items: [{
            xtype: 'tabpanel',
            reference: 'tabPanel',
            layout: {
                type: 'card',
                animation: 'fade'
            },

            defaults: {
                //userCls: 'wizard-screen',
                scrollable: 'y',
                padding: 15,
                tab: {
                    iconAlign: 'left'
                }
            },

            tabBar: {
                defaultTabUI: 'flat',
                ui: 'flat',
                layout: {
                    pack: 'center'
                }
            },

            listeners: {
                activeItemchange: 'onActiveItemChange'
            }
        }],

        listeners: {
            activate: '__onViewActivate'
        }
    });
}());