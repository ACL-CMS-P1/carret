const db = require('./helpers/db');
const request = require('./helpers/request');
const User = require('../../lib/models/user');
const tokenService = require('../../lib/auth/token-service');
const { assert } = require('chai');

describe('users api', () => {

    before(db.drop);

    const me = {
        name: 'logged in user',
        email: 'me@test.com',
        role: 'user',
        password: 'abc'
    };
    let token = null;

    before(() => {
        return request.post('/auth/signup')
            .send(me)
            .then(t => token = t.body.token);
    });

    it('GETs user\'s own account info', () => {
        return request.get('/me')
            .set('Authorization', token)
            .then(
                res => {
                    const myInfo = res.body;
                    delete me.password;
                    assert.deepEqual(myInfo, me);
                });
    });


});