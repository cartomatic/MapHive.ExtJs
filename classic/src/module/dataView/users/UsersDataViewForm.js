//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.UsersDataViewForm', {
        extend: 'Ext.container.Container',
    
        xtype: 'mh-users-data-view-form',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox',
        'mh.mixin.ApiMap',
        'mh.module.dataView.LinksGrid'
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
                            fieldLabel: '{localisation.email}',
                            value: '{rec.email}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'slug',
                        bind: {
                            fieldLabel: '{localisation.slug}',
                            value: '{rec.slug}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'gravatarEmail',
                        bind: {
                            fieldLabel: '{localisation.gravatarEmail}',
                            value: '{rec.gravatarEmail}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'forename',
                        bind: {
                            fieldLabel: '{localisation.forename}',
                            value: '{rec.forename}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'surname',
                        bind: {
                            fieldLabel: '{localisation.surname}',
                            value: '{rec.surname}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textarea',
                        reference: 'bio',
                        bind: {
                            fieldLabel: '{localisation.bio}',
                            value: '{rec.bio}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'company',
                        bind: {
                            fieldLabel: '{localisation.company}',
                            value: '{rec.company}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        reference: 'department',
                        bind: {
                            fieldLabel: '{localisation.department}',
                            value: '{rec.department}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isOrgUser',
                        bind: {
                            fieldLabel: '{localisation.isOrgUser}',
                            value: 'rec.isOrgUser'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'visibleInCatalogue',
                        bind: {
                            fieldLabel: '{localisation.visibleInCatalogue}',
                            value: 'rec.visibleInCatalogue'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isAccountClosed',
                        bind: {
                            fieldLabel: '{localisation.isAccountClosed}',
                            value: '{rec.isAccountClosed}'
                        },
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        reference: 'isAccountVerified',
                        bind: {
                            fieldLabel: '{localisation.isAccountVerified}',
                            value: '{rec.isAccountVerified}'
                        },
                        readOnly: true
                    }
                ]
            }
        ]
    });

}());