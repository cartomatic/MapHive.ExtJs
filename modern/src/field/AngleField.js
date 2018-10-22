//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){

    //Make sure strict mode is on
    'use strict'

    /**
     * Created by domin on 19.10.2018.
     */
    Ext.define('mh.field.AngleField', {
        extend: 'Ext.field.Container',

        xtype: 'mh-anglefield',

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        requires: [
            'Ext.d3.canvas.Canvas'
        ],

        config: {
            value: null,
            editable: false
        },

        layout: {
            type: 'hbox',
            align: 'center'
        },
        defaults: {
            flex: 1
        },
        items: [
            {
                xtype: 'numberfield',
                readOnly: true,
                bind: {
                    value: '{record.bearing}'
                },
                decimals: 0
            },
            {
                xtype: 'd3-canvas',
                width: 100,
                height: 100
            }
        ],

        publishes: {
            value: true
        },

        d3Canvas: null,

        initialize: function(){
            this.callMeParent(arguments);
            this.d3Canvas = this.getContainer().items.items[1];
        },

        /**
         * applies value - this is a pre-set fix
         * @param value
         * @returns {*}
         */
        applyValue: function(value){
            if(!Ext.isNumber(value)){
                value = 0;
            }

            value = value % 360;


            this.paintValue(value);

            return value;
        },

        /**
         * paints the angle value on canvas
         * @param value
         */
        paintValue: function(value){
            if(this.canDraw()){

                this.setUpDrawingStuff();

                var ctx = this.d3Canvas.canvas.getContext("2d"),
                    size = this.d3Canvas.size,
                    angleRad = Math.PI / 180 * value;

                //first wipeout
                //ctx.fillStyle = this.backColor;
                ctx.clearRect(0,0, size.width, size.height);

                //rotate canvas
                //move registration point to the center of the canvas
                //so rotation is against center not the top left
                ctx.translate(size.width/2, size.height/2);
                ctx.rotate(angleRad);

                //move the reg point to the center again
                //ctx.translate(-size.width/2, -size.height/2);

                //now the angle symbol
                ctx.fillStyle = this.frontColor;
                ctx.fillText(this.angleTxt, 0, 0, 200); //0,0 as already rotated //fucked up
                //ctx.fillText(this.angleTxt, size.width/2, size.height/2, 200);

                //and rotate back
                //ctx.translate(size.width/2, size.height/2);
                ctx.rotate(-angleRad);

                //and reset the 0,0 again
                ctx.translate(-size.width/2, -size.height/2);

            }
            else {
                Ext.defer(function(){
                    this.paintValue(value);
                }, 100, this);
            }
        },

        canDraw: function(){
            return !!this.d3Canvas && !!this.d3Canvas.canvas;
        },

        drawingStuffSetUp: false,

        angleTxt: 'X',

        backColor: '#fff',

        frontColor: '#000',

        /**
         * sets up drawing stuff
         */
        setUpDrawingStuff: function(){
            if(this.drawingStuffSetUp){
                return;
            }

            while(!mh.FontIconsDictionary.getFontChar('.i54c-navigation-1::before')) {
                //do nothing, just make it spin twice...
            }
            this.angleTxt = String.fromCharCode(mh.FontIconsDictionary.getFontChar('.i54c-navigation-1::before'));

            var ctx = this.d3Canvas.canvas.getContext("2d");

            ctx.font = "normal 100pt icon54com";

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            this.setEditable(this.getEditable());

            this.drawingStuffSetUp = true;
        },


        /**
         * applies editable
         * @param editable
         */
        applyEditable: function(editable){

            if(!this.canDraw()){
                return editable;
            }

            var me = this,
                roatateTarget = this.d3Canvas.canvas,
                //https://github.com/zingchart/zingtouch
                rotateRegion = new ZingTouch.Region(roatateTarget);

            if(editable) {
                rotateRegion.bind(roatateTarget, 'rotate', function(e){
                    var newV = me.getValue() + e.detail.distanceFromLast;
                    //make sure we're always operating in 0-360 range;
                    if(newV < 0){
                        newV = 360 + newV;
                    }
                    me.setValue(newV);
                });
            }
            else {
                rotateRegion.unbind(roatateTarget, 'rotate');
            }

            //todo - maybe should also handle the input field...

            return editable;
        }
    });
}());