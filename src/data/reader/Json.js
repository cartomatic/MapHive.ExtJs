//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Customised json reader that can read some customised mh serverside output
     */
    Ext.define('mh.data.reader.Json', {
        extend: 'Ext.data.reader.Json',
        alias : 'reader.mhjson',

        mixins: [
            'mh.mixin.InitialCfg'
        ],

        //always read from the root
        rootProperty: 'data',

        totalProperty: 'total',

        /**
         * Customised response data extractor. used, so can extract some custom properties such as 'total' off the header.
         * This is because it has been decided to not pollute the api output by wrapping the data into ExtJs specific objects;
         * instead all the meta-data are returned in the header and the data itself in the response body
         * @param response
         * @returns {*}
         */
        getResponseData: function(response) {
            var error;

            try {
                //extract the data and wrap it into an object with root, so can avoid polluting the response data itself
                //after all it would be possible to override a total property on an object if present.
                //debugging such shit would be fun, huh...
                var data = {};
                if (response.responseJson) {
                    data[this.getRootProperty()] = response.responseJson;
                }
                else {
                    data[this.getRootProperty()] = response.responseText ? Ext.decode(response.responseText) : undefined;
                }

                //grab the response header and set a total property based on it;
                //this sets a property on the actual output object though!
                var total = response.getResponseHeader(this.getMhCfgProperty('headerTotal'));
                if(total !== undefined){
                    total = parseInt(total);
                    if(!isNaN(total)){
                        data[this.getTotalProperty()] = total;
                    }
                }
                return data;
            } catch (ex) {
                error = this.createReadError(ex.message);

                Ext.Logger.warn('Unable to parse the JSON returned by the server');
                this.fireEvent('exception', this, response, error);
                return error;
            }
        }
    });

}());