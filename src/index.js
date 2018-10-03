/*!
 * config.json
 * Copyright(c) 2018 Maximilian Strauch
 * MIT Licensed
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	console.error("A browser version of config.json is currently not supported but might come in the future!");
} else {
	module.exports = require('./node.js');
}
