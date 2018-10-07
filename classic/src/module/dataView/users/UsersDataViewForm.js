//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.UsersDataViewForm', {
        extend: 'Ext.container.Container',
    
        xtype: 'mh-desktop-users-data-view-form',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox',
        'mh.mixin.ApiMap',
        'mh.module.dataView.desktop.linksGrid'
    ],

    layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                layout: 'form',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        reference: 'email',
                        bind: {
                            fieldLabel: '{localization.email}',
                            value: '{rec.email}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'slug',
                        bind: {
                            fieldLabel: '{localization.slug}',
                            value: '{rec.slug}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'gravatarEmail',
                        bind: {
                            fieldLabel: '{localization.gravatarEmail}',
                            value: '{rec.gravatarEmail}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'forename',
                        bind: {
                            fieldLabel: '{localization.forename}',
                            value: '{rec.forename}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'surname',
                        bind: {
                            fieldLabel: '{localization.surname}',
                            value: '{rec.surname}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textarea',
                        reference: 'bio',
                        bind: {
                            fieldLabel: '{localization.bio}',
                            value: '{rec.bio}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'company',
                        bind: {
                            fieldLabel: '{localization.company}',
                            value: '{rec.company}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'department',
                        bind: {
                            fieldLabel: '{localization.department}',
                            value: '{rec.department}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isOrgUser',
                        bind: {
                            fieldLabel: '{localization.isOrgUser}',
                            value: '{rec.isOrgUser}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'visibleInCatalogue',
                        bind: {
                            fieldLabel: '{localization.visibleInCatalogue}',
                            value: '{rec.visibleInCatalogue}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isAccountClosed',
                        bind: {
                            fieldLabel: '{localization.isAccountClosed}',
                            value: '{rec.isAccountClosed}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isAccountVerified',
                        bind: {
                            fieldLabel: '{localization.isAccountVerified}',
                            value: '{rec.isAccountVerified}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'combo',
                        reference: 'organizationRole',
                        bind: {
                            fieldLabel: '{localization.orgRole}',
                            value: '{rec.organizationRole}',
                            store: '{orgRoles}'
                        },
                        valueField: 'id',
                        displayField: 'name',
                        editable: false,
                        triggerAction: 'all',
                        queryMode: 'local',
                        readOnly: true,
                        hidden: true
                    }
                ]
            }
        ]
    });

}());