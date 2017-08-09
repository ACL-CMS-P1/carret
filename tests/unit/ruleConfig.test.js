const ruleConfig = require('../../lib/models/ruleConfig');
const assert = require('chai').assert;

describe('Rule configuration unit tests', () => {
    it('validates with required fields', () => {
        const testConfig = new ruleConfig({
            name: 'rule1',
            status: 'on',
            description: 'This is a test rule configuration description.'
        });
        return testConfig.validate();
    });

    it('fails validation when required fields are missing', () => {
        const testConfig = new ruleConfig();

        return testConfig.validate()
            .then(() => { throw new Error('Expected validation error'); },
                ({ errors }) => assert.equal(errors.name.kind && errors.status.kind && errors.description.kind, 'required'));
    });

    it('fails validation if not enum type', () => {
        const testConfig = new ruleConfig({
            name: 'something else',
            status: 'something else',
            description: 'This is a test rule configuration description.'
        });

        return testConfig.validate()
            .then(() => { throw new Error('Expected validation error'); },
                ({ errors }) => assert.equal(errors.name.kind && errors.status.kind, 'enum'));
    });

    it('fails validation if description is over max length', () => {
        const testConfig = new ruleConfig({
            name: 'rule2',
            status: 'off',
            description: 'This is a really long test rule configuration description. This is a really long test rule configuration description. This is a really long test rule configuration description. This is a really long test rule configuration description. This is a really long test rule configuration description.'
        });

        return testConfig.validate()
            .then(() => { throw new Error('Expected validation error'); },
                ({ errors }) => assert.equal(errors.description.kind, 'maxlength'));
    });



});