'use strict';

const StateMachine = require('javascript-state-machine');
const StateMachineHistory = require('javascript-state-machine/lib/history');

const chai = require('chai'),
    should = chai.should(),
	expect = chai.expect;

const _ = require('lodash');

describe('Data Model Persistence', () => {
    it('should return initial state', function() {
        let fsm = new StateMachine({
            init: 'solid',
            transitions: [
                { name: 'melt',     from: 'solid',  to: 'liquid' },
                { name: 'freeze',   from: 'liquid', to: 'solid'  },
                { name: 'vaporize', from: 'liquid', to: 'gas'    },
                { name: 'condense', from: 'gas',    to: 'liquid' }
            ]
        });

        fsm.state.should.equal('solid');
    });

    it('should step to second state', () => {
        let fsm = new StateMachine({
            init: 'solid',
            transitions: [
                { name: 'melt',     from: 'solid',  to: 'liquid' },
                { name: 'freeze',   from: 'liquid', to: 'solid'  },
                { name: 'vaporize', from: 'liquid', to: 'gas'    },
                { name: 'condense', from: 'gas',    to: 'liquid' }
            ]
        });

        fsm.melt();

        fsm.state.should.equal('liquid');
    });

    it('should throw an error by skipping second state', () => {
        let fsm = new StateMachine({
            init: 'solid',
            transitions: [
                { name: 'melt',     from: 'solid',  to: 'liquid' },
                { name: 'freeze',   from: 'liquid', to: 'solid'  },
                { name: 'vaporize', from: 'liquid', to: 'gas'    },
                { name: 'condense', from: 'gas',    to: 'liquid' }
            ]
        });

        expect(fsm.freeze).to.throw(Error);
    });

    it('should execute callback', async (done) => {
        let fsm = new StateMachine({
            init: 'solid',
            transitions: [
                { name: 'melt',     from: 'solid',  to: 'liquid' },
                { name: 'freeze',   from: 'liquid', to: 'solid'  },
                { name: 'vaporize', from: 'liquid', to: 'gas'    },
                { name: 'condense', from: 'gas',    to: 'liquid' }
            ],
            methods: {
                onMelt: () => {
                    return new Promise((resolve, reject) => {
                        resolve.should.be.a('function');
                        done();
                    });
                }
            }
        });

        fsm.melt();
    });

    it('should track history', function() {
        var fsm = new StateMachine({
            init: 'A',
            transitions: [
                { name: 'step', from: 'A', to: 'B' },
                { name: 'step', from: 'B', to: 'C' },
                { name: 'step', from: 'C', to: 'D' }
            ],
            plugins: [
                new StateMachineHistory()
            ]
        });

        fsm.step();
        fsm.step();

        _.isEqual(fsm.history, [ 'A', 'B', 'C' ]).should.equal(true);
    });

    it('should track history after stepping back', function() {
        var fsm = new StateMachine({
            init: 'A',
            transitions: [
                { name: 'step', from: 'A', to: 'B' },
                { name: 'step', from: 'B', to: 'C' },
                { name: 'step', from: 'C', to: 'D' }
            ],
            plugins: [
                new StateMachineHistory()
            ]
        });

        fsm.step();
        fsm.step();
        fsm.historyBack();

        _.isEqual(fsm.history, [ 'A', 'B' ]).should.equal(true);
    });
});
