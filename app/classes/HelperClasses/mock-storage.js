'use strict';

const _ = require('lodash');

class MockStorage {
	constructor() {
		this.properties = {};
	}

	set(key, json, options, callback) {
        if (_.isFunction(options)) {
            callback = options;
        }

		this.properties[key] = json;
		callback();
	}

	has(key, options, callback) {
        if (_.isFunction(options)) {
            callback = options;
        }

        if (key in this.properties) {
            callback (null, true);
        }
        else {
            callback(-1, null);
        }
	}

	get(key, options, callback) {
        if (_.isFunction(options)) {
            callback = options;
        }

        if (key in this.properties) {
            callback(null, this.properties[key]);
        }
        else {
            callback(-1, null);
        }
	}
}

module.exports = MockStorage;
