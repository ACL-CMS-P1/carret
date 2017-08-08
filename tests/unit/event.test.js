
const User = require('../../lib/models/user');
const Event = require('../../lib/models/event');
const {assert} = require('chai');

describe('Event model', () => {

    it('new event passes validation with required fields', () => {
        const event = new Event({
            name: 'concurrent login',
            type: 'blocked login',
            level: 'high'
        });

        assert.equal(event.name, 'concurrent login');
        assert.equal(event.type, 'blocked login');
        assert.equal(event.level, 'high');
    });

    it('fails validation when missing required fields', () => {
        const event = new Event();

        return event.validate()
            .then(
                () => { throw new Error ('Expected validation error'); },
                ({ errors }) => {
                    assert.ok(errors.name);
                }
            );
    });

    it('fails validation with incorrect field type', () => {
        const event = new Event({
            name: {},
            type: {},
            level: {}
        });
        return event.validate()
            .then(
                () => { throw new Error('Expected validation error'); },
                ({ errors }) => {
                    assert.ok(errors.name);
                }
            );
    });
});