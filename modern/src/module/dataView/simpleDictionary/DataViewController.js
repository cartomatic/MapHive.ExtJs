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
                recordView = vw.getRecordView(),
                recordViewClassDef = Ext.ClassManager.get(recordView),
                editView = vw.getEditView(),
                editViewClassDef = Ext.ClassManager.get(editView),
                model = vw.getModel(),
                singleRecViewTitle = vw.getSingleRecViewTitle(),
                iconCls = vw.getIconCls(),
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
                    model: model,
                    remoteSort: true,
                    remoteFilter: true
                })
            });
            //rest of the binding should happen automatically via view model

            //add nav route as the view's instance property, so the composite view can review it and ensure view refreshes
            this.getView().navigationRoute = navRoute;

            //need to register aliases based on the models nav properties!
            //this way the record, create & edit views will become discoverable
            mh.util.AliasMapper.addAlias(navRoute + '-edit-view', editViewClassDef.xtype);
            mh.util.AliasMapper.addAlias(navRoute + '-create-view', editViewClassDef.xtype);

            mh.util.AliasMapper.addAlias(navRoute + '-record-view', recordViewClassDef.xtype);


            //register xtra titles, so editor for each model can be customised
            if(singleRecViewTitle){
                editViewClassDef.titles[navRoute] = singleRecViewTitle;
                recordViewClassDef.titles[navRoute] = singleRecViewTitle;
            }

            if(iconCls){
                //just rec view, editors will use their defaults for create / edit actions
                recordViewClassDef.icons[navRoute] = iconCls;
            }

            //continue with init so all the stuff properly binds to customised components
            this.callMeParent(arguments);

        }
    });

}());