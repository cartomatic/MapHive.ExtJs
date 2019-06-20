//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'

    /**
     * simplistic color field while waiting for one from sencha...
     */
    Ext.define('mh.field.ColorField', {
        extend: 'Ext.field.Text',
        readOnly: true,

        xtype: 'mh-color-field',

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        config: {
            defaultColor: '#000000'
        },

        colorInput: null,

        initialize: function() {
            this.callMeParent(arguments);

            if(typeof(CP) === 'undefined'){
                alert('You are using mh.field.ColorField but have not referenced the color picker script.');
                return;
            }

            var field = this;

            if(this.getEditable()){
                this.colorInput = new CP(this.inputElement.dom);
                this.colorInput.on("change", function(color) {
                    this.target.value = '#' + color;
                    this.target.style.backgroundColor  = '#' + color;
                    field.setValue('#' + color);
                });
            }

            this.inputElement.dom.style.backgroundColor = (this.getValue() || this.getDefaultColor());
        },

        setValue: function(value){
            this.callMeParent(arguments);

            //<debug>
            console.log('ColorPicker setting value:', value);
            //</debug>

            if(this.colorInput){
                this.colorInput.set(value || this.getDefaultColor());
            }

            this.inputElement.dom.style.backgroundColor = (value || this.getDefaultColor());
        }
    });
}());
