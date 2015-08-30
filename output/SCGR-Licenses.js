module.exports = function (data) {
	var result = {
				'customers' : {
					'customer' : []
				}
			}
		, customers = {};

	for (var i = 0, l = data.length; i < l; i++) {
		var item = data[i]
			, customerNo = item['SOLDTO_CUSTOMER']
			;

		if (!customers[customerNo]) {
			customers[customerNo] = [];
		}

		customers[customerNo].push({
			'cosmetologyLicenseNumber' : item['ZSD_LICENSES_ZNUMBER'],
			'expirationDate' : item['LICENSE_EXP_DATE'],
			'state' : item['LICENSE_STATE'],
			'licenseTypeId' : item['LICENSE_TYPE'],
			'licenseTypeDescription' : item['LICENSE_DESCR']
		});
	}

	for (var customerNo in customers) {
		result.customers.customer.push({
			'customerNo' : customerNo,
			'profile' : {
				'customAttributes' : {
					'customAttribute' : [{
						'attributeId' : 'cosmetologyLicense',
						'content' : [
							JSON.stringify(customers[customerNo], null, 2)
						]
					}]
				}
			}
		});
	}

	return result;
};