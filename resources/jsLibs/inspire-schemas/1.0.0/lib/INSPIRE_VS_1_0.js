var INSPIRE_VS_1_0_Module_Factory = function () {
  var INSPIRE_VS_1_0 = {
    name: 'INSPIRE_VS_1_0',
    defaultElementNamespaceURI: 'http:\/\/www.opengis.net\/wms',
    typeInfos: [{
        localName: 'Exception',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            required: true,
            collection: true,
            elementName: 'Format'
          }]
      }, {
        localName: 'StyleSheetURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            required: true,
            elementName: 'Format'
          }, {
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'ResponsibleOrganisation.ResponsibleParty',
        typeName: null,
        propertyInfos: [{
            name: 'organisationName',
            required: true,
            elementName: {
              localPart: 'OrganisationName',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'emailAddress',
            required: true,
            elementName: {
              localPart: 'EmailAddress',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationBul',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_bul'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'OtherService',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'otherService'
        },
        baseTypeInfo: '.OtherServiceExt'
      }, {
        localName: 'Post',
        typeName: null,
        propertyInfos: [{
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'Get',
        typeName: null,
        propertyInfos: [{
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'DCPType',
        typeName: null,
        propertyInfos: [{
            name: 'http',
            required: true,
            elementName: 'HTTP',
            typeInfo: '.HTTP'
          }]
      }, {
        localName: 'DiscoveryServiceExt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'discoveryService_ext'
        },
        baseTypeInfo: '.InspireService'
      }, {
        localName: 'Layers.Layer.Styles.Style.StyleAbstract',
        typeName: null
      }, {
        localName: 'DownloadService',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'downloadService'
        },
        baseTypeInfo: '.DownloadServiceExt'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationCze',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_cze'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationPol',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_pol'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'Service',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: 'Name'
          }, {
            name: 'title',
            required: true,
            elementName: 'Title'
          }, {
            name: '_abstract',
            elementName: 'Abstract'
          }, {
            name: 'keywordList',
            elementName: 'KeywordList',
            typeInfo: '.KeywordList'
          }, {
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }, {
            name: 'contactInformation',
            elementName: 'ContactInformation',
            typeInfo: '.ContactInformation'
          }, {
            name: 'fees',
            elementName: 'Fees'
          }, {
            name: 'accessConstraints',
            elementName: 'AccessConstraints'
          }, {
            name: 'layerLimit',
            elementName: 'LayerLimit',
            typeInfo: 'PositiveInteger'
          }, {
            name: 'maxWidth',
            elementName: 'MaxWidth',
            typeInfo: 'PositiveInteger'
          }, {
            name: 'maxHeight',
            elementName: 'MaxHeight',
            typeInfo: 'PositiveInteger'
          }]
      }, {
        localName: 'Attribution',
        typeName: null,
        propertyInfos: [{
            name: 'title',
            elementName: 'Title'
          }, {
            name: 'onlineResource',
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }, {
            name: 'logoURL',
            elementName: 'LogoURL',
            typeInfo: '.LogoURL'
          }]
      }, {
        localName: 'Citation',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citation'
        },
        propertyInfos: [{
            name: 'title',
            required: true,
            elementName: {
              localPart: 'Title',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'dateOfPublication',
            required: true,
            elementName: {
              localPart: 'DateOfPublication',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'dateOfCreation',
            required: true,
            elementName: {
              localPart: 'DateOfCreation',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'dateOfLastRevision',
            required: true,
            elementName: {
              localPart: 'DateOfLastRevision',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'uri',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'URI',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'resourceLocator',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'ResourceLocator',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.ResourceLocatorType'
          }]
      }, {
        localName: 'InspireTheme',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme'
        },
        baseTypeInfo: '.InspireKeyword'
      }, {
        localName: 'InvokeService',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'invokeService'
        },
        baseTypeInfo: '.InvokeServiceExt'
      }, {
        localName: 'InspireThemeRum',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_rum'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'InspireThemeFre',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_fre'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationSlo',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_slo'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationHun',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_hun'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationRum',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_rum'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'Series',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'series'
        },
        baseTypeInfo: '.Data'
      }, {
        localName: 'InspireThemePol',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_pol'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'Layers.Layer.Styles.Style.LegendList.Legend.LegendFormat',
        typeName: null
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationLav',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_lav'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'InspireThemeSlv',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_slv'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'InspireThemeCze',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_cze'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationGre',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_gre'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'Simple',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'simple'
        },
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'type',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'href',
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'arcrole',
            attributeName: {
              localPart: 'arcrole',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'show',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'actuate',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'InspireThemeLit',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_lit'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'UniqueResourceIdentifier',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'uniqueResourceIdentifier'
        },
        propertyInfos: [{
            name: 'code',
            required: true,
            elementName: {
              localPart: 'Code',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'namespace',
            elementName: {
              localPart: 'Namespace',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'metadataURL',
            attributeName: {
              localPart: 'metadataURL'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Capability',
        typeName: null,
        propertyInfos: [{
            name: 'request',
            required: true,
            elementName: 'Request',
            typeInfo: '.Request'
          }, {
            name: 'exception',
            required: true,
            elementName: 'Exception',
            typeInfo: '.Exception'
          }, {
            name: 'extendedCapabilities',
            minOccurs: 0,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: '_ExtendedCapabilities',
            typeInfo: 'AnyType',
            type: 'elementRef'
          }, {
            name: 'layer',
            elementName: 'Layer',
            typeInfo: '.Layer'
          }]
      }, {
        localName: 'Dataset',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'dataset'
        },
        baseTypeInfo: '.Data'
      }, {
        localName: 'InspireThemeGle',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_gle'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationPor',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_por'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'InspireThemeDut',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_dut'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'Layers.Layer.Styles.Style.StyleURL',
        typeName: null
      }, {
        localName: 'ServiceExt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'service_ext'
        },
        baseTypeInfo: '.Resource',
        propertyInfos: [{
            name: 'coupledResource',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'CoupledResource',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.UniqueResourceIdentifier'
          }, {
            name: 'spatialDataServiceType',
            required: true,
            elementName: {
              localPart: 'SpatialDataServiceType',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'InspireThemeGre',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_gre'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'DownloadServiceExt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'downloadService_ext'
        },
        baseTypeInfo: '.InspireService'
      }, {
        localName: 'Layers.Layer',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: {
              localPart: 'Name',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'resourceTitle',
            required: true,
            elementName: {
              localPart: 'ResourceTitle',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'resourceAbstract',
            required: true,
            elementName: {
              localPart: 'ResourceAbstract',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'keyword',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Keyword',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.InspireKeyword'
          }, {
            name: 'geographicBoundingBox',
            required: true,
            collection: true,
            elementName: {
              localPart: 'GeographicBoundingBox',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.GeographicBoundingBox'
          }, {
            name: 'uniqueResourceIdentifier',
            required: true,
            collection: true,
            elementName: {
              localPart: 'UniqueResourceIdentifier',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.UniqueResourceIdentifier'
          }, {
            name: 'coordinateReferenceSystems',
            required: true,
            elementName: {
              localPart: 'CoordinateReferenceSystems',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.CoordinateReferenceSystems'
          }, {
            name: 'styles',
            required: true,
            elementName: {
              localPart: 'Styles',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.Styles'
          }, {
            name: 'layerName',
            attributeName: {
              localPart: 'layerName'
            },
            type: 'attribute'
          }, {
            name: 'queryable',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'queryable'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'InspireKeyword',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'keyword'
        },
        propertyInfos: [{
            name: 'originatingControlledVocabulary',
            elementName: {
              localPart: 'OriginatingControlledVocabulary',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.OriginatingControlledVocabulary'
          }, {
            name: 'keywordValue',
            required: true,
            elementName: {
              localPart: 'KeywordValue',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'TransformationService',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'transformationService'
        },
        baseTypeInfo: '.TransformationServiceExt'
      }, {
        localName: 'LanguageElementISO6392B',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'languageElementISO6392B'
        },
        baseTypeInfo: '.LanguageElement'
      }, {
        localName: 'CitationConformity',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationConformity'
        },
        baseTypeInfo: '.Citation'
      }, {
        localName: 'LogoURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            required: true,
            elementName: 'Format'
          }, {
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }, {
            name: 'width',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'width'
            },
            type: 'attribute'
          }, {
            name: 'height',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'height'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Layers.Layer.Styles.Style.LegendList.Legend',
        typeName: null,
        propertyInfos: [{
            name: 'legendFormat',
            required: true,
            elementName: {
              localPart: 'LegendFormat',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.Styles.Style.LegendList.Legend.LegendFormat'
          }, {
            name: 'legendHeight',
            required: true,
            elementName: {
              localPart: 'LegendHeight',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: 'Byte'
          }, {
            name: 'legendWidth',
            required: true,
            elementName: {
              localPart: 'LegendWidth',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: 'Byte'
          }, {
            name: 'legendURL',
            required: true,
            elementName: {
              localPart: 'LegendURL',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.Styles.Style.LegendList.Legend.LegendURL'
          }]
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationSpa',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_spa'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'CitationGEMETInspireThemesEng',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationGEMETInspireThemes_eng'
        },
        baseTypeInfo: '.Citation'
      }, {
        localName: 'MetadataPointOfContact',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'metadataPointOfContact'
        },
        propertyInfos: [{
            name: 'organisationName',
            required: true,
            elementName: {
              localPart: 'OrganisationName',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'emailAddress',
            required: true,
            elementName: {
              localPart: 'EmailAddress',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationFre',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_fre'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'DiscoveryService',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'discoveryService'
        },
        baseTypeInfo: '.DiscoveryServiceExt'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationCze',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_cze'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'Style',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: 'Name'
          }, {
            name: 'title',
            required: true,
            elementName: 'Title'
          }, {
            name: '_abstract',
            elementName: 'Abstract'
          }, {
            name: 'legendURL',
            minOccurs: 0,
            collection: true,
            elementName: 'LegendURL',
            typeInfo: '.LegendURL'
          }, {
            name: 'styleSheetURL',
            elementName: 'StyleSheetURL',
            typeInfo: '.StyleSheetURL'
          }, {
            name: 'styleURL',
            elementName: 'StyleURL',
            typeInfo: '.StyleURL'
          }]
      }, {
        localName: 'OtherServiceExt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'otherService_ext'
        },
        baseTypeInfo: '.InspireService'
      }, {
        localName: 'Layers.Layer.CoordinateReferenceSystems',
        typeName: null,
        propertyInfos: [{
            name: 'crs',
            required: true,
            collection: true,
            elementName: {
              localPart: 'CRS',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.CoordinateReferenceSystems.CRS'
          }]
      }, {
        localName: 'OperationType',
        propertyInfos: [{
            name: 'format',
            required: true,
            collection: true,
            elementName: 'Format'
          }, {
            name: 'dcpType',
            required: true,
            collection: true,
            elementName: 'DCPType',
            typeInfo: '.DCPType'
          }]
      }, {
        localName: 'WMSCapabilities',
        typeName: null,
        propertyInfos: [{
            name: 'service',
            required: true,
            elementName: 'Service',
            typeInfo: '.Service'
          }, {
            name: 'capability',
            required: true,
            elementName: 'Capability',
            typeInfo: '.Capability'
          }, {
            name: 'version',
            attributeName: {
              localPart: 'version'
            },
            type: 'attribute'
          }, {
            name: 'updateSequence',
            attributeName: {
              localPart: 'updateSequence'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'InspireService',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'service'
        },
        baseTypeInfo: '.ServiceExt'
      }, {
        localName: 'Layers.Layer.Styles.Style',
        typeName: null,
        propertyInfos: [{
            name: 'styleName',
            required: true,
            elementName: {
              localPart: 'StyleName',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'styleTitle',
            required: true,
            elementName: {
              localPart: 'StyleTitle',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'styleAbstract',
            required: true,
            elementName: {
              localPart: 'StyleAbstract',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.Styles.Style.StyleAbstract'
          }, {
            name: 'styleFormat',
            required: true,
            elementName: {
              localPart: 'StyleFormat',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.Styles.Style.StyleFormat'
          }, {
            name: 'styleURL',
            required: true,
            elementName: {
              localPart: 'StyleURL',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.Styles.Style.StyleURL'
          }, {
            name: 'legendList',
            required: true,
            elementName: {
              localPart: 'LegendList',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.Styles.Style.LegendList'
          }, {
            name: 'name',
            required: true,
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationGer',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_ger'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationDan',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_dan'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'InspireThemeEng',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_eng'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationFin',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_fin'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationGer',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_ger'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'Extended',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'extended'
        },
        propertyInfos: [{
            name: 'extendedModel',
            minOccurs: 0,
            collection: true,
            elementTypeInfos: [{
                elementName: {
                  localPart: 'title',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.TitleEltType'
              }, {
                elementName: {
                  localPart: 'resource',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.ResourceType'
              }, {
                elementName: {
                  localPart: 'locator',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.LocatorType'
              }, {
                elementName: {
                  localPart: 'arc',
                  namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
                },
                typeInfo: '.ArcType'
              }],
            type: 'elements'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationSlv',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_slv'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationSpa',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_spa'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'InspireThemeSwe',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_swe'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationBul',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_bul'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'Layers.Layer.Styles.Style.LegendList',
        typeName: null,
        propertyInfos: [{
            name: 'legend',
            required: true,
            elementName: {
              localPart: 'Legend',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.Styles.Style.LegendList.Legend'
          }]
      }, {
        localName: 'EXGeographicBoundingBox',
        typeName: null,
        propertyInfos: [{
            name: 'westBoundLongitude',
            required: true,
            typeInfo: 'Double'
          }, {
            name: 'eastBoundLongitude',
            required: true,
            typeInfo: 'Double'
          }, {
            name: 'southBoundLatitude',
            required: true,
            typeInfo: 'Double'
          }, {
            name: 'northBoundLatitude',
            required: true,
            typeInfo: 'Double'
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationLit',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_lit'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'Dimension',
        typeName: null,
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'name',
            required: true,
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }, {
            name: 'units',
            required: true,
            attributeName: {
              localPart: 'units'
            },
            type: 'attribute'
          }, {
            name: 'unitSymbol',
            attributeName: {
              localPart: 'unitSymbol'
            },
            type: 'attribute'
          }, {
            name: '_default',
            attributeName: {
              localPart: 'default'
            },
            type: 'attribute'
          }, {
            name: 'multipleValues',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'multipleValues'
            },
            type: 'attribute'
          }, {
            name: 'nearestValue',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'nearestValue'
            },
            type: 'attribute'
          }, {
            name: 'current',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'current'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ContactPersonPrimary',
        typeName: null,
        propertyInfos: [{
            name: 'contactPerson',
            required: true,
            elementName: 'ContactPerson'
          }, {
            name: 'contactOrganization',
            required: true,
            elementName: 'ContactOrganization'
          }]
      }, {
        localName: 'InspireThemeHun',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_hun'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'FeatureListURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            required: true,
            elementName: 'Format'
          }, {
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'InspireThemeDan',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_dan'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationIta',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_ita'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationDut',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_dut'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'ExtendedCapabilitiesType',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'ExtendedCapabilitiesType'
        },
        propertyInfos: [{
            name: 'content',
            required: true,
            minOccurs: 3,
            collection: true,
            mixed: false,
            allowDom: false,
            elementTypeInfos: [{
                elementName: {
                  localPart: 'SupportedLanguages',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                },
                typeInfo: '.SupportedLanguagesType'
              }, {
                elementName: {
                  localPart: 'TemporalReference',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                },
                typeInfo: '.TemporalReference'
              }, {
                elementName: {
                  localPart: 'Conformity',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                },
                typeInfo: '.Conformity'
              }, {
                elementName: {
                  localPart: 'Keyword',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                },
                typeInfo: '.InspireKeyword'
              }, {
                elementName: {
                  localPart: 'ResponseLanguage',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                },
                typeInfo: '.LanguageElementISO6392B'
              }, {
                elementName: {
                  localPart: 'ResourceLocator',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                },
                typeInfo: '.ResourceLocatorType'
              }, {
                elementName: {
                  localPart: 'MandatoryKeyword',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                },
                typeInfo: '.ClassificationOfSpatialDataService'
              }, {
                elementName: {
                  localPart: 'SpatialDataServiceType',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                }
              }, {
                elementName: {
                  localPart: 'MetadataPointOfContact',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                },
                typeInfo: '.MetadataPointOfContact'
              }, {
                elementName: {
                  localPart: 'MetadataUrl',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                },
                typeInfo: '.ResourceLocatorType'
              }, {
                elementName: {
                  localPart: 'MetadataDate',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                }
              }, {
                elementName: {
                  localPart: 'ResourceType',
                  namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
                }
              }],
            type: 'elementRefs'
          }]
      }, {
        localName: 'Layers.Layer.Styles.Style.LegendList.Legend.LegendURL',
        typeName: null
      }, {
        localName: 'TitleEltType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'titleEltType'
        },
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'lang',
            attributeName: {
              localPart: 'lang',
              namespaceURI: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'InspireThemeSlo',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_slo'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'Data',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'data'
        },
        baseTypeInfo: '.Resource',
        propertyInfos: [{
            name: 'uniqueResourceIdentifier',
            required: true,
            collection: true,
            elementName: {
              localPart: 'UniqueResourceIdentifier',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.UniqueResourceIdentifier'
          }, {
            name: 'resourceLanguage',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'ResourceLanguage',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'topicCategory',
            required: true,
            collection: true,
            elementName: {
              localPart: 'TopicCategory',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'lineage',
            required: true,
            elementName: {
              localPart: 'Lineage',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationSlo',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_slo'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'InspireThemeSpa',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_spa'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationRum',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_rum'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'AuthorityURL',
        typeName: null,
        propertyInfos: [{
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }, {
            name: 'name',
            required: true,
            typeInfo: 'NMToken',
            attributeName: {
              localPart: 'name'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ViewService',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'viewService'
        },
        baseTypeInfo: '.ViewServiceExt'
      }, {
        localName: 'ContactInformation',
        typeName: null,
        propertyInfos: [{
            name: 'contactPersonPrimary',
            elementName: 'ContactPersonPrimary',
            typeInfo: '.ContactPersonPrimary'
          }, {
            name: 'contactPosition',
            elementName: 'ContactPosition'
          }, {
            name: 'contactAddress',
            elementName: 'ContactAddress',
            typeInfo: '.ContactAddress'
          }, {
            name: 'contactVoiceTelephone',
            elementName: 'ContactVoiceTelephone'
          }, {
            name: 'contactFacsimileTelephone',
            elementName: 'ContactFacsimileTelephone'
          }, {
            name: 'contactElectronicMailAddress',
            elementName: 'ContactElectronicMailAddress'
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationLav',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_lav'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'TemporalExtent',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'temporalExtent'
        },
        propertyInfos: [{
            name: 'temporalExtentElement',
            required: true,
            collection: true,
            mixed: false,
            allowDom: false,
            elementName: {
              localPart: 'TemporalExtentElement',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: 'AnyType',
            type: 'elementRef'
          }]
      }, {
        localName: 'OriginatingControlledVocabularyMD',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'originatingControlledVocabularyMD'
        },
        baseTypeInfo: '.OriginatingControlledVocabulary'
      }, {
        localName: 'InspireThemeGer',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_ger'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'StyleURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            required: true,
            elementName: 'Format'
          }, {
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationMlt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_mlt'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'Layers',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'layers'
        },
        propertyInfos: [{
            name: 'layer',
            required: true,
            elementName: {
              localPart: 'Layer',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer'
          }]
      }, {
        localName: 'Keyword',
        typeName: null,
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'vocabulary',
            attributeName: {
              localPart: 'vocabulary'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationIta',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_ita'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationEng',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_eng'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'InspireThemeEst',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_est'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'Request',
        typeName: null,
        propertyInfos: [{
            name: 'getCapabilities',
            required: true,
            elementName: 'GetCapabilities',
            typeInfo: '.OperationType'
          }, {
            name: 'getMap',
            required: true,
            elementName: 'GetMap',
            typeInfo: '.OperationType'
          }, {
            name: 'getFeatureInfo',
            elementName: 'GetFeatureInfo',
            typeInfo: '.OperationType'
          }, {
            name: 'extendedOperation',
            minOccurs: 0,
            collection: true,
            elementName: '_ExtendedOperation',
            typeInfo: '.OperationType'
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationFin',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_fin'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'OnlineResource',
        typeName: null,
        propertyInfos: [{
            name: 'type',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'href',
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'arcrole',
            attributeName: {
              localPart: 'arcrole',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'show',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'actuate',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ResourceLocatorType',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resourceLocatorType'
        },
        propertyInfos: [{
            name: 'url',
            required: true,
            elementName: {
              localPart: 'URL',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'mediaType',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'MediaType',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'OriginatingControlledVocabularyGemetInspireThemes',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'originatingControlledVocabularyGemetInspireThemes'
        },
        baseTypeInfo: '.OriginatingControlledVocabulary'
      }, {
        localName: 'InvokeServiceExt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'invokeService_ext'
        },
        baseTypeInfo: '.InspireService'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationHun',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_hun'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'Layers.Layer.Styles.Style.StyleFormat',
        typeName: null
      }, {
        localName: 'Identifier',
        typeName: null,
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'authority',
            required: true,
            attributeName: {
              localPart: 'authority'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'InspireThemePor',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_por'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'ResourceType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'resourceType'
        },
        propertyInfos: [{
            name: 'content',
            collection: true,
            type: 'anyElement'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'label',
            typeInfo: 'NCName',
            attributeName: {
              localPart: 'label',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ViewServiceExt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'viewService_ext'
        },
        baseTypeInfo: '.InspireService',
        propertyInfos: [{
            name: 'layers',
            required: true,
            elementName: {
              localPart: 'Layers',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers'
          }]
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationEng',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_eng'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationPor',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_por'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'ContactAddress',
        typeName: null,
        propertyInfos: [{
            name: 'addressType',
            required: true,
            elementName: 'AddressType'
          }, {
            name: 'address',
            required: true,
            elementName: 'Address'
          }, {
            name: 'city',
            required: true,
            elementName: 'City'
          }, {
            name: 'stateOrProvince',
            required: true,
            elementName: 'StateOrProvince'
          }, {
            name: 'postCode',
            required: true,
            elementName: 'PostCode'
          }, {
            name: 'country',
            required: true,
            elementName: 'Country'
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationMlt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_mlt'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationGle',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_gle'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'LocatorType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'locatorType'
        },
        propertyInfos: [{
            name: 'locatorTitle',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            typeInfo: '.TitleEltType'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'href',
            required: true,
            attributeName: {
              localPart: 'href',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'role',
            attributeName: {
              localPart: 'role',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'label',
            typeInfo: 'NCName',
            attributeName: {
              localPart: 'label',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'BoundingBox',
        typeName: null,
        propertyInfos: [{
            name: 'crs',
            required: true,
            attributeName: {
              localPart: 'CRS'
            },
            type: 'attribute'
          }, {
            name: 'minx',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'minx'
            },
            type: 'attribute'
          }, {
            name: 'miny',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'miny'
            },
            type: 'attribute'
          }, {
            name: 'maxx',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'maxx'
            },
            type: 'attribute'
          }, {
            name: 'maxy',
            required: true,
            typeInfo: 'Double',
            attributeName: {
              localPart: 'maxy'
            },
            type: 'attribute'
          }, {
            name: 'resx',
            typeInfo: 'Double',
            attributeName: {
              localPart: 'resx'
            },
            type: 'attribute'
          }, {
            name: 'resy',
            typeInfo: 'Double',
            attributeName: {
              localPart: 'resy'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DataURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            required: true,
            elementName: 'Format'
          }, {
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }]
      }, {
        localName: 'ArcType',
        typeName: {
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink',
          localPart: 'arcType'
        },
        propertyInfos: [{
            name: 'locatorTitle',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            typeInfo: '.TitleEltType'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'Token',
            attributeName: {
              localPart: 'type',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'arcrole',
            attributeName: {
              localPart: 'arcrole',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'title',
            attributeName: {
              localPart: 'title',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'show',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'show',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'actuate',
            typeInfo: 'Token',
            attributeName: {
              localPart: 'actuate',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'from',
            typeInfo: 'NCName',
            attributeName: {
              localPart: 'from',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }, {
            name: 'to',
            typeInfo: 'NCName',
            attributeName: {
              localPart: 'to',
              namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationGle',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_gle'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationSwe',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_swe'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'Layers.Layer.CoordinateReferenceSystems.CRS',
        typeName: null,
        propertyInfos: [{
            name: 'crsName',
            required: true,
            elementName: {
              localPart: 'CRSName',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'crsLabel',
            required: true,
            elementName: {
              localPart: 'CRSLabel',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationEst',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_est'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'InspireThemeIta',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_ita'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'OriginatingControlledVocabulary',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'originatingControlledVocabulary'
        },
        baseTypeInfo: '.Citation'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationDut',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_dut'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationSwe',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_swe'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'ResponsibleOrganisation',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'responsibleOrganisation'
        },
        propertyInfos: [{
            name: 'responsibleParty',
            required: true,
            elementName: {
              localPart: 'ResponsibleParty',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.ResponsibleOrganisation.ResponsibleParty'
          }, {
            name: 'responsiblePartyRole',
            required: true,
            elementName: {
              localPart: 'ResponsiblePartyRole',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'TransformationServiceExt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'transformationService_ext'
        },
        baseTypeInfo: '.InspireService'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationFre',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_fre'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'InspireThemeFin',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_fin'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'LanguageElementIETF',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'languageElementIETF'
        },
        baseTypeInfo: '.LanguageElement'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationEst',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_est'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'ResLocGEMETInspireThemesEng',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocGEMETInspireThemes_eng'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'InspireThemeBul',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_bul'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationGre',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_gre'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'KeywordList',
        typeName: null,
        propertyInfos: [{
            name: 'keyword',
            minOccurs: 0,
            collection: true,
            elementName: 'Keyword',
            typeInfo: '.Keyword'
          }]
      }, {
        localName: 'IntervalOfDates',
        typeName: null,
        propertyInfos: [{
            name: 'startingDate',
            required: true,
            elementName: {
              localPart: 'StartingDate',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'endDate',
            required: true,
            elementName: {
              localPart: 'EndDate',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'Layer',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            elementName: 'Name'
          }, {
            name: 'title',
            required: true,
            elementName: 'Title'
          }, {
            name: '_abstract',
            elementName: 'Abstract'
          }, {
            name: 'keywordList',
            elementName: 'KeywordList',
            typeInfo: '.KeywordList'
          }, {
            name: 'crs',
            minOccurs: 0,
            collection: true,
            elementName: 'CRS'
          }, {
            name: 'exGeographicBoundingBox',
            elementName: 'EX_GeographicBoundingBox',
            typeInfo: '.EXGeographicBoundingBox'
          }, {
            name: 'boundingBox',
            minOccurs: 0,
            collection: true,
            elementName: 'BoundingBox',
            typeInfo: '.BoundingBox'
          }, {
            name: 'dimension',
            minOccurs: 0,
            collection: true,
            elementName: 'Dimension',
            typeInfo: '.Dimension'
          }, {
            name: 'attribution',
            elementName: 'Attribution',
            typeInfo: '.Attribution'
          }, {
            name: 'authorityURL',
            minOccurs: 0,
            collection: true,
            elementName: 'AuthorityURL',
            typeInfo: '.AuthorityURL'
          }, {
            name: 'identifier',
            minOccurs: 0,
            collection: true,
            elementName: 'Identifier',
            typeInfo: '.Identifier'
          }, {
            name: 'metadataURL',
            minOccurs: 0,
            collection: true,
            elementName: 'MetadataURL',
            typeInfo: '.MetadataURL'
          }, {
            name: 'dataURL',
            minOccurs: 0,
            collection: true,
            elementName: 'DataURL',
            typeInfo: '.DataURL'
          }, {
            name: 'featureListURL',
            minOccurs: 0,
            collection: true,
            elementName: 'FeatureListURL',
            typeInfo: '.FeatureListURL'
          }, {
            name: 'style',
            minOccurs: 0,
            collection: true,
            elementName: 'Style',
            typeInfo: '.Style'
          }, {
            name: 'minScaleDenominator',
            elementName: 'MinScaleDenominator',
            typeInfo: 'Double'
          }, {
            name: 'maxScaleDenominator',
            elementName: 'MaxScaleDenominator',
            typeInfo: 'Double'
          }, {
            name: 'layer',
            minOccurs: 0,
            collection: true,
            elementName: 'Layer',
            typeInfo: '.Layer'
          }, {
            name: 'queryable',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'queryable'
            },
            type: 'attribute'
          }, {
            name: 'cascaded',
            typeInfo: 'NonNegativeInteger',
            attributeName: {
              localPart: 'cascaded'
            },
            type: 'attribute'
          }, {
            name: 'opaque',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'opaque'
            },
            type: 'attribute'
          }, {
            name: 'noSubsets',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'noSubsets'
            },
            type: 'attribute'
          }, {
            name: 'fixedWidth',
            typeInfo: 'NonNegativeInteger',
            attributeName: {
              localPart: 'fixedWidth'
            },
            type: 'attribute'
          }, {
            name: 'fixedHeight',
            typeInfo: 'NonNegativeInteger',
            attributeName: {
              localPart: 'fixedHeight'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationSlv',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_slv'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'CitationInspireInteroperabilityRegulationPol',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_pol'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        localName: 'InspireThemeMlt',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_mlt'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'InspireThemeLav',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'inspireTheme_lav'
        },
        baseTypeInfo: '.InspireTheme'
      }, {
        localName: 'Conformity',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'conformity'
        },
        propertyInfos: [{
            name: 'specification',
            required: true,
            elementName: {
              localPart: 'Specification',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.CitationConformity'
          }, {
            name: 'degree',
            required: true,
            elementName: {
              localPart: 'Degree',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'ClassificationOfSpatialDataService',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'classificationOfSpatialDataService'
        },
        baseTypeInfo: '.InspireKeyword'
      }, {
        localName: 'ResLocInspireInteroperabilityRegulationLit',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resLocInspireInteroperabilityRegulation_lit'
        },
        baseTypeInfo: '.ResourceLocatorType'
      }, {
        localName: 'LegendURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            required: true,
            elementName: 'Format'
          }, {
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }, {
            name: 'width',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'width'
            },
            type: 'attribute'
          }, {
            name: 'height',
            typeInfo: 'PositiveInteger',
            attributeName: {
              localPart: 'height'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'GeographicBoundingBox',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'geographicBoundingBox'
        },
        propertyInfos: [{
            name: 'east',
            required: true,
            elementName: {
              localPart: 'East',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'west',
            required: true,
            elementName: {
              localPart: 'West',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'north',
            required: true,
            elementName: {
              localPart: 'North',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'south',
            required: true,
            elementName: {
              localPart: 'South',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'LanguageElement',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'languageElement'
        },
        propertyInfos: [{
            name: 'language',
            required: true,
            elementName: {
              localPart: 'Language',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }]
      }, {
        localName: 'HTTP',
        typeName: null,
        propertyInfos: [{
            name: 'get',
            required: true,
            elementName: 'Get',
            typeInfo: '.Get'
          }, {
            name: 'post',
            elementName: 'Post',
            typeInfo: '.Post'
          }]
      }, {
        localName: 'Resource',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'resource'
        },
        propertyInfos: [{
            name: 'resourceTitle',
            required: true,
            elementName: {
              localPart: 'ResourceTitle',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'resourceAbstract',
            required: true,
            elementName: {
              localPart: 'ResourceAbstract',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'resourceType',
            required: true,
            elementName: {
              localPart: 'ResourceType',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'resourceLocator',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'ResourceLocator',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.ResourceLocatorType'
          }, {
            name: 'mandatoryKeyword',
            required: true,
            collection: true,
            elementName: {
              localPart: 'MandatoryKeyword',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.InspireKeyword'
          }, {
            name: 'keyword',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Keyword',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.InspireKeyword'
          }, {
            name: 'geographicBoundingBox',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'GeographicBoundingBox',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.GeographicBoundingBox'
          }, {
            name: 'temporalReference',
            required: true,
            collection: true,
            elementName: {
              localPart: 'TemporalReference',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.TemporalReference'
          }, {
            name: 'spatialResolution',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'SpatialResolution',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.SpatialResolution'
          }, {
            name: 'conformity',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Conformity',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Conformity'
          }, {
            name: 'conditionsForAccessAndUse',
            required: true,
            collection: true,
            elementName: {
              localPart: 'ConditionsForAccessAndUse',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'limitationsOnPublicAccess',
            required: true,
            collection: true,
            elementName: {
              localPart: 'LimitationsOnPublicAccess',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'responsibleOrganisation',
            required: true,
            collection: true,
            elementName: {
              localPart: 'ResponsibleOrganisation',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.ResponsibleOrganisation'
          }, {
            name: 'metadataPointOfContact',
            required: true,
            collection: true,
            elementName: {
              localPart: 'MetadataPointOfContact',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.MetadataPointOfContact'
          }, {
            name: 'metadataDate',
            required: true,
            elementName: {
              localPart: 'MetadataDate',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'metadataLanguage',
            required: true,
            elementName: {
              localPart: 'MetadataLanguage',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'lang',
            attributeName: {
              localPart: 'lang',
              namespaceURI: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SpatialResolution',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'spatialResolution'
        },
        propertyInfos: [{
            name: 'equivalentScale',
            required: true,
            elementName: {
              localPart: 'EquivalentScale',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: 'Integer'
          }, {
            name: 'resolutionDistance',
            required: true,
            elementName: {
              localPart: 'ResolutionDistance',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: 'Integer'
          }, {
            name: 'unitOfMeasure',
            required: true,
            elementName: {
              localPart: 'UnitOfMeasure',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: '_abstract',
            attributeName: {
              localPart: 'abstract'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MetadataURL',
        typeName: null,
        propertyInfos: [{
            name: 'format',
            required: true,
            elementName: 'Format'
          }, {
            name: 'onlineResource',
            required: true,
            elementName: 'OnlineResource',
            typeInfo: '.OnlineResource'
          }, {
            name: 'type',
            required: true,
            typeInfo: 'NMToken',
            attributeName: {
              localPart: 'type'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Layers.Layer.Styles',
        typeName: null,
        propertyInfos: [{
            name: 'style',
            required: true,
            elementName: {
              localPart: 'Style',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.Layers.Layer.Styles.Style'
          }]
      }, {
        localName: 'SupportedLanguagesType',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'supportedLanguagesType'
        },
        propertyInfos: [{
            name: 'defaultLanguage',
            required: true,
            elementName: {
              localPart: 'DefaultLanguage',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.LanguageElementISO6392B'
          }, {
            name: 'supportedLanguage',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'SupportedLanguage',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.LanguageElementISO6392B'
          }]
      }, {
        localName: 'TemporalReference',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'temporalReference'
        },
        propertyInfos: [{
            name: 'dateOfCreation',
            elementName: {
              localPart: 'DateOfCreation',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'dateOfLastRevision',
            elementName: {
              localPart: 'DateOfLastRevision',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'dateOfPublication',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'DateOfPublication',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            }
          }, {
            name: 'temporalExtent',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'TemporalExtent',
              namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
            },
            typeInfo: '.TemporalExtent'
          }]
      }, {
        localName: 'CitationInspireInteroperabilityRegulationDan',
        typeName: {
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0',
          localPart: 'citationInspireInteroperabilityRegulation_dan'
        },
        baseTypeInfo: '.CitationConformity'
      }, {
        type: 'enumInfo',
        localName: 'ActuateType',
        baseTypeInfo: 'Token',
        values: ['onLoad', 'onRequest', 'other', 'none']
      }, {
        type: 'enumInfo',
        localName: 'LanguageISO6392B',
        values: ['aar', 'abk', 'ace', 'ach', 'ada', 'ady', 'afa', 'afh', 'afr', 'ain', 'aka', 'akk', 'alb', 'ale', 'alg', 'alt', 'amh', 'ang', 'anp', 'apa', 'ara', 'arc', 'arg', 'arm', 'arn', 'arp', 'art', 'arw', 'asm', 'ast', 'ath', 'aus', 'ava', 'ave', 'awa', 'aym', 'aze', 'bad', 'bai', 'bak', 'bal', 'bam', 'ban', 'baq', 'bas', 'bat', 'bej', 'bel', 'bem', 'ben', 'ber', 'bho', 'bih', 'bik', 'bin', 'bis', 'bla', 'bnt', 'bos', 'bra', 'bre', 'btk', 'bua', 'bug', 'bul', 'bur', 'byn', 'cad', 'cai', 'car', 'cat', 'cau', 'ceb', 'cel', 'cha', 'chb', 'che', 'chg', 'chi', 'chk', 'chm', 'chn', 'cho', 'chp', 'chr', 'chu', 'chv', 'chy', 'cmc', 'cop', 'cor', 'cos', 'cpe', 'cpf', 'cpp', 'cre', 'crh', 'crp', 'csb', 'cus', 'cze', 'dak', 'dan', 'dar', 'day', 'del', 'den', 'dgr', 'din', 'div', 'doi', 'dra', 'dsb', 'dua', 'dum', 'dut', 'dyu', 'dzo', 'efi', 'egy', 'eka', 'elx', 'eng', 'enm', 'epo', 'est', 'ewe', 'ewo', 'fan', 'fao', 'fat', 'fij', 'fil', 'fin', 'fiu', 'fon', 'fre', 'frm', 'fro', 'frr', 'frs', 'fry', 'ful', 'fur', 'gaa', 'gay', 'gba', 'gem', 'geo', 'ger', 'gez', 'gil', 'gla', 'gle', 'glg', 'glv', 'gmh', 'goh', 'gon', 'gor', 'got', 'grb', 'grc', 'gre', 'grn', 'gsw', 'guj', 'gwi', 'hai', 'hat', 'hau', 'haw', 'heb', 'her', 'hil', 'him', 'hin', 'hit', 'hmn', 'hmo', 'hrv', 'hsb', 'hun', 'hup', 'iba', 'ibo', 'ice', 'ido', 'iii', 'ijo', 'iku', 'ile', 'ilo', 'ina', 'inc', 'ind', 'ine', 'inh', 'ipk', 'ira', 'iro', 'ita', 'jav', 'jbo', 'jpn', 'jpr', 'jrb', 'kaa', 'kab', 'kac', 'kal', 'kam', 'kan', 'kar', 'kas', 'kau', 'kaw', 'kaz', 'kbd', 'kha', 'khi', 'khm', 'kho', 'kik', 'kin', 'kir', 'kmb', 'kok', 'kom', 'kon', 'kor', 'kos', 'kpe', 'krc', 'krl', 'kro', 'kru', 'kua', 'kum', 'kur', 'kut', 'lad', 'lah', 'lam', 'lao', 'lat', 'lav', 'lez', 'lim', 'lin', 'lit', 'lol', 'loz', 'ltz', 'lua', 'lub', 'lug', 'lui', 'lun', 'luo', 'lus', 'mac', 'mad', 'mag', 'mah', 'mai', 'mak', 'mal', 'man', 'mao', 'map', 'mar', 'mas', 'may', 'mdf', 'mdr', 'men', 'mga', 'mic', 'min', 'mis', 'mkh', 'mlg', 'mlt', 'mnc', 'mni', 'mno', 'moh', 'mon', 'mos', 'mul', 'mun', 'mus', 'mwl', 'mwr', 'myn', 'myv', 'nah', 'nai', 'nap', 'nau', 'nav', 'nbl', 'nde', 'ndo', 'nds', 'nep', 'new', 'nia', 'nic', 'niu', 'nno', 'nob', 'nog', 'non', 'nor', 'nqo', 'nso', 'nub', 'nwc', 'nya', 'nym', 'nyn', 'nyo', 'nzi', 'oci', 'oji', 'ori', 'orm', 'osa', 'oss', 'ota', 'oto', 'paa', 'pag', 'pal', 'pam', 'pan', 'pap', 'pau', 'peo', 'per', 'phi', 'phn', 'pli', 'pol', 'pon', 'por', 'pra', 'pro', 'pus', 'qaa-qtz', 'que', 'raj', 'rap', 'rar', 'roa', 'roh', 'rom', 'rum', 'run', 'rup', 'rus', 'sad', 'sag', 'sah', 'sai', 'sal', 'sam', 'san', 'sas', 'sat', 'scn', 'sco', 'sel', 'sem', 'sga', 'sgn', 'shn', 'sid', 'sin', 'sio', 'sit', 'sla', 'slo', 'slv', 'sma', 'sme', 'smi', 'smj', 'smn', 'smo', 'sms', 'sna', 'snd', 'snk', 'sog', 'som', 'son', 'sot', 'spa', 'srd', 'srn', 'srp', 'srr', 'ssa', 'ssw', 'suk', 'sun', 'sus', 'sux', 'swa', 'swe', 'syc', 'syr', 'tah', 'tai', 'tam', 'tat', 'tel', 'tem', 'ter', 'tet', 'tgk', 'tgl', 'tha', 'tib', 'tig', 'tir', 'tiv', 'tkl', 'tlh', 'tli', 'tmh', 'tog', 'ton', 'tpi', 'tsi', 'tsn', 'tso', 'tuk', 'tum', 'tup', 'tur', 'tut', 'tvl', 'twi', 'tyv', 'udm', 'uga', 'uig', 'ukr', 'umb', 'und', 'urd', 'uzb', 'vai', 'ven', 'vie', 'vol', 'vot', 'wak', 'wal', 'war', 'was', 'wel', 'wen', 'wln', 'wol', 'xal', 'xho', 'yao', 'yap', 'yid', 'yor', 'ypk', 'zap', 'zbl', 'zen', 'zha', 'znd', 'zul', 'zun', 'zxx', 'zza']
      }, {
        type: 'enumInfo',
        localName: 'ViewSpatialDataServiceType',
        values: ['view']
      }, {
        type: 'enumInfo',
        localName: 'ServiceSpatialDataResourceType',
        values: ['service']
      }, {
        type: 'enumInfo',
        localName: 'EuLanguageISO6392B',
        values: ['bul', 'cze', 'dan', 'dut', 'eng', 'est', 'fin', 'fre', 'ger', 'gre', 'hun', 'gle', 'ita', 'lav', 'lit', 'mlt', 'pol', 'por', 'rum', 'slo', 'slv', 'spa', 'swe']
      }, {
        type: 'enumInfo',
        localName: 'DiscoverySpatialDataServiceType',
        values: ['discovery']
      }, {
        type: 'enumInfo',
        localName: 'TypeType',
        baseTypeInfo: 'Token',
        values: ['simple', 'extended', 'title', 'resource', 'locator', 'arc']
      }, {
        type: 'enumInfo',
        localName: 'SpatialDataServiceType',
        values: ['discovery', 'view', 'download', 'transformation', 'invoke', 'other']
      }, {
        type: 'enumInfo',
        localName: 'MediaType',
        values: ['text\/plain', 'text\/html', 'text\/xml', 'application\/xml', 'application\/json', 'application\/pdf', 'application\/rdf+xml', 'application\/soap+xml', 'application\/vnd.eu.europa.ec.inspire.resource+xml', 'application\/vnd.google-earth.kml+xml', 'application\/vnd.google-earth.kml', 'application\/vnd.google-earth.kmx', 'application\/vnd.msword', 'application\/vnd.ms-excel', 'application\/vnd.ms-powerpoint', 'application\/vnd.oasis.opendocument.text', 'application\/vnd.oasis.opendocument.spreadsheet', 'application\/vnd.oasis.opendocument.presentation', 'application\/vnd.oasis.opendocument.graphics', 'application\/gml+xml', 'application\/vnd.ogc.wms_xml', 'application\/vnd.ogc.csw_xml', 'application\/vnd.ogc.csw.capabilities.response_xml', 'application\/vnd.ogc.csw.GetRecordByIdResponse_xml', 'application\/vnd.ogc.csw.GetRecordsResponse_xml', 'application\/vnd.ogc.wfs_xml', 'application\/vnd.ogc.se_xml', 'application\/vnd.iso.19139+xml']
      }, {
        type: 'enumInfo',
        localName: 'TopicCategory',
        values: ['farming', 'biota', 'boundaries', 'climatologyMeteorologyAtmosphere', 'economy', 'elevation', 'environment', 'geoscientificInformation', 'health', 'imageryBaseMapsEarthCover', 'intelligenceMilitary', 'inlandWaters', 'location', 'oceans', 'planningCadastre', 'society', 'structure', 'transportation', 'utilitiesCommunication']
      }, {
        type: 'enumInfo',
        localName: 'EuLanguageIETF',
        baseTypeInfo: 'Language',
        values: ['bg', 'bg-BG', 'cs', 'cs-CZ', 'da', 'da-DK', 'nl', 'nl-NL', 'en', 'en-GB', 'et', 'et-EE', 'fi', 'fi-FI', 'fr', 'fr-FR', 'de', 'de-DE', 'de-AT', 'el', 'el-GR', 'hu', 'hu-HU', 'ga', 'ga-IE', 'it', 'it-IT', 'lv', 'lv-LV', 'lt', 'lt-LT', 'mt', 'mt-MT', 'pl', 'pl-PL', 'pt', 'pt-PT', 'ro', 'ro-RO', 'sk', 'sk-SK', 'sl', 'sl-SI', 'es', 'es-ES', 'sv', 'sv-SE']
      }, {
        type: 'enumInfo',
        localName: 'DegreeOfConformity',
        values: ['conformant', 'notConformant', 'notEvaluated']
      }, {
        type: 'enumInfo',
        localName: 'OtherSpatialDataServiceType',
        values: ['other']
      }, {
        type: 'enumInfo',
        localName: 'ShowType',
        baseTypeInfo: 'Token',
        values: ['new', 'replace', 'embed', 'other', 'none']
      }, {
        type: 'enumInfo',
        localName: 'InvokeSpatialDataServiceType',
        values: ['invoke']
      }, {
        type: 'enumInfo',
        localName: 'ResourceType',
        values: ['dataset', 'series', 'service']
      }, {
        type: 'enumInfo',
        localName: 'ResponsiblePartyRole',
        values: ['resourceProvider', 'custodian', 'owner', 'user', 'distributor', 'originator', 'pointOfContact', 'principalInvestigator', 'processor', 'publisher', 'author']
      }, {
        type: 'enumInfo',
        localName: 'TransformationSpatialDataServiceType',
        values: ['transformation']
      }],
    elementInfos: [{
        elementName: 'Attribution',
        typeInfo: '.Attribution'
      }, {
        elementName: 'ContactInformation',
        typeInfo: '.ContactInformation'
      }, {
        elementName: {
          localPart: 'DiscoveryService',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.DiscoveryService'
      }, {
        elementName: {
          localPart: 'SpatialDataServiceType',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        }
      }, {
        elementName: 'GetCapabilities',
        typeInfo: '.OperationType'
      }, {
        elementName: {
          localPart: 'ViewService',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.ViewService'
      }, {
        elementName: 'AuthorityURL',
        typeInfo: '.AuthorityURL'
      }, {
        elementName: {
          localPart: 'MetadataDate',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: 'Service',
        typeInfo: '.Service'
      }, {
        elementName: 'Layer',
        typeInfo: '.Layer'
      }, {
        elementName: {
          localPart: 'ResourceLocator',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.ResourceLocatorType',
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: 'GetMap',
        typeInfo: '.OperationType'
      }, {
        elementName: 'StyleURL',
        typeInfo: '.StyleURL'
      }, {
        elementName: 'Format'
      }, {
        elementName: 'Get',
        typeInfo: '.Get'
      }, {
        elementName: 'MetadataURL',
        typeInfo: '.MetadataURL'
      }, {
        elementName: {
          localPart: 'ResourceType',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: 'Address'
      }, {
        elementName: 'MaxScaleDenominator',
        typeInfo: 'Double'
      }, {
        elementName: 'WMS_Capabilities',
        typeInfo: '.WMSCapabilities'
      }, {
        elementName: 'ContactAddress',
        typeInfo: '.ContactAddress'
      }, {
        elementName: {
          localPart: 'SupportedLanguages',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.SupportedLanguagesType',
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: {
          localPart: 'ExtendedCapabilities',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/inspire_vs\/1.0'
        },
        typeInfo: '.ExtendedCapabilitiesType',
        substitutionHead: '_ExtendedCapabilities'
      }, {
        elementName: 'StyleSheetURL',
        typeInfo: '.StyleSheetURL'
      }, {
        elementName: 'MaxWidth',
        typeInfo: 'PositiveInteger'
      }, {
        elementName: 'City'
      }, {
        elementName: {
          localPart: 'DownloadService',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.DownloadService'
      }, {
        elementName: 'AccessConstraints'
      }, {
        elementName: 'Post',
        typeInfo: '.Post'
      }, {
        elementName: 'ContactElectronicMailAddress'
      }, {
        elementName: {
          localPart: 'ResponseLanguage',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.LanguageElementISO6392B',
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: {
          localPart: 'MetadataPointOfContact',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.MetadataPointOfContact',
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: 'DCPType',
        typeInfo: '.DCPType'
      }, {
        elementName: {
          localPart: 'SpatialDataServiceType',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: {
          localPart: 'Keyword',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.InspireKeyword',
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: {
          localPart: 'arc',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        },
        typeInfo: '.ArcType'
      }, {
        elementName: 'BoundingBox',
        typeInfo: '.BoundingBox'
      }, {
        elementName: {
          localPart: 'IntervalOfDates',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.IntervalOfDates',
        substitutionHead: {
          localPart: 'TemporalExtentElement',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        }
      }, {
        elementName: 'ContactOrganization'
      }, {
        elementName: 'ContactPersonPrimary',
        typeInfo: '.ContactPersonPrimary'
      }, {
        elementName: 'ContactFacsimileTelephone'
      }, {
        elementName: 'Abstract'
      }, {
        elementName: 'Name'
      }, {
        elementName: 'MaxHeight',
        typeInfo: 'PositiveInteger'
      }, {
        elementName: '_ExtendedCapabilities',
        typeInfo: 'AnyType'
      }, {
        elementName: 'GetFeatureInfo',
        typeInfo: '.OperationType'
      }, {
        elementName: 'HTTP',
        typeInfo: '.HTTP'
      }, {
        elementName: {
          localPart: 'TemporalExtentElement',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: 'AnyType'
      }, {
        elementName: '_ExtendedOperation',
        typeInfo: '.OperationType'
      }, {
        elementName: 'CRS'
      }, {
        elementName: 'Keyword',
        typeInfo: '.Keyword'
      }, {
        elementName: 'Request',
        typeInfo: '.Request'
      }, {
        elementName: 'Dimension',
        typeInfo: '.Dimension'
      }, {
        elementName: {
          localPart: 'resource',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        },
        typeInfo: '.ResourceType'
      }, {
        elementName: 'KeywordList',
        typeInfo: '.KeywordList'
      }, {
        elementName: 'Exception',
        typeInfo: '.Exception'
      }, {
        elementName: {
          localPart: 'IndividualDate',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        substitutionHead: {
          localPart: 'TemporalExtentElement',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        }
      }, {
        elementName: 'AddressType'
      }, {
        elementName: 'Fees'
      }, {
        elementName: 'StateOrProvince'
      }, {
        elementName: 'MinScaleDenominator',
        typeInfo: 'Double'
      }, {
        elementName: 'Title'
      }, {
        elementName: 'ContactVoiceTelephone'
      }, {
        elementName: 'Identifier',
        typeInfo: '.Identifier'
      }, {
        elementName: 'LegendURL',
        typeInfo: '.LegendURL'
      }, {
        elementName: {
          localPart: 'title',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        },
        typeInfo: '.TitleEltType'
      }, {
        elementName: 'DataURL',
        typeInfo: '.DataURL'
      }, {
        elementName: 'LayerLimit',
        typeInfo: 'PositiveInteger'
      }, {
        elementName: {
          localPart: 'locator',
          namespaceURI: 'http:\/\/www.w3.org\/1999\/xlink'
        },
        typeInfo: '.LocatorType'
      }, {
        elementName: 'Capability',
        typeInfo: '.Capability'
      }, {
        elementName: {
          localPart: 'OtherService',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.OtherService'
      }, {
        elementName: {
          localPart: 'TransformationService',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.TransformationService'
      }, {
        elementName: {
          localPart: 'Conformity',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.Conformity',
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: 'FeatureListURL',
        typeInfo: '.FeatureListURL'
      }, {
        elementName: 'ContactPerson'
      }, {
        elementName: 'Style',
        typeInfo: '.Style'
      }, {
        elementName: {
          localPart: 'SpatialDataService',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.InspireService'
      }, {
        elementName: 'PostCode'
      }, {
        elementName: {
          localPart: 'SpatialDataSetSeries',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.Series'
      }, {
        elementName: 'EX_GeographicBoundingBox',
        typeInfo: '.EXGeographicBoundingBox'
      }, {
        elementName: {
          localPart: 'MandatoryKeyword',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.ClassificationOfSpatialDataService',
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: {
          localPart: 'TemporalReference',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.TemporalReference',
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: 'OnlineResource',
        typeInfo: '.OnlineResource'
      }, {
        elementName: {
          localPart: 'InvokeService',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.InvokeService'
      }, {
        elementName: {
          localPart: 'MetadataUrl',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.ResourceLocatorType',
        scope: '.ExtendedCapabilitiesType'
      }, {
        elementName: 'ContactPosition'
      }, {
        elementName: 'LogoURL',
        typeInfo: '.LogoURL'
      }, {
        elementName: {
          localPart: 'SpatialDataSet',
          namespaceURI: 'http:\/\/inspire.ec.europa.eu\/schemas\/common\/1.0'
        },
        typeInfo: '.Dataset'
      }, {
        elementName: 'Country'
      }]
  };
  return {
    INSPIRE_VS_1_0: INSPIRE_VS_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], INSPIRE_VS_1_0_Module_Factory);
}
else {
  var INSPIRE_VS_1_0_Module = INSPIRE_VS_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.INSPIRE_VS_1_0 = INSPIRE_VS_1_0_Module.INSPIRE_VS_1_0;
  }
  else {
    var INSPIRE_VS_1_0 = INSPIRE_VS_1_0_Module.INSPIRE_VS_1_0;
  }
}