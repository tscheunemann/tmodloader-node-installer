'use strict';

const Persistence = require('../HelperClasses/persistence.js');

class DemoModel extends Persistence {
    constructor(defaults) {
        super();

		let firstName = "";
		let lastName = "";

		if (defaults) {
			firstName = (defaults.first_name) ? defaults.first_name : "";
			lastName = (defaults.last_name) ? defaults.last_name : "";
		}

		this.addPersistentStringProperty("first_name", firstName);
		this.addPersistentStringProperty("last_name", lastName);
    }
}

module.exports = DemoModel;
