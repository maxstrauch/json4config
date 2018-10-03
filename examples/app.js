const cfg = require('../src/index'); // <-- This is replaced with require('config-json');

// By default the configuration is loaded for environment 'dev'
let theConfiguration = cfg('./config.json');

console.log(theConfiguration.get('mailing.host'));
console.log(theConfiguration.get('mailing.port', 25)); // <-- Default fallback value

// For prodcution, the right environment might be set
theConfiguration = cfg('./config.json', 'prod');

console.log(theConfiguration.get('mailing.host'));
console.log(theConfiguration.get('mailing.port', 25));

// If e.g. the application runs on a different server, the server domain might
// be used as a locale
theConfiguration = cfg('./config.json', 'app.mydomain.tld');

console.log(theConfiguration.get('mailing.host'));
console.log(theConfiguration.get('mailing.port', 25));