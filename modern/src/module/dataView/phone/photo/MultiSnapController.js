//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 14.10.2018.
     */
    Ext.define('mh.module.dataView.phone.photo.MultiSnapController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-photo-multi-snap',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.phone.photo.Icons',
            'mh.module.dataView.phone.photo.MultiSnapLocalization'
        ],

        mixins: [
            'mh.mixin.PublishApi',
            'mh.mixin.Localization'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.publishApi('setSnappers', 'setPhotos', 'setPhoto', 'getPhotos', 'getPhoto');

            this.setUpCameras();
        },

        /**
         * currently registered img refs
         */
        refs: null,

        /**
         * sets the required snappers - each will allow for taking a separate photo
         * @param snappers
         */
        setSnappers: function(snappers){
            this.getView().removeAll(true);
            this.refs = [];

            var items = [];

            Ext.Array.each(snappers, function(s){
                items.push(this.prepareSnapper(s));
            }, this);

            if(items.length > 0){
                this.getView().add(items);
            }
        },

        /**
         * prepares a single snapper
         * @private
         * @param snapper
         * @param snapper.iconCls icon to display for a tab
         * @param snapper.reference ref to find a tab by and set / get data
         * @param snapper.title title to set for a tab
         */
        prepareSnapper: function(snapper){
            var me = this;

            this.refs.push(snapper.reference);

            return {
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'text'
                },
                iconCls: snapper.iconCls || mh.FontIconsDictionary.getIcon('mhPhotoIconDefault'),
                title: snapper.title || undefined,
                reference: snapper.reference + '-snapper',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        items: [
                            '->',
                            {
                                xtype: 'button',
                                iconCls: mh.FontIconsDictionary.getIcon('mhPhotoSnap'),
                                handler: function(){
                                    me.showSnapperDialog(snapper.reference);
                                }
                            },
                            {
                                xtype: 'button',
                                iconCls: mh.FontIconsDictionary.getIcon('mhPhotoDelete'),
                                handler: function(){
                                    var img = me.lookupReference(snapper.reference + '-img'),
                                        oldSrc = img.getSrc();
                                    img.setSrc(null);
                                    me.reportChange(snapper.reference, null, oldSrc);
                                }
                            },
                            '->'
                        ]
                    },
                    {
                        xtype: 'image',
                        reference: snapper.reference + '-img',
                        flex: 1
                    }
                ]
            }
        },

        /**
         * @event snapchanged
         * @param object
         * @param img ref
         * @param newV
         * @param oldV
         */

        /**
         * reports a change in the comp's values
         * @param ref
         * @param newV
         * @param oldV
         */
        reportChange: function(ref, newV, oldV){
            this.getView().fireEvent('snapchanged', this.getView(), ref, newV, oldV);
        },

        /**
         * sets photos data in bulk
         * @param {object[]} photos
         */
        setPhotos: function(photos){
            Ext.Array.each(photos, function(p){
                this.setPhoto(p.reference, p.data);
            }, this);
        },

        /**
         * sets a single photo
         * @param ref
         * @param data
         */
        setPhoto: function(ref, data){
            var img = this.lookupReference(ref + '-img');
            if(img){
                img.setSrc(data);
            }
        },

        /**
         * gets a single photo.
         * @param ref
         * @returns {*}
         */
        getPhoto: function(ref){
            var img = this.lookupReference(ref + '-img');
            if(img){
                return img.getSrc();
            }
            return null;
        },

        /**
         * gets all the photos
         */
        getPhotos: function(){
            var data = {};
            Ext.Array.each(this.refs, function(r){
                data[r] = this.getPhoto(r);
            }, this);
            return data;
        },

        /**
         * snapper dialog instance
         */
        snapperDialog: null,

        /**
         * gets identifier of a video el used by this module
         * @returns {string}
         */
        getVideoElId: function(){
            return this.getId() + '-video-el';
        },

        getShittyUploaderId: function(){
            return this.getId() + '-camera-input';
        },

        getShittyCameraId: function(){
            return this.getId() + '-camera-input';
        },

        /**
         * displays a snap photo dialog
         * @param ref
         */
        showSnapperDialog: function(ref){

            if(!this.snapperDialog){
                var me = this;

                this.snapperDialog = Ext.create('Ext.Panel', {
                    layout: 'fit',

                    fullscreen: true,

                    closable: false,

                    html: this.noCamerasDetected
                        ? undefined
                        : '<div style="height:100%;width:100%; overflow: hidden; position: absolute;">' +
                            '<video id="' + this.getVideoElId() + '" muted autoplay style="width: 100%; height: 100%; left: 0px; top:0px; position: absolute; background-color: #404040; "></video>' +
                        '</div>' +
                        '<div id="' + this.getShittyUploaderId() + '" style="display:none;"> <label>Take a picture</label><input type="file" id="' + this.getShittyCameraId() + '" accept="image/*"></div>',

                    width: '100%',
                    height: '100%',

                    items: [
                        {
                            xtype: 'label',
                            html:  '<b>' + this.getTranslation('noVideoDevicesFound') + '</b>',
                            hidden: !this.noCamerasDetected
                        },
                        {
                            xtype: 'button',
                            //floated: true,
                            iconCls: mh.FontIconsDictionary.getIcon('mhPhotoSnap'),
                            ui: 'confirm round',
                            right: 20,
                            bottom: 20,
                            hidden: this.noCamerasDetected,
                            handler: function(){
                                me.snapPhoto();
                                me.snapperDialog.hide();
                            }
                        },
                        {
                            xtype: 'button',
                            //floated: true,
                            iconCls: mh.FontIconsDictionary.getIcon('mhPhotoCancel'),
                            ui: 'decline round',
                            left: 20,
                            bottom: 20,
                            handler: function(){
                                me.snapperDialog.hide();
                            }
                        }
                    ],
                    listeners: {
                        show: Ext.bind(this.onSnapperDialogShow, this),
                        hide: Ext.bind(this.onSnapperDialogHide, this)
                    }
                });
            }

            this.snapperDialog.imgRef = ref;
            this.snapperDialog.show();
        },

        /**
         * canvas element used for rendering a camera feed as a static img
         */
        snapCanvas: null,

        snapPhoto: function(){

            //take care of older shitty devices
            if(this.useShittyDeviceInput){

                var me = this,
                    input = document.getElementById(this.getShittyCameraId());

                input.onchange = function(){

                    if(input.files[0]){
                        var reader = new FileReader();
                        reader.addEventListener("load", function () {

                            me.applySnappedPhoto(reader.result);
                            reader = null;

                        }, false);

                        reader.readAsDataURL(input.files[0]);
                    }
                }

                //reset field and click!
                input.value = '';
                input.click();

                return;
            }


            var vel = document.getElementById(this.getVideoElId());

            if(!this.snapCanvas){

                this.snapCanvas = document.createElement("canvas");

                this.snapCanvas.width = vel.videoWidth;
                this.snapCanvas.height = vel.videoHeight;
            }

            //draw full img
            this.snapCanvas.getContext('2d').drawImage(vel, 0, 0, vel.videoWidth, vel.videoHeight);

            //and pass for processing
            this.applySnappedPhoto(this.snapCanvas.toDataURL('image/png'));
        },

        /**
         * applies a snapped photo and reports changes
         * @param data
         */
        applySnappedPhoto: function(data){

            var ref = this.snapperDialog.imgRef,
                img = this.lookupReference(ref + '-img'),
                oldSrc = img.getSrc();

            img.setSrc(data);

            this.reportChange(ref, data, oldSrc);
        },

        /**
         * snapper dialog show callback - starts video feed
         */
        onSnapperDialogShow: function(){
            //modal mode on

            //snapper video feed on
            this.startVideoFeed();
        },

        /**
         * snapper dialog hide handler - stops video feed
         */
        onSnapperDialogHide: function(){
            //modal mode off

            //snapper video feed off
            this.stopVideoFeed();
        },

        /**
         * a really simplistic and naive way of testing if this is a mobile device;
         * needed really for sensibly testing the mobile app in desktop chrome and then working out the sizing of camera feed;
         * mobile have portrait camera, while desktop / notebooks seem to have a landscape camera orientation
         * @returns {boolean}
         */
        isMobile: function(){
            //<debug>
            return false;
            //</debug>
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        },

        /**
         * video feed
         */
        stream: null,

        /**
         * whether or not video feed is active
         */
        videoFeedActive: false,

        /**
         * starts video feed
         */
        startVideoFeed: function(){

            var me = this,
                wireUpVideoStream = function(stream) {

                    var vel = document.getElementById(me.getVideoElId());

                    //no need to reposition images, etc. style of video el takes care of it

                    me.stream = stream;
                    vel.srcObject = stream;

                    me.videoFeedActive = true;
                },

                handleVideoStreamErr = function(err) {
                    me.stopVideoFeed();

                    //<debug>
                    console.warn('Error feeding video', err);
                    //</debug>
                };


            //<debug>
            console.warn('Starting video feed');
            //</debug>


            //connect to stream
            if(navigator.mediaDevices){
                navigator.mediaDevices.getUserMedia({
                    video: {
                        optional: [{
                            sourceId: this.currentVideoDevice.deviceId
                        }],
                        mandatory: {
                            minWidth: 1280,
                            minHeight: 720
                        }
                    }
                }).then(wireUpVideoStream).catch(handleVideoStreamErr);
            }
            else if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
                //looks like no media devices....
                //need to check navigator.getUserMedia

                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if(navigator.getUserMedia){
                    navigator.getUserMedia({ video: { width: 1280, height: 720 } },
                        wireUpVideoStream,
                        handleVideoStreamErr
                    );
                }
            }
            else if (this.useShittyDeviceInput){
                //not much really so far...
                document.getElementById(this.getVideoElId()).style.display = 'none';
            }
        },

        /**
         * stops video feed
         */
        stopVideoFeed: function(){
            this.resetVideoFeed();

            //<debug>
            console.warn('Stopping video feed');
            //</debug>

            var vel = document.getElementById(this.getVideoElId());

            if(vel && !this.useShittyDeviceInput){
                vel.srcObject = null;
            }

            this.videoFeedActive = false;
        },

        /**
         * resets video feed
         */
        resetVideoFeed: function(){

            if(this.useShittyDeviceInput){
                document.getElementById('cameraInput').value = '';
            }

            if (this.stream) {
                //<debug>
                console.warn('Resetting video feed');
                //</debug>

                this.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
                this.stream = null;
            }
        },

        /**
         * detected video devices
         */
        videoDevices: [],

        /**
         * sets up cameras
         */
        setUpCameras: function(){
            var me = this;

            if(navigator.mediaDevices){
                navigator.mediaDevices.enumerateDevices()
                    .then(
                        function(mediaDeviceInfo){
                            for(var i = 0; i < mediaDeviceInfo.length; i++){
                                if(mediaDeviceInfo[i].kind === 'videoinput'){
                                    me.videoDevices.push({
                                        deviceId: mediaDeviceInfo[i].deviceId
                                    });
                                }
                            }

                        }
                    ).then(function(){
                        me.finaliseCameraSetup();
                    }
                );
            }
            else if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
                me.finaliseCameraSetup();
            }
            else {
                //bollocks, this is an old iphone or other shitty device
                //will try to fallback for a bloody upload field. doh...
                this.setUpPlateScannerForShittyDevices();
            }
        },

        /**
         * whether or not should use a shitty device input / upload instead of html 5 camera...
         */
        useShittyDeviceInput: false,

        /**
         * performs a setup for shitty devices
         */
        setUpPlateScannerForShittyDevices: function(){
            this.useShittyDeviceInput = true;
        },

        /**
         * currenty selected video device
         */
        currentVideoDevice: null,

        /**
         * index of current video device
         */
        currentVideoDeviceIdx: 0,

        /**
         * whether or not cameras were detected
         */
        noCamerasDetected: false,

        /**
         * finalizes camera setup
         */
        finaliseCameraSetup: function(){
            if(this.videoDevices.length === 0){
                this.noCamerasDetected = true;
                return;
            }

            this.currentVideoDevice = this.videoDevices[this.videoDevices.length - 1]; //this should be the main rear camera
            this.currentVideoDeviceIdx = this.videoDevices.length - 1;
        },

        /**
         * video placeholder
         */
        videoEl: null,

        /**
         * swaps cameras
         */
        onSwapCamera: function(){
            var newIdx = 0;
            if(this.currentVideoDeviceIdx === 0){
                newIdx = 1;
            }
            this.currentVideoDeviceIdx = newIdx;
            this.currentVideoDevice = this.videoDevices[newIdx];

            this.resetVideoFeed();
            this.startVideoFeed();
        }
    });
}());
