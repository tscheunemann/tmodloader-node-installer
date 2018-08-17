'use strict';

const chai = require('chai'),
    should = chai.should(),
	expect = chai.expect;

const _ = require('lodash');

const Subscribe = require('../app/classes/HelperClasses/subscribe.js');

describe('Subscribe Helper Class', function() {
	it('should register a listener', function() {
		let subscribe = new Subscribe();

        let callback = () => {
            return true;
        };

        subscribe.addEventListener("onMock", callback);

        _.isEqual(subscribe._listeners, [ {event: 'onMock', funct: callback} ]).should.equal(true);
	});

    it('should register and then remove the same listener', function() {
        let subscribe = new Subscribe();

        let callback1 = () => {
            return 1;
        };

        let callback2 = () => {
            return 2;
        };

        let callback3 = () => {
            return 3;
        };

        subscribe.addEventListener("onMock1", callback1);
        subscribe.addEventListener("onMock2", callback2);
        subscribe.addEventListener("onMock3", callback3);

        subscribe.removeEventListener("onMock2", callback2);

        _.isEqual(subscribe._listeners, [ {event: 'onMock1', funct: callback1}, {event: 'onMock3', funct: callback3} ]).should.equal(true);
    });

    it('should not remove any listeners', function() {
        let subscribe = new Subscribe();

        let callback1 = () => {
            return 1;
        };

        let callback2 = () => {
            return 2;
        };

        let callback3 = () => {
            return 3;
        };

        subscribe.addEventListener("onMock1", callback1);
        subscribe.addEventListener("onMock2", callback2);
        subscribe.addEventListener("onMock3", callback3);

        subscribe.removeEventListener("onMock2", callback1);

        _.isEqual(subscribe._listeners, [ {event: 'onMock1', funct: callback1}, {event: 'onMock2', funct: callback2}, {event: 'onMock3', funct: callback3} ]).should.equal(true);
    });

    it('should trigger remaining callback', async (done) => {
        let subscribe = new Subscribe();
        let value = "subscribe-test";

        let callback1 = () => {
            return 1
        };

        let callback2 = (val) => {
            val.should.equal(value);
            done();
        };

        subscribe.addEventListener("onMock", callback1);
        subscribe.addEventListener("onMock", callback2);
        subscribe.removeEventListener("onMock", callback1);

        subscribe._notifyListeners("onMock", value);
    });

    it('should trigger a callback returning a string', async (done) => {
        let subscribe = new Subscribe();
        let value = "subscribe-test";

        let callback = (val) => {
            val.should.equal(value);
            done();
        };

        subscribe.addEventListener("onMock", callback);
        subscribe._notifyListeners("onMock", value);
    });

    it('should trigger a callback returning null', async (done) => {
        let subscribe = new Subscribe();
        let value = "subscribe-test";

        let callback = (val) => {
            should.not.exist(val);
            done();
        };

        subscribe.addEventListener("onMock", callback);
        subscribe._notifyListeners("onMock");
    });

    it('should trigger a callback returning an object', async (done) => {
        let subscribe = new Subscribe();
        let value = { a: "1"};

        let callback = (val) => {
            _.isEqual(val, value).should.equal(true);
            done();
        };

        subscribe.addEventListener("onMock", callback);
        subscribe._notifyListeners("onMock", value);
    });

    it('should trigger a callback returning a function', async (done) => {
        let subscribe = new Subscribe();
        let value = () => {
            return true;
        };

        let callback = (val) => {
            val.should.be.a('function');
            done();
        };

        subscribe.addEventListener("onMock", callback);
        subscribe.notifyListeners("onMock", value);
    });
});
