var fs = require('fs')
	, exec = require('child_process').exec
	, path = require('path')
	, builder = require('xmlbuilder')
	, jsonix = require('jsonix').Jsonix
	, csv = require('csv')
	, ee = new (require("events").EventEmitter)()
	, config = require('optimist').demand(['inputfile', 'schema']).argv
	;

// TODO:
// 1. Validate existense of inputfile and schema document
// 2. Get and validate CSV pre-processor callback
// 3. ... 

// CSV initial file read action 
fs.readFile(config['inputfile'], 'utf-8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	ee.emit('parseCSV', data);
});

// CSV parsing and control transmission
ee.on('parseCSV', function (data) {
	csv.parse(data, {
		'comment' : '#',
		'delimiter' : '|',
		'columns' : true
	}, function (err, output) {
		if (err) {
			return console.log(err);
		}

		var transform = function (data) { 
			return data; 
		};

		try {
			transform = require(config['inputfile'].replace(path.extname(config['inputfile']), '.js'));
		} catch (e) {}

		ee.emit('preBuildXML', transform(output));
	});	
});


// Validate if XSD mapping already exists or it should be generated
ee.on('preBuildXML', function (data) {
	fs.exists('./tmp/mapping/schema.js', function (exists) { 
		if (exists) { 
			return ee.emit('buildXML', {
				'object' : data,
				'schema' : require('./tmp/mapping/schema').schema
			});
		} 

		exec('java -jar node_modules/jsonix/lib/jsonix-schema-compiler-full.jar -d tmp/mapping -p schema ' + config['schema'], function puts(error, stdout, stderr) { 
			require('sys').puts(stdout)
			ee.emit('buildXML', {
				'object' : data,
				'schema' : require('./tmp/mapping/schema').schema
			});
		});
	}); 
});

// XML document generation according to prepared XSD mapping
ee.on('buildXML', function (data) {
	var xsd = data['schema']
		, context = new jsonix.Context([xsd], {
			namespacePrefixes : {
				'http://www.demandware.com/xml/impex/customer/2006-10-31' : ''
			}
		})
		, marshaller = context.createMarshaller();

	var doc = marshaller.marshalString(data['object']);

	console.log(require('pretty-data').pd.xml(doc));
});