(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 28-Jul-16.
     */
    Ext.define('mh.module.fileUpload.FileUploadController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-file-upload',

        requires: [
            'mh.module.fileUpload.FileUploadLocalisation'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.mixin.Localisation'
        ],

        files: null,

        /**
         * Called when the view is created
         */
        init: function() {

            this.callMeParent('init', arguments);
            this.injectLocalisationToViewModel();

            this.fileSelectId = 'fu_' + new Date().getTime();
            this.lookupReference('fileUploadHolder').setHtml(
                '<input type="file" id="' + this.fileSelectId + '" name="photos[]" multiple/>'
            );

            this.getView().on('hide', this.onHide, this);
        },

        onHide: function(){
            this.files = null;
        },

        /**
         * btn upload click
         */
        onBtnUploadClick: function(){
            document.getElementById(this.fileSelectId).click();
        },

        /**
         * On files drop callback
         * @param e
         */
        onFilesDrop: function(e){
            e.stopEvent();

            this.lookupReference('uploadInvitation').removeBodyCls('mh-upload-drag-over');
            this.files = Ext.Array.from(e.browserEvent.dataTransfer.files);

            //<debug>
            console.warn('files 2 upload', this.files);
            //</debug>
        },

        /**
         * Adds a drop indicator
         * @param e
         */
        addDropZone: function(e) {

            if (!e.browserEvent.dataTransfer || Ext.Array.from(e.browserEvent.dataTransfer.types).indexOf('Files') === -1) {
                return;
            }

            e.stopEvent();
            this.lookupReference('uploadInvitation').addBodyCls('mh-upload-drag-over');
        },

        /**
         * removes drop indicator
         * @param e
         */
        removeDropZone: function(e) {
            e.stopEvent();
            this.lookupReference('uploadInvitation').removeBodyCls('mh-upload-drag-over');
        },



        // postDocument: function(url, store, i) {
        //     var xhr = new XMLHttpRequest();
        //     var fd = new FormData();
        //     fd.append("serverTimeDiff", 0);
        //     xhr.open("POST", url, true);
        //     fd.append('index', i);
        //     fd.append('file', store.getData().getAt(i).data.file);
        //     //xhr.setRequestHeader("Content-Type","multipart/form-data");
        //     xhr.setRequestHeader("serverTimeDiff", 0);
        //     xhr.onreadystatechange = function() {
        //         if (xhr.readyState == 4 && xhr.status == 200) {
        //             //handle the answer, in order to detect any server side error
        //             if (Ext.decode(xhr.responseText).success) {
        //                 store.getData().getAt(i).data.status = "Uploaded";
        //             } else {
        //                 store.getData().getAt(i).data.status = "Error";
        //             }
        //             store.getData().getAt(i).commit();
        //         } else if (xhr.readyState == 4 && xhr.status == 404) {
        //             store.getData().getAt(i).data.status = "Error";
        //             store.getData().getAt(i).commit();
        //         }
        //     };
        //     // Initiate a multipart/form-data upload
        //     xhr.send(fd);
        // }
    });
}());