//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'

    Ext.define('mh.widget.RoundImage', {
        extend: 'Ext.Container',

        xtype: 'mh-roundimg',

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        requires: [
            'Ext.Image',
            'mh.widget.Icons'
        ],

        config: {
            imgWidth: 200,
            imgHeight: 200,
            editable: false
        },

        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            {xtype: 'container', flex: 1},
            {
                xtype: 'container',
                items: [
                    {
                        xtype: 'img',
                        reference: 'img',
                        style: {
                            borderRadius: '50%'
                        }
                    },
                    {
                        xtype: 'button',
                        reference: 'imgResetBtn',
                        hidden: true,
                        iconCls: mh.FontIconsDictionary.getIcon('mhRoundImageReset'),
                        left: 0,
                        bottom: 0,
                        ui: 'mh-roundimg-reset-btn'
                    },
                    {
                        xtype: 'button',
                        reference: 'imgAddBtn',
                        hidden: true,
                        iconCls: mh.FontIconsDictionary.getIcon('mhRoundImageAdd'),
                        right: 0,
                        bottom: 0,
                        ui: 'mh-roundimg-add-btn'
                    }
                ]
            },
            {xtype: 'container', flex: 1}
        ],

        initialize: function() {
            this.callMeParent(arguments);

            var img = this.down('[reference=img]');

            img.setWidth(this.config.imgWidth);
            img.setHeight(this.config.imgHeight);

            this.down('[reference=imgResetBtn]').on('tap', this.resetImgTap, this);
            this.down('[reference=imgAddBtn]').on('tap', this.addImgTap, this);
        },

        setImgWidth: function(w){
            this.down('[reference=img]').setWidth(w);
        },
        setImgHeight: function(h){
            this.down('[reference=img]').setHeight(h);
        },

        setImage: function(img){
            this.down('[reference=img]').setSrc(img);
        },

        setEditable: function(editable){
            this.down('[reference=imgResetBtn]').setVisibility(editable);
            this.down('[reference=imgAddBtn]').setVisibility(editable);
        },

        resetImgTap: function(){
            this.down('[reference=img]').setSrc(this.getNoImgSrc());
            this.fireEvent('imgreset', this);
        },

        getNoImgSrc: function(){
            var src = 'mh/resources/images/no-photo.png'; //no img
            //<debug>
            src = 'packages/local/mh/resources/images/no-photo.png';

            return src;
        },

        addImgTap: function(){
            if(!this.uploadField){
                this.uploadField = document.createElement('input');
                this.uploadField.type = 'file';
                this.uploadField.accept = ".png, .jpg, .gif";
                this.uploadField.style.display = 'none';
                document.body.appendChild(this.uploadField);
                this.uploadField.addEventListener('change', {
                    handleEvent: this.onUploadProfilePicture,
                    scope: this
                });
            }

            this.uploadField.click();
        },

        /**
         * upload field for picture uploads
         * @private
         */
        uploadField: null,

        /**
         * on upload profile picture handler
         * @param e
         * @param me
         * @param file
         */
        onUploadProfilePicture: function(e, me, file){
            if(typeof file === 'undefined'){
                file = e.target.files[0];
            }
            if(typeof me === 'undefined'){
                me = this.scope;
            }

            var reader  = new FileReader();

            reader.addEventListener("load", function () {

                me.down('[reference=img]').setSrc(reader.result);

                //reset input, so can pick the same file again
                me.uploadField.value = '';

                me.fireEvent('imgchanged', this, reader.result);
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        }

    });
}());
