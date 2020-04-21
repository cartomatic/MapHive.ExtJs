//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.util.DarkMode', {
        singleton: true,
        requires: [
            'mh.util.Color',
            'mh.util.Cookie'
        ],
        mixins: [
            'mh.communication.MsgBus'
        ],

        darkModeOn: false,

        darkMapModeOn: false,

        cookieUiModeProp: 'ui-mode',
        cookieMapModeProp: 'ui-map-mode',

        /**
         * sets ui mode with a value saved before or a specified default
         * @param defaultMode
         */
        setUiModeSavedOrDefault: function(defaultMode){
            let savedUiMode = mh.util.Cookie.getMhCookieProp(this.cookieUiModeProp),
                savedMapMode = mh.util.Cookie.getMhCookieProp(this.cookieMapModeProp);;

            this.setUiMode(
                typeof savedUiMode !== 'undefined' ? savedUiMode : defaultMode
            );
            this.setMapMode(
                typeof savedMapMode !== 'undefined' ? savedMapMode : defaultMode
            );
        },

        /**
         * sets ui mode
         * @param mode
         */
        setUiMode: function(mode){
            this.darkModeOn = mode === 'dark';
            if(this.darkModeOn){
                Fashion.css.setVariables(this.getDarkModeCssVars());
            }
            else {
                Fashion.css.setVariables(this.getStdModeCssVars());
            }
            mh.util.Cookie.setMhCookieProp(this.cookieUiModeProp, mode);
            this.fireGlobal('ui-mode-changed');
        },

        setMapMode: function(mode){
            this.darkMapModeOn = mode === 'dark';
            mh.util.Cookie.setMhCookieProp(this.cookieMapModeProp, mode);
            this.fireGlobal('ui-map-mode-changed');
        },

        /**
         * gets std mode css vars
         * @returns {*}
         */
        getStdModeCssVars: function(){
            let vars = {
                "dark-mode": "false"
            };
            return Ext.apply(vars, this.customStdModeVars || {});
        },

        getDarkModeCssVars: function(){
            let vars = {
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
                "xmh-scrollbar-thumb-background-color":"#333333",
                "xmh-dataview-item-alt-background-color":"#303030",
                "xmh-dataview-item-background-color":"#353535",
                "xmh-tool-color": "#f3cd1d", /*dirty yellow*/
                "xmh-nav-menu-mobile-spacer-color": "#f3cd1d", /*bee yellow*/
                "xmh-phone-dict-pick-list-btn-selected-background-color": "#f3cd1d",
                "xmh-phone-dict-pick-list-btn-selected-color": "#292929",
                "xmh-phone-dict-pick-list-btn-background-color": "#3d3d3d",
                "xmh-phone-dict-pick-list-btn-color": "#f3cd1d",
                "xmh-phone-dict-pick-list-panel-background-color":"#303030",
                "xmh-phone-dict-pick-list-panel-header-color": "#f3cd1d", /*bee yellow*/

                "xmh-phone-btn-green-color": "#56B750",
                "xmh-phone-btn-green-background-color": "#202020",
                "xmh-phone-soft-green-btn-color": "#9cc96b",
                "xmh-phone-soft-green-btn-background-color": "#202020",
                "xmh-phone-gray-btn-color": "#919191",
                "xmh-phone-gray-btn-background-color": "#202020",
                "xmh-phone-red-btn-color": "#af5e5e",
                "xmh-phone-red-btn-background-color": "#202020",
                "xmh-phone-blue-btn-color": "#6aa5db",
                "xmh-phone-blue-btn-background-color": "#202020",
                "xmh-phone-purple-btn-color": "#f3cd1d", /*bee yellow*/
                "xmh-phone-purple-btn-background-color": "#202020",
                "xmh-phone-purple-btn-disabled-color":"#9a822c", /*dirty yellow*/
                "xmh-phone-purple-btn-disabled-background-color": "#202020",

                "xmh-listswiperstepper-background-color":"#303030",

                "xmh-map-attribution-color": "#f3cd1d",
                "xmh-map-attribution-shadow-color": "#9a822c", /*dirty yellow*/
                "xmh-map-attribution-background-color": "#303030",
                "xmh-map-control-color": "#f3cd1d",
                "xmh-map-control-background-color": "#303030",
                "xmh-map-scale-line-color": "#f3cd1d",
                "xmh-map-control-halo-background-color" :"#9a822c", /*dirty yellow*/
            };

            return Ext.apply(vars, this.customDarkModeVars || {});
        },

        /**
         * @private
         */
        customDarkModeVars: null,

        /**
         * sets a custom dark mode css var, so it can be combined when applying dark mode
         * @param variable
         * @param value
         */
        setCustomDarkModeVar: function(variable, value){
            this.customDarkModeVars = this.customDarkModeVars || {};
            if(value){
                this.customDarkModeVars[variable] = value;
            }
            else {
                delete this.customDarkModeVars[variable];
            }
        },

        /**
         * @private
         */
        customStdModeVars: null,

        /**
         * sets a custom std mode css var, so it can be combined when applying std mode
         * @param variable
         * @param value
         */
        setStdDarkModeVar: function(variable, value){
            this.customStdModeVars = this.customStdModeVars || {};
            if(value){
                this.customStdModeVars[variable] = value;
            }
            else {
                delete this.customStdModeVars[variable];
            }
        }
    });
}());