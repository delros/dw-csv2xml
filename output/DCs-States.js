module.exports = function (data) {
	var objects = [];

	for (var i = 0, l = data.length; i < l; i++) {
		var item = data[i]
			, stateID = item['State']
			, dcID = item['DC']
			;
		
		objects.push({
			'typeId' : 'BrandExclusion',
			'objectId' : stateID,
			'objectAttribute' : [{
				'attributeId' : 'distributionCenter',
				'content' : [ dcID ]
			}]
		});
	}

	return {
		'custom-objects' : {
			'customObject' : objects
		}
	};
};