var fs = require('fs')
	, exec = require('child_process').exec
	, path = require('path')
	, jsonix = require('jsonix').Jsonix
	, csv = require('csv')
	, ee = new (require("events").EventEmitter)()
	, config = require('optimist').demand(['inputfile', 'schema']).argv
	, _basefile = config['inputfile'].replace(path.extname(config['inputfile']), '')
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
			transform = require(_basefile + '.js');
		} catch (e) {}

		ee.emit('preBuildXML', transform(output));
	});	
});


// Validate if XSD mapping already exists or it should be generated
ee.on('preBuildXML', function (data) {
	var schemaName = path.basename(config['schema'], '.xsd')
		, schemaPath = './tmp/mapping/' + schemaName;

	fs.exists(schemaPath + '.js', function (exists) { 
		if (exists) { 
			return ee.emit('buildXML', {
				'object' : data,
				'schema' : require(schemaPath)[schemaName]
			});
		} 

		exec('java -jar node_modules/jsonix/lib/jsonix-schema-compiler-full.jar -d tmp/mapping -p ' + schemaName + ' ' + config['schema'], function (error, stdout, stderr) { 
			require('sys').puts(stdout)
			ee.emit('buildXML', {
				'object' : data,
				'schema' : require(schemaPath)[schemaName]
			});
		});
	}); 
});

// XML document generation according to prepared XSD mapping
ee.on('buildXML', function (data) {
	var xsd = data['schema']
		, context = new jsonix.Context([xsd], {
			namespacePrefixes : {
				'http://www.demandware.com/xml/impex/customobject/2006-10-31' : ''
			}
		})
		, marshaller = context.createMarshaller();

	ee.emit('writeXML', marshaller.marshalDocument(data['object']));
});

ee.on('writeXML', function (data) {
	fs.writeFile(_basefile + '.xml', data, {
		'encoding' : 'utf8'
	}, function (err) {
		if (err) {
			return console.log(err);
		}

		console.log('Done! Hakuna matata!');
	});
});