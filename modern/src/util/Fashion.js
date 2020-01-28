//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.util.Fashion', {
        singleton: true,
        requires: [
        ],
        mixins: [
        ],

        setUiMode: function(mode){
            let cssVars = {
                "dark-mode": "false"
            };
            if(mode === 'dark'){
                cssVars = {
                    "dark-mode": "true",
                    "base-highlight-color": "#f3cd1d",
                    "base-foreground-color": "#f3cd1d",
                    "base-color": "#f3cd1d", /*bee yellow*/
                    "base-focused-color": "#f3cd1d",
                    /*"faded-color": "#222222",*/
                    "color": "#f3cd1d",
                    "selected-background-color": "#6D6D6D",
                    "xmh-grid-link-color": "#f3cd1d",
                    "xmh-panel-header-background-color": "#292929",
                    "xmh-panel-header-color": "#f3cd1d",
                    "xmh-button-color": "#f3cd1d",
                    "xmh-button-disabled-color": "#867a2b",
                    "xmh-button-pressed-color": "#292929",
                    /*"xmh-button-pressed-color": "#f3cd1d",*/ /*dirty yellow*/
                    "xmh-thumb-background-color": "#222222",
                    "xmh-titlebar-background-color": "#292929",
                    "xmh-titlebar-color": "#f3cd1d",
                    "xmh-tab-color": "#9f8a2b",
                    "xmh-tab-active-color": "f3cd1d",
                    "xmh-tab-hovered-color": "f3cd1d",
                    "xmh-tab-background-color":"#303030",
                    "xmh-tab-active-background-color":"#2c2c2c",
                    "xmh-tab-active-indicator-background-color":"#f3cd1d",
                    "xmh-tabbar-background-color":"#333333",
                    "xmh-record-view-button-color":"#f3cd1d",
                    "xmh-scrollbar-background-color":"#404040",
                    "xmh-scrollbar-track-background-color":"#404040",
                    "xmh-scrollbar-thumb-background-color":"#333333"
                };
            }

            Fashion.css.setVariables(cssVars);
        }
    });
}());