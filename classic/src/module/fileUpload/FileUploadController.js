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

            //this.callMeParent('init', arguments);
            this.injectLocalisationToViewModel();

            this.fileSelectId = 'fu_' + new Date().getTime();
            this.lookupReference('fileUploadHolder').setHtml(
                '<input type="file" id="' + this.fileSelectId + '" name="photos[]" multiple/>'
            );

            this.getView().on('hide', this.onHide, this);

            this.lookupReference('btnChooseFiles').setText(this.getTranslation(this.getView().getMulti() ? 'chooseFilesBtnMulti' : 'chooseFilesBtn'));
            this.lookupReference('uploadDragHere').setValue(this.getTranslation(this.getView().getMulti() ? 'uploadDragHereMulti' : 'uploadDragHere'));
        },

        onHide: function(){
            this.files = null;
            this.resetFilesDisplay();
        },

        onBtnCancelClick: function(){
            this.getView().hide();
        },

        /**
         * the actual file upload element
         */
        fileUploadEl: null,

        /**
         * btn choose files click
         */
        onBtnChooseFilesClick: function(){
            if(!this.fileUploadEl){
                Ext.get(this.fileSelectId).on('change', this.onFilesPick, this);
                this.fileUploadEl = document.getElementById(this.fileSelectId);
            }
            this.resetFilesDisplay();
            this.fileUploadEl.click();
        },

        /**
         * On files drop callback
         * @param e
         */
        onFilesDrop: function(e){
            e.stopEvent();

            this.lookupReference('uploadInvitation').removeBodyCls('mh-upload-drag-over');

            this.processFiles(Ext.Array.from(e.browserEvent.dataTransfer.files));
        },

        /**
         * On files picked callback
         * @param e
         */
        onFilesPick: function(e){
            this.processFiles(Ext.Array.from(e.browserEvent.target.files));
        },

        processFiles: function(files){

            this.files = files;

            //<debug>
            console.warn('files 2 upload', this.files);
            //</debug>

            if(this.verifyUpload()){
                this.displayFiles();
            }
            else {
                this.resetFilesDisplay();
            }
        },


        /**
         * return true if files are ok and false otherwise; display any feedbac msgs as required
         * @template
         */
        verifyUpload: function(){
            return true;
        },

        /**
         * displays selected file info
         */
        displayFiles: function(){
            var sf = this.lookupReference('selectedFiles'),
                html = '<b>' +  this.getTranslation(this.files.length > 1 ? 'selectedFiles' : 'selectedFile') + '</b>';

            html += '<ul>'

            Ext.Array.each(this.files, function(f){
                html += '<li>' + f.name + '</li>'
            });

            html += '</ul>';

            sf.setHtml(html);

            sf.setHeight(this.lookupReference('uploadInvitation').getHeight() - (this.lookupReference('btnChooseFiles').getHeight() + 5));
        },

        resetFilesDisplay: function(){
            var sf = this.lookupReference('selectedFiles');
            sf.setHtml('');
            sf.setHeight(0);
            this.files = null;
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


        onBtnUploadClick: function(){

            if(!this.files || this.files.length === 0){
                return;
            }

            this.getView().mask(this.getTranslation('loadMask'))


            //more on xhr here: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/XMLHttpRequest


            var me = this,
                xhr = new XMLHttpRequest(),
                fd = new FormData(),
                uploadId = mh.utils.Generator.getUuid();

            xhr.open('POST', this.getView().getUploadUrl(), true); //true for async upload

            //append files
            Ext.Array.each(this.files, function(f){
                fd.append('files[]', f, f.name);
            });

            //customise the upload
            this.customiseUpload(xhr, fd);

            //watch the xhr object
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    me.getView().unmask();
                    me.onUploadSuccess(
                        Ext.JSON.decode(xhr.responseText, true) //true foe safe
                    );
                }
                else if (xhr.readyState == 4) {
                    me.getView().unmask();
                    me.onUploadFailure(
                        Ext.JSON.decode(xhr.responseText, true) //true foe safe
                    );
                }
            };

            //Initiate a multipart/form-data upload
            xhr.send(fd);

        },

        /**
         * customise the upload request here
         * for example:
         *
         * Files:
         * formData.append(name, file, filename);
         *
         * Blobs:
         * formData.append(name, blob, filename);
         *
         * Strings:
         * formData.append(name, value);
         *
         * xhr.setRequestHeader('Header-Key', 'HeaderValue')
         *
         * @template
         *
         * @param xhr
         * @param fd
         */
        customiseUpload: function(xhr, fd){

        },

        /**
         * file upload success handler
         * @template
         *
         * @param response
         */
        onUploadSuccess: function(response){
            //debug
            console.warn('UPLOAD SUCCESS', response);
            //</debug>
        },

        /**
         * file upload failure handler
         * @template
         *
         * @param response
         */
        onUploadFailure: function(response){
            //debug
            console.warn('UPLOAD FAILED', response);
            //</debug>
        }
    });
}());