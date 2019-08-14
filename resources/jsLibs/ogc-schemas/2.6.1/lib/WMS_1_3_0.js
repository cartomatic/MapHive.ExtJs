var WMS_1_3_0_Module_Factory = function () {
  var WMS_1_3_0 = {
    n: 'WMS_1_3_0',
    dens: 'http:\/\/www.opengis.net\/wms',
    deps: ['XLink_1_0'],
    tis: [{
        ln: 'Capability',
        tn: null,
        ps: [{
            n: 'request',
            rq: true,
            en: 'Request',
            ti: '.Request'
          }, {
            n: 'exception',
            rq: true,
            en: 'Exception',
            ti: '.Exception'
          }, {
            n: 'extendedCapabilities',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_ExtendedCapabilities',
            ti: 'AnyType',
            t: 'er'
          }, {
            n: 'layer',
            en: 'Layer',
            ti: '.Layer'
          }]
      }, {
        ln: 'Request',
        tn: null,
        ps: [{
            n: 'getCapabilities',
            rq: true,
            en: 'GetCapabilities',
            ti: '.OperationType'
          }, {
            n: 'getMap',
            rq: true,
            en: 'GetMap',
            ti: '.OperationType'
          }, {
            n: 'getFeatureInfo',
            en: 'GetFeatureInfo',
            ti: '.OperationType'
          }, {
            n: 'extendedOperation',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            en: '_ExtendedOperation',
            ti: '.OperationType',
            t: 'er'
          }]
      }, {
        ln: 'FeatureListURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'WMSCapabilities',
        tn: null,
        ps: [{
            n: 'service',
            rq: true,
            en: 'Service',
            ti: '.Service'
          }, {
            n: 'capability',
            rq: true,
            en: 'Capability',
            ti: '.Capability'
          }, {
            n: 'version',
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'updateSequence',
            an: {
              lp: 'updateSequence'
            },
            t: 'a'
          }]
      }, {
        ln: 'HTTP',
        tn: null,
        ps: [{
            n: 'get',
            rq: true,
            en: 'Get',
            ti: '.Get'
          }, {
            n: 'post',
            en: 'Post',
            ti: '.Post'
          }]
      }, {
        ln: 'Identifier',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'authority',
            rq: true,
            an: {
              lp: 'authority'
            },
            t: 'a'
          }]
      }, {
        ln: 'StyleSheetURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'Layer',
        tn: null,
        ps: [{
            n: 'name',
            en: 'Name'
          }, {
            n: 'title',
            rq: true,
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'keywordList',
            en: 'KeywordList',
            ti: '.KeywordList'
          }, {
            n: 'crs',
            mno: 0,
            col: true,
            en: 'CRS'
          }, {
            n: 'exGeographicBoundingBox',
            en: 'EX_GeographicBoundingBox',
            ti: '.EXGeographicBoundingBox'
          }, {
            n: 'boundingBox',
            mno: 0,
            col: true,
            en: 'BoundingBox',
            ti: '.BoundingBox'
          }, {
            n: 'dimension',
            mno: 0,
            col: true,
            en: 'Dimension',
            ti: '.Dimension'
          }, {
            n: 'attribution',
            en: 'Attribution',
            ti: '.Attribution'
          }, {
            n: 'authorityURL',
            mno: 0,
            col: true,
            en: 'AuthorityURL',
            ti: '.AuthorityURL'
          }, {
            n: 'identifier',
            mno: 0,
            col: true,
            en: 'Identifier',
            ti: '.Identifier'
          }, {
            n: 'metadataURL',
            mno: 0,
            col: true,
            en: 'MetadataURL',
            ti: '.MetadataURL'
          }, {
            n: 'dataURL',
            mno: 0,
            col: true,
            en: 'DataURL',
            ti: '.DataURL'
          }, {
            n: 'featureListURL',
            mno: 0,
            col: true,
            en: 'FeatureListURL',
            ti: '.FeatureListURL'
          }, {
            n: 'style',
            mno: 0,
            col: true,
            en: 'Style',
            ti: '.Style'
          }, {
            n: 'minScaleDenominator',
            en: 'MinScaleDenominator',
            ti: 'Double'
          }, {
            n: 'maxScaleDenominator',
            en: 'MaxScaleDenominator',
            ti: 'Double'
          }, {
            n: 'layer',
            mno: 0,
            col: true,
            en: 'Layer',
            ti: '.Layer'
          }, {
            n: 'queryable',
            ti: 'Boolean',
            an: {
              lp: 'queryable'
            },
            t: 'a'
          }, {
            n: 'cascaded',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'cascaded'
            },
            t: 'a'
          }, {
            n: 'opaque',
            ti: 'Boolean',
            an: {
              lp: 'opaque'
            },
            t: 'a'
          }, {
            n: 'noSubsets',
            ti: 'Boolean',
            an: {
              lp: 'noSubsets'
            },
            t: 'a'
          }, {
            n: 'fixedWidth',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'fixedWidth'
            },
            t: 'a'
          }, {
            n: 'fixedHeight',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'fixedHeight'
            },
            t: 'a'
          }]
      }, {
        ln: 'KeywordList',
        tn: null,
        ps: [{
            n: 'keyword',
            mno: 0,
            col: true,
            en: 'Keyword',
            ti: '.Keyword'
          }]
      }, {
        ln: 'Exception',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            col: true,
            en: 'Format'
          }]
      }, {
        ln: 'StyleURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'Get',
        tn: null,
        ps: [{
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'BoundingBox',
        tn: null,
        ps: [{
            n: 'crs',
            rq: true,
            an: {
              lp: 'CRS'
            },
            t: 'a'
          }, {
            n: 'minx',
            rq: true,
            ti: 'Double',
            an: {
              lp: 'minx'
            },
            t: 'a'
          }, {
            n: 'miny',
            rq: true,
            ti: 'Double',
            an: {
              lp: 'miny'
            },
            t: 'a'
          }, {
            n: 'maxx',
            rq: true,
            ti: 'Double',
            an: {
              lp: 'maxx'
            },
            t: 'a'
          }, {
            n: 'maxy',
            rq: true,
            ti: 'Double',
            an: {
              lp: 'maxy'
            },
            t: 'a'
          }, {
            n: 'resx',
            ti: 'Double',
            an: {
              lp: 'resx'
            },
            t: 'a'
          }, {
            n: 'resy',
            ti: 'Double',
            an: {
              lp: 'resy'
            },
            t: 'a'
          }]
      }, {
        ln: 'LogoURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'width',
            ti: 'PositiveInteger',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'height',
            ti: 'PositiveInteger',
            an: {
              lp: 'height'
            },
            t: 'a'
          }]
      }, {
        ln: 'Style',
        tn: null,
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name'
          }, {
            n: 'title',
            rq: true,
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'legendURL',
            mno: 0,
            col: true,
            en: 'LegendURL',
            ti: '.LegendURL'
          }, {
            n: 'styleSheetURL',
            en: 'StyleSheetURL',
            ti: '.StyleSheetURL'
          }, {
            n: 'styleURL',
            en: 'StyleURL',
            ti: '.StyleURL'
          }]
      }, {
        ln: 'MetadataURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'type',
            rq: true,
            ti: 'NMToken',
            an: {
              lp: 'type'
            },
            t: 'a'
          }]
      }, {
        ln: 'Keyword',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'vocabulary',
            an: {
              lp: 'vocabulary'
            },
            t: 'a'
          }]
      }, {
        ln: 'OperationType',
        ps: [{
            n: 'format',
            rq: true,
            col: true,
            en: 'Format'
          }, {
            n: 'dcpType',
            rq: true,
            col: true,
            en: 'DCPType',
            ti: '.DCPType'
          }]
      }, {
        ln: 'Attribution',
        tn: null,
        ps: [{
            n: 'title',
            en: 'Title'
          }, {
            n: 'onlineResource',
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'logoURL',
            en: 'LogoURL',
            ti: '.LogoURL'
          }]
      }, {
        ln: 'AuthorityURL',
        tn: null,
        ps: [{
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'name',
            rq: true,
            ti: 'NMToken',
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'DataURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'ContactInformation',
        tn: null,
        ps: [{
            n: 'contactPersonPrimary',
            en: 'ContactPersonPrimary',
            ti: '.ContactPersonPrimary'
          }, {
            n: 'contactPosition',
            en: 'ContactPosition'
          }, {
            n: 'contactAddress',
            en: 'ContactAddress',
            ti: '.ContactAddress'
          }, {
            n: 'contactVoiceTelephone',
            en: 'ContactVoiceTelephone'
          }, {
            n: 'contactFacsimileTelephone',
            en: 'ContactFacsimileTelephone'
          }, {
            n: 'contactElectronicMailAddress',
            en: 'ContactElectronicMailAddress'
          }]
      }, {
        ln: 'Post',
        tn: null,
        ps: [{
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }]
      }, {
        ln: 'DCPType',
        tn: null,
        ps: [{
            n: 'http',
            rq: true,
            en: 'HTTP',
            ti: '.HTTP'
          }]
      }, {
        ln: 'ContactAddress',
        tn: null,
        ps: [{
            n: 'addressType',
            rq: true,
            en: 'AddressType'
          }, {
            n: 'address',
            rq: true,
            en: 'Address'
          }, {
            n: 'city',
            rq: true,
            en: 'City'
          }, {
            n: 'stateOrProvince',
            rq: true,
            en: 'StateOrProvince'
          }, {
            n: 'postCode',
            rq: true,
            en: 'PostCode'
          }, {
            n: 'country',
            rq: true,
            en: 'Country'
          }]
      }, {
        ln: 'LegendURL',
        tn: null,
        ps: [{
            n: 'format',
            rq: true,
            en: 'Format'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'width',
            ti: 'PositiveInteger',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'height',
            ti: 'PositiveInteger',
            an: {
              lp: 'height'
            },
            t: 'a'
          }]
      }, {
        ln: 'Dimension',
        tn: null,
        ps: [{
            n: 'value',
            t: 'v'
          }, {
            n: 'name',
            rq: true,
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'units',
            rq: true,
            an: {
              lp: 'units'
            },
            t: 'a'
          }, {
            n: 'unitSymbol',
            an: {
              lp: 'unitSymbol'
            },
            t: 'a'
          }, {
            n: '_default',
            an: {
              lp: 'default'
            },
            t: 'a'
          }, {
            n: 'multipleValues',
            ti: 'Boolean',
            an: {
              lp: 'multipleValues'
            },
            t: 'a'
          }, {
            n: 'nearestValue',
            ti: 'Boolean',
            an: {
              lp: 'nearestValue'
            },
            t: 'a'
          }, {
            n: 'current',
            ti: 'Boolean',
            an: {
              lp: 'current'
            },
            t: 'a'
          }]
      }, {
        ln: 'EXGeographicBoundingBox',
        tn: null,
        ps: [{
            n: 'westBoundLongitude',
            rq: true,
            ti: 'Double'
          }, {
            n: 'eastBoundLongitude',
            rq: true,
            ti: 'Double'
          }, {
            n: 'southBoundLatitude',
            rq: true,
            ti: 'Double'
          }, {
            n: 'northBoundLatitude',
            rq: true,
            ti: 'Double'
          }]
      }, {
        ln: 'Service',
        tn: null,
        ps: [{
            n: 'name',
            rq: true,
            en: 'Name'
          }, {
            n: 'title',
            rq: true,
            en: 'Title'
          }, {
            n: '_abstract',
            en: 'Abstract'
          }, {
            n: 'keywordList',
            en: 'KeywordList',
            ti: '.KeywordList'
          }, {
            n: 'onlineResource',
            rq: true,
            en: 'OnlineResource',
            ti: '.OnlineResource'
          }, {
            n: 'contactInformation',
            en: 'ContactInformation',
            ti: '.ContactInformation'
          }, {
            n: 'fees',
            en: 'Fees'
          }, {
            n: 'accessConstraints',
            en: 'AccessConstraints'
          }, {
            n: 'layerLimit',
            en: 'LayerLimit',
            ti: 'PositiveInteger'
          }, {
            n: 'maxWidth',
            en: 'MaxWidth',
            ti: 'PositiveInteger'
          }, {
            n: 'maxHeight',
            en: 'MaxHeight',
            ti: 'PositiveInteger'
          }]
      }, {
        ln: 'OnlineResource',
        tn: null,
        ps: [{
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            an: {
              lp: 'type',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'href',
            an: {
              lp: 'href',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'role',
            an: {
              lp: 'role',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'arcrole',
            an: {
              lp: 'arcrole',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            an: {
              lp: 'show',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            an: {
              lp: 'actuate',
              ns: 'http:\/\/www.w3.org\/1999\/xlink'
            },
            t: 'a'
          }]
      }, {
        ln: 'ContactPersonPrimary',
        tn: null,
        ps: [{
            n: 'contactPerson',
            rq: true,
            en: 'ContactPerson'
          }, {
            n: 'contactOrganization',
            rq: true,
            en: 'ContactOrganization'
          }]
      }],
    eis: [{
        en: 'StateOrProvince'
      }, {
        en: 'OnlineResource',
        ti: '.OnlineResource'
      }, {
        en: '_ExtendedCapabilities',
        ti: 'AnyType'
      }, {
        en: 'WMS_Capabilities',
        ti: '.WMSCapabilities'
      }, {
        en: 'Keyword',
        ti: '.Keyword'
      }, {
        en: 'Layer',
        ti: '.Layer'
      }, {
        en: 'Exception',
        ti: '.Exception'
      }, {
        en: 'Attribution',
        ti: '.Attribution'
      }, {
        en: 'Post',
        ti: '.Post'
      }, {
        en: 'BoundingBox',
        ti: '.BoundingBox'
      }, {
        en: 'Fees'
      }, {
        en: 'Name'
      }, {
        en: 'Address'
      }, {
        en: 'MaxHeight',
        ti: 'PositiveInteger'
      }, {
        en: 'Country'
      }, {
        en: 'AccessConstraints'
      }, {
        en: 'StyleURL',
        ti: '.StyleURL'
      }, {
        en: 'LogoURL',
        ti: '.LogoURL'
      }, {
        en: 'Format'
      }, {
        en: 'DCPType',
        ti: '.DCPType'
      }, {
        en: 'PostCode'
      }, {
        en: 'LayerLimit',
        ti: 'PositiveInteger'
      }, {
        en: 'ContactVoiceTelephone'
      }, {
        en: '_ExtendedOperation',
        ti: '.OperationType'
      }, {
        en: 'OtherExtendedOperation',
        ti: '.OperationType',
        sh: '_ExtendedOperation'
      }, {
        en: 'Title'
      }, {
        en: 'ContactAddress',
        ti: '.ContactAddress'
      }, {
        en: 'Get',
        ti: '.Get'
      }, {
        en: 'ContactPersonPrimary',
        ti: '.ContactPersonPrimary'
      }, {
        en: 'FeatureListURL',
        ti: '.FeatureListURL'
      }, {
        en: 'CRS'
      }, {
        en: 'HTTP',
        ti: '.HTTP'
      }, {
        en: 'StyleSheetURL',
        ti: '.StyleSheetURL'
      }, {
        en: 'ContactPosition'
      }, {
        en: 'City'
      }, {
        en: 'OtherExtendedCapabilities',
        ti: 'AnyType',
        sh: '_ExtendedCapabilities'
      }, {
        en: 'AddressType'
      }, {
        en: 'DataURL',
        ti: '.DataURL'
      }, {
        en: 'Capability',
        ti: '.Capability'
      }, {
        en: 'AuthorityURL',
        ti: '.AuthorityURL'
      }, {
        en: 'GetCapabilities',
        ti: '.OperationType'
      }, {
        en: 'Abstract'
      }, {
        en: 'ContactFacsimileTelephone'
      }, {
        en: 'ContactElectronicMailAddress'
      }, {
        en: 'GetMap',
        ti: '.OperationType'
      }, {
        en: 'ContactPerson'
      }, {
        en: 'Service',
        ti: '.Service'
      }, {
        en: 'ContactOrganization'
      }, {
        en: 'MinScaleDenominator',
        ti: 'Double'
      }, {
        en: 'MaxWidth',
        ti: 'PositiveInteger'
      }, {
        en: 'Request',
        ti: '.Request'
      }, {
        en: 'Dimension',
        ti: '.Dimension'
      }, {
        en: 'Style',
        ti: '.Style'
      }, {
        en: 'LegendURL',
        ti: '.LegendURL'
      }, {
        en: 'ContactInformation',
        ti: '.ContactInformation'
      }, {
        en: 'KeywordList',
        ti: '.KeywordList'
      }, {
        en: 'Identifier',
        ti: '.Identifier'
      }, {
        en: 'MetadataURL',
        ti: '.MetadataURL'
      }, {
        en: 'MaxScaleDenominator',
        ti: 'Double'
      }, {
        en: 'GetFeatureInfo',
        ti: '.OperationType'
      }, {
        en: 'EX_GeographicBoundingBox',
        ti: '.EXGeographicBoundingBox'
      }]
  };
  return {
    WMS_1_3_0: WMS_1_3_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], WMS_1_3_0_Module_Factory);
}
else {
  var WMS_1_3_0_Module = WMS_1_3_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.WMS_1_3_0 = WMS_1_3_0_Module.WMS_1_3_0;
  }
  else {
    var WMS_1_3_0 = WMS_1_3_0_Module.WMS_1_3_0;
  }
}