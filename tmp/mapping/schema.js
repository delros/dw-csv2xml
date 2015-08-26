var schema_Module_Factory = function () {
  var schema = {
    name: 'schema',
    defaultElementNamespaceURI: 'http:\/\/www.demandware.com\/xml\/impex\/customer\/2006-10-31',
    typeInfos: [{
        localName: 'ComplexTypeAddress',
        typeName: 'complexType.Address',
        propertyInfos: [{
            name: 'salutation'
          }, {
            name: 'title'
          }, {
            name: 'firstName',
            elementName: 'first-name'
          }, {
            name: 'secondName',
            elementName: 'second-name'
          }, {
            name: 'lastName',
            elementName: 'last-name'
          }, {
            name: 'suffix'
          }, {
            name: 'companyName',
            elementName: 'company-name'
          }, {
            name: 'jobTitle',
            elementName: 'job-title'
          }, {
            name: 'address1'
          }, {
            name: 'address2'
          }, {
            name: 'suite'
          }, {
            name: 'postbox'
          }, {
            name: 'city'
          }, {
            name: 'postalCode',
            elementName: 'postal-code'
          }, {
            name: 'stateCode',
            elementName: 'state-code'
          }, {
            name: 'countryCode',
            elementName: 'country-code'
          }, {
            name: 'phone'
          }, {
            name: 'customAttributes',
            elementName: 'custom-attributes',
            typeInfo: '.SharedTypeCustomAttributes'
          }, {
            name: 'addressId',
            attributeName: {
              localPart: 'address-id'
            },
            type: 'attribute'
          }, {
            name: 'preferred',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'preferred'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ComplexTypeProfile',
        typeName: 'complexType.Profile',
        propertyInfos: [{
            name: 'salutation'
          }, {
            name: 'title'
          }, {
            name: 'firstName',
            elementName: 'first-name'
          }, {
            name: 'secondName',
            elementName: 'second-name'
          }, {
            name: 'lastName',
            elementName: 'last-name'
          }, {
            name: 'suffix'
          }, {
            name: 'companyName',
            elementName: 'company-name'
          }, {
            name: 'jobTitle',
            elementName: 'job-title'
          }, {
            name: 'email'
          }, {
            name: 'phoneHome',
            elementName: 'phone-home'
          }, {
            name: 'phoneBusiness',
            elementName: 'phone-business'
          }, {
            name: 'phoneMobile',
            elementName: 'phone-mobile'
          }, {
            name: 'fax'
          }, {
            name: 'birthday',
            typeInfo: 'Calendar'
          }, {
            name: 'gender'
          }, {
            name: 'creationDate',
            elementName: 'creation-date',
            typeInfo: 'Calendar'
          }, {
            name: 'lastLoginTime',
            elementName: 'last-login-time',
            typeInfo: 'Calendar'
          }, {
            name: 'lastVisitTime',
            elementName: 'last-visit-time',
            typeInfo: 'Calendar'
          }, {
            name: 'preferredLocale',
            elementName: 'preferred-locale'
          }, {
            name: 'customAttributes',
            elementName: 'custom-attributes',
            typeInfo: '.SharedTypeCustomAttributes'
          }]
      }, {
        localName: 'Customers',
        typeName: null,
        propertyInfos: [{
            name: 'customer',
            collection: true,
            typeInfo: '.ComplexTypeCustomer'
          }, {
            name: 'groupAssignment',
            collection: true,
            elementName: 'group-assignment',
            typeInfo: '.ComplexTypeCustomerGroupAssignment'
          }]
      }, {
        localName: 'ComplexTypePassword',
        typeName: 'complexType.Password',
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'encrypted',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'encrypted'
            },
            type: 'attribute'
          }, {
            name: 'encryptionScheme',
            attributeName: {
              localPart: 'encryptionScheme'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ComplexTypeCredentials',
        typeName: 'complexType.Credentials',
        propertyInfos: [{
            name: 'login'
          }, {
            name: 'password',
            typeInfo: '.ComplexTypePassword'
          }, {
            name: 'enabledFlag',
            elementName: 'enabled-flag',
            typeInfo: 'Boolean'
          }, {
            name: 'passwordQuestion',
            elementName: 'password-question'
          }, {
            name: 'passwordAnswer',
            elementName: 'password-answer'
          }, {
            name: 'providerId',
            elementName: 'provider-id'
          }, {
            name: 'externalId',
            elementName: 'external-id'
          }]
      }, {
        localName: 'ComplexTypeAddresses',
        typeName: 'complexType.Addresses',
        propertyInfos: [{
            name: 'address',
            collection: true,
            typeInfo: '.ComplexTypeAddress'
          }]
      }, {
        localName: 'ComplexTypeCustomerGroupAssignment',
        typeName: 'complexType.CustomerGroupAssignment',
        propertyInfos: [{
            name: 'mode',
            attributeName: {
              localPart: 'mode'
            },
            type: 'attribute'
          }, {
            name: 'groupId',
            attributeName: {
              localPart: 'group-id'
            },
            type: 'attribute'
          }, {
            name: 'customerNo',
            attributeName: {
              localPart: 'customer-no'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ComplexTypeCustomer',
        typeName: 'complexType.Customer',
        propertyInfos: [{
            name: 'credentials',
            typeInfo: '.ComplexTypeCredentials'
          }, {
            name: 'profile',
            typeInfo: '.ComplexTypeProfile'
          }, {
            name: 'addresses',
            typeInfo: '.ComplexTypeAddresses'
          }, {
            name: 'customerGroups',
            elementName: 'customer-groups',
            typeInfo: '.ComplexTypeCustomerGroups'
          }, {
            name: 'note'
          }, {
            name: 'customerNo',
            attributeName: {
              localPart: 'customer-no'
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
        localName: 'SharedTypeCustomAttributes',
        typeName: 'sharedType.CustomAttributes',
        propertyInfos: [{
            name: 'customAttribute',
            collection: true,
            elementName: 'custom-attribute',
            typeInfo: '.SharedTypeCustomAttribute'
          }]
      }, {
        localName: 'ComplexTypeCustomerGroup',
        typeName: 'complexType.CustomerGroup',
        propertyInfos: [{
            name: 'groupId',
            attributeName: {
              localPart: 'group-id'
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
        localName: 'ComplexTypeCustomerGroups',
        typeName: 'complexType.CustomerGroups',
        propertyInfos: [{
            name: 'customerGroup',
            collection: true,
            elementName: 'customer-group',
            typeInfo: '.ComplexTypeCustomerGroup'
          }]
      }, {
        type: 'enumInfo',
        localName: 'SimpleTypeImportMode',
        values: ['delete']
      }, {
        type: 'enumInfo',
        localName: 'SimpleTypeEncryptionScheme',
        values: ['md5', 'scrypt']
      }],
    elementInfos: [{
        elementName: 'customers',
        typeInfo: '.Customers'
      }, {
        elementName: 'value',
        scope: '.SharedTypeCustomAttribute'
      }, {
        elementName: 'customer',
        typeInfo: '.ComplexTypeCustomer'
      }, {
        elementName: 'group-assignment',
        typeInfo: '.ComplexTypeCustomerGroupAssignment'
      }]
  };
  return {
    schema: schema
  };
};
if (typeof define === 'function' && define.amd) {
  define([], schema_Module_Factory);
}
else {
  var schema_Module = schema_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.schema = schema_Module.schema;
  }
  else {
    var schema = schema_Module.schema;
  }
}