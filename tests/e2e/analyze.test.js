const db = require('./helpers/db');
// const request = require('./helpers/request');
const { assert } = require('chai');
// const sqreen = require('../../lib/utils/sqreen');
const analyze = require('../../lib/utils/analyze');


describe('analyze', () => {

    before(db.drop);



    describe('user analysis', () => {

        const goodUser = {
            email: 'frombypdx@live.com',
            ip: '65.154.20.170',
            name: 'good user'
        };

        const badUser = {
            email: 'test@test.com',
            ip: '188.166.218.212',
            name: 'bad user'
        };
       
        it('returns as validated for good email address', () => {
            return analyze.verifyEmail(goodUser.email)
                .then(res => {
                    assert.equal(res, 'validated');
                });
        });

        it('returns as validated for good ip address', () => {
            return analyze.verifyIp(goodUser.ip)
                .then(res => {
                    assert.equal(res, 'validated');
                });
        });

        it('returns terminate for bad email address', () => {
            return analyze.verifyEmail(badUser.email)
                .then(res => {
                    assert.equal(res, 'terminate');
                });
        });

        it('returns terminate for bad ip address', () => {
            return analyze.verifyIp(badUser.ip)
                .then(res => {
                    assert.equal(res, 'terminate');
                });
        });


    });
});