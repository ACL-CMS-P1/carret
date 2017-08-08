const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('event', () => {

    before(db.drop);

    const user = {
        email: 'hacker@hacker.com',
        password: 'abc',
        name: 'test hacker',
        role: 'user'
    };

    describe('management', () => {

        // const badRequest = (url, data, code, error) =>
        //     request
        //         .post(url)
        //         .send(data)
        //         .then(
        //             () => {
        //                 throw new Error('status should not be ok');
        //             },
        //             res => {
        //                 assert.equal(res.status, code);
        //                 assert.equal(res.response.body.error, error);
        //             }
        //         );
    });
});