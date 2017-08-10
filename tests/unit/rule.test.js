const Rule = require('../../lib/models/rule');
const assert = require('chai').assert;

describe('Rule configuration unit tests', () => {
    it('validates with required fields', () => {
        const testRule = new Rule({
            name: 'rule1',
            active: true,
            description: 'This is a test rule configuration description.'
        });
        return testRule.validate();
    });

    it('fails validation when required fields are missing', () => {
        const testRule = new Rule();

        return testRule.validate()
            .then(() => { throw new Error('Expected validation error'); },
                ({ errors }) => assert.equal(errors.name.kind && errors.active.kind && errors.description.kind, 'required'));
    });

    it('fails validation if not enum type', () => {
        const testRule = new Rule({
            name: 'something else',
            active: true,
            description: 'This is a test rule configuration description.'
        });

        return testRule.validate()
            .then(() => { throw new Error('Expected validation error'); },
                ({ errors }) => assert.equal(errors.name.kind, 'enum'));
    });

    it('fails validation if description is over max length', () => {
        const testRule = new Rule({
            name: 'rule2',
            active: false,
            description: 'This is a really long test rule configuration description. This is a really long test rule configuration description. This is a really long test rule configuration description. This is a really long test rule configuration description. This is a really long test rule configuration description.'
        });

        return testRule.validate()
            .then(() => { throw new Error('Expected validation error'); },
                ({ errors }) => assert.equal(errors.description.kind, 'maxlength'));
    });
});