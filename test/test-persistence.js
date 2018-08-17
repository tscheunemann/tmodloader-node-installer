'use strict';

const chai = require('chai'),
    should = chai.should(),
	expect = chai.expect;

const _ = require('lodash');

const Persistence = require('../app/classes/HelperClasses/persistence.js');

class DemoModel extends Persistence {
    constructor(defaults) {
		super();

		let firstName = "";

		if (defaults) {
			firstName = (defaults.first_name) ? defaults.first_name : "";
		}

		this.addPersistentStringProperty("first_name", firstName);
    }
}

describe('Data Model Persistence', function() {
	it('should return empty string since no default and value not set', function() {
		let demoModel = new DemoModel();
		demoModel.getFirstName().should.equal("");
	});

	it('should return same value supplied at instantiation', function() {
		let value = "Jason";
		let demoModel = new DemoModel({
			"first_name": value
		});

		demoModel.getFirstName().should.equal(value);
	});

	it('should return same value supplied by setter', function() {
		let value = "Jason";
		let demoModel = new DemoModel();

		demoModel.setFirstName(value);

		demoModel.getFirstName().should.equal(value);
	});

	it('should return same value in callback after calling save', async (done) => {
		let value = "Jason";
		let demoModel = new DemoModel();

		demoModel.setFirstName(value);

		demoModel.addEventListener("onFirstNameSaved", (data) => {
			data.should.equal(value);
			done();
		});

		demoModel.saveFirstName();
	});

    it('should return same value in callback after calling save then retrieve', async (done) => {
		let value = "Jason";
		let demoModel = new DemoModel();

		demoModel.setFirstName(value);

        demoModel.addEventListener("onFirstNameRetrieved", (retrievedData) => {
            retrievedData.should.equal(value);
            done();
        });

		demoModel.addEventListener("onFirstNameSaved", (data) => {
			demoModel.retrieveFirstName();
		});

		demoModel.saveFirstName();
    });

    it('should throw an error since value has not been saved', async (done) => {
		let value = "Jason";
		let demoModel = new DemoModel();
		demoModel.setFirstName(value);

        expect(demoModel.retrieveFirstName).to.throw(Error);
        done();
    });
});
