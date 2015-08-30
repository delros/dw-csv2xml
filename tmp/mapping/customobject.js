var customobject_Module_Factory = function () {
  var customobject = {
    name: 'customobject',
    defaultElementNamespaceURI: 'http:\/\/www.demandware.com\/xml\/impex\/customobject\/2006-10-31',
    typeInfos: [{
        localName: 'CustomObjects',
        typeName: null,
        propertyInfos: [{
            name: 'customObject',
            collection: true,
            elementName: 'custom-object',
            typeInfo: '.ComplexTypeCustomObject'
          }]
      }, {
        localName: 'ComplexTypeCustomObject',
        typeName: 'complexType.CustomObject',
        propertyInfos: [{
            name: 'objectAttribute',
            collection: true,
            elementName: 'object-attribute',
            typeInfo: '.SharedTypeCustomAttribute'
          }, {
            name: 'typeId',
            attributeName: {
              localPart: 'type-id'
            },
            type: 'attribute'
          }, {
            name: 'objectId',
            attributeName: {
              localPart: 'object-id'
            },
            type: 'attribute'
          }, {
            name: 'mode',
            attributeName: {
              localPart: 'mode'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SharedTypeCustomAttribute',
        typeName: 'sharedType.CustomAttribute',
        propertyInfos: [{
            name: 'content',
            collection: true,
            allowDom: false,
            elementName: 'value',
            type: 'elementRef'
          }, {
            name: 'attributeId',
            attributeName: {
              localPart: 'attribute-id'
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
        type: 'enumInfo',
        localName: 'SimpleTypeImportMode',
        values: ['delete']
      }],
    elementInfos: [{
        elementName: 'custom-object',
        typeInfo: '.ComplexTypeCustomObject'
      }, {
        elementName: 'custom-objects',
        typeInfo: '.CustomObjects'
      }, {
        elementName: 'value',
        scope: '.SharedTypeCustomAttribute'
      }]
  };
  return {
    customobject: customobject
  };
};
if (typeof define === 'function' && define.amd) {
  define([], customobject_Module_Factory);
}
else {
  var customobject_Module = customobject_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.customobject = customobject_Module.customobject;
  }
  else {
    var customobject = customobject_Module.customobject;
  }
}