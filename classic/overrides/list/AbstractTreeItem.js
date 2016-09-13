//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
    * Created by info_000 on 13-Sep-16.
    */
    Ext.define('mh.overrides.list.AbstractTreeItem', {
        override: 'Ext.list.AbstractTreeItem',

        /**
         * dunno why in 6.2 me.getFloated is not a fn... and throws
         * @param node
         */
        nodeExpand: function(node) {
            var me = this,
                owner = me.getOwner(),
                floated = Ext.isFunction(me.getFloated) && me.getFloated(),
                animation = !floated && owner.getAnimation();
            me.nodeExpandBegin(animation);
            if (!animation) {
                me.nodeExpandEnd();
            }
        }
    });
}());