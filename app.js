var fs = require('fs')
	, exec = require('child_process').exec
	, path = require('path')
	, jsonix = require('jsonix').Jsonix
	, csv = require('csv')
	, ee = new (require("events").EventEmitter)()
	, config = require('optimist').demand(['inputfile', 'schema']).argv
	, _started = new Date()
	, _basefile = config['handler'] || config['inputfile'].replace(path.extname(config['inputfile']), '')
	;

// CSV initial file read action 
ee.on('readCSV', function (data) {
	var transform = {};

	try {
		transform = require(_basefile + '.js');
	} catch (e) {}

	var options = transform['options'] || {}
		, callback = transform['callback'] || function (data) { 
			return data; 
		};

	console.info('CSV file reading...');
	
	fs.readFile(config['inputfile'], 'utf-8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		
		ee.emit('parseCSV', {
			'options' : options,
			'callback' : callback,
			'object' : data
		});
	});
});

// CSV parsing and control transmission
ee.on('parseCSV', function (data) {
	var object = data['object'] || ''
		, options = data['options'];

	console.info('CSV file parsing...');

	csv.parse(object, options['csv'], function (err, output) {
		if (err) {
			return console.log(err);
		}

		console.info('CSV handler execution...');

		ee.emit('preBuildXML', {
			'options' : options,
			'object' : data['callback'](output)
		});
	});	
});

// Validate if XSD mapping already exists or it should be generated
ee.on('preBuildXML', function (data) {
	var schemaName = path.basename(config['schema'], '.xsd')
		, schemaPath = './tmp/mapping/' + schemaName;

	console.info('XSD schema processing...');

	fs.exists(schemaPath + '.js', function (exists) { 
		if (exists) { 
			return ee.emit('buildXML', {
				'options' : data['options'],
				'object' : data['object'],
				'schema' : require(schemaPath)[schemaName]
			});
		} 

		exec('java -jar node_modules/jsonix/lib/jsonix-schema-compiler-full.jar -d tmp/mapping -p ' + schemaName + ' ' + config['schema'], function (error, stdout, stderr) { 
			require('sys').puts(stdout)
			ee.emit('buildXML', {
				'options' : data['options'],
				'object' : data['object'],
				'schema' : require(schemaPath)[schemaName]
			});
		});
	}); 
});

// XML document generation according to prepared XSD mapping
ee.on('buildXML', function (data) {
	var xsd = data['schema']
		, options = data['options'] || {}
		, context = new jsonix.Context([xsd], options['xml'])
		, marshaller = context.createMarshaller();

	console.info('XML file building...');

	ee.emit('writeXML', marshaller.marshalDocument(data['object']));
});

ee.on('writeXML', function (data) {
	console.info('XML file writing...');

	fs.writeFile(_basefile + '.xml', data, {
		'encoding' : 'utf8'
	}, function (err) {
		var execution = new Date() - _started;

		if (err) {
			return console.log(err);
		}

		console.info("Done. Execution time: %ds", execution/1000);
	});
});

ee.emit('readCSV');