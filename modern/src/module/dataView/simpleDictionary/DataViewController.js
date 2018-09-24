//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.simpleDictionary.DataViewController', {
        extend: 'mh.module.dataView.DataViewController',
        alias: 'controller.mh-simple-dictionary-data-view',

        requires: [
            'mh.module.dataView.simpleDictionary.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.util.console.Formatters'
        ],

        evtHdrStyle: '_s::,brown,',

        init: function(){

            var vw = this.getView(),
                model = vw.getModel(),
                singleRecViewTitle = vw.getSingleRecViewTitle(),
                navRoute;

            if(!model){
                throw {
                    msg: 'You need to specify a model for a simpleDictionary.DataView'
                }
            }
            //<debug>
            console.log('[SIMPLE DICT]' + this.evtHdrStyle, 'Initing dict for ' + model);
            //</debug>

            navRoute = Ext.ClassManager.get(model).getEntityNavigationUrlBase();

            //at this stage got a dictionary model, so can create a store and set it via view model

            this.getViewModel().setStores({
                gridstore: Ext.create('Ext.data.Store', {
                    model: model
                })
            });
            //rest of the binding should happen automatically via view model

            //add nav route as the view's instance property, so the composite view can review it and ensure view refreshes
            this.getView().navigationRoute = navRoute;

            //need to register aliases based on the models nav properties!
            //this way the record, create & edit views will become discoverable
            mh.util.AliasMapper.addAlias(navRoute + '-edit-view', mh.module.dataView.simpleDictionary.EditView.xtype);
            mh.util.AliasMapper.addAlias(navRoute + '-create-view', mh.module.dataView.simpleDictionary.EditView.xtype);

            mh.util.AliasMapper.addAlias(navRoute + '-record-view', mh.module.dataView.simpleDictionary.RecordView.xtype);


            //register xtra titles, so editor for each model can be customised
            if(singleRecViewTitle){
                mh.module.dataView.simpleDictionary.EditView.titles[navRoute] = singleRecViewTitle;
                mh.module.dataView.simpleDictionary.RecordView.titles[navRoute] = singleRecViewTitle;
            }

            //continue with init so all the stuff properly binds to customised components
            this.callMeParent(arguments);

        }
    });

}());