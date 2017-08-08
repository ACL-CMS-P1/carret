const assert = require('chai').assert;
const Blacklist = require('../../lib/models/blacklist');
const Event = require('../../lib/models/event');

describe.only('blacklist model', () => {

    it('validates with required fields', () => {

        const blacklist = new Blacklist ({
            email: 'test@test.com',
            ip: '103.229.126.237',
            sqreen: JSON.stringify({
                'email': 'email@email.com',
                'risk_score': 80,
                'is_known_attacker': true,
                'high_risk_security_events_count': 0,
                'security_events_count': 20,
                'is_disposable': false,
                'is_email_malformed': false,
                'is_email_harmful': false
            }),
            event: '598a00ddc1cad74ed1914eba'
        });

        return blacklist.validate();

    });

    it('fails validation when fields are missing', () => {
        const blacklist = new Blacklist();

        return blacklist.validate()
            .then(
                () => { throw new Error('Expected validation error but did not get any'); },
                ({ errors }) => {
                    assert.ok(errors.email);
                    assert.ok(errors.ip);
                }
            );
    }); 

});
