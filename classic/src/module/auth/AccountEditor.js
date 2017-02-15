(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Account editor is responsible for providing user account editing functionality
     * Created by domin on 15.02.2017.
     */
    Ext.define('mh.module.auth.AccountEditor', {
        extend: 'Ext.panel.Panel',
    
        xtype: 'mh-auth-account-editor',

    requires: [
        'mh.module.auth.AccountEditorController',
        'mh.module.auth.AccountEditorModel'
    ],

    controller: 'mh-auth-account-editor',
        viewModel: {
            type: 'mh-auth-account-editor'
        },

        minWidth: 450,

        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },

        items: [
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                padding: '0 10 0 10',
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        margin: '10 10 0 0',
                        items: [
                            {
                                xtype: 'image',
                                alt: 'profile-image',
                                bind: {
                                    glyph: '{profileGlyph}'
                                },
                                glyph: ' ',
                                flex: 1,
                                margin: '0 0 10 0'
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'x-li li-cross-circle',
                                        bind: {
                                            text: '{localisation.btnRemoveProfilePicture}'
                                        },
                                        flex: 1
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'x-li li-cloud-upload',
                                        bind: {
                                            text: '{localisation.btnUploadProfilePicture}'
                                        },
                                        flex: 1,
                                        margin: '0 0 0 10'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                vtype: 'email',
                                bind: {
                                    fieldLabel: '{localisation.email}',
                                    value: '{rec.email}'
                                },
                                labelAlign: 'top',
                                margin: 0
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    fieldLabel: '{localisation.slug}',
                                    value: '{rec.slug}'
                                },
                                labelAlign: 'top',
                                margin: 0
                            },
                            {
                                xtype: 'textfield',
                                vtype: 'email',
                                bind: {
                                    fieldLabel: '{localisation.gravatarEmail}',
                                    value: '{rec.gravatarEmail}'
                                },
                                labelAlign: 'top',
                                margin: 0
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'anchor',
                bodyPadding: 10,
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        margin: 0,
                        items: [
                            {
                                xtype: 'textfield',
                                bind: {
                                    fieldLabel: '{localisation.forename}',
                                    value: '{rec.forename}'
                                },
                                labelAlign: 'top',
                                margin: 0,
                                flex: 1
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    fieldLabel: '{localisation.surname}',
                                    value: '{rec.surname}'
                                },
                                labelAlign: 'top',
                                margin: '0 0 0 10',
                                flex: 1
                            }
                        ]
                    },
                    {
                        xtype: 'textarea',
                        bind: {
                            fieldLabel: '{localisation.bio}',
                            value: '{rec.bio}'
                        },
                        labelAlign: 'top',
                        margin: 0
                    },
                    {
                        xtype: 'textfield',
                        bind: {
                            fieldLabel: '{localisation.company}',
                            value: '{rec.company}'
                        },
                        labelAlign: 'top',
                        margin: 0
                    },
                    {
                        xtype: 'textfield',
                        bind: {
                            fieldLabel: '{localisation.department}',
                            value: '{rec.department}'
                        },
                        labelAlign: 'top',
                        margin: 0
                    },
                    {
                        xtype: 'textfield',
                        bind: {
                            fieldLabel: '{localisation.location}',
                            value: '{rec.location}'
                        },
                        labelAlign: 'top',
                        margin: 0
                    }
                ]
            }
        ]
    });
    
}());

    