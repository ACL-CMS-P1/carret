const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sqreen = require('../../lib/utils/sqreen');

describe.only('sqreen api', () => {

    it('sqreens an email and returns risk assessment with a valid email address', () => {
        const testEmail = 'christinelaguardia@gmail.com';

        return sqreen.sqreenEmail(testEmail)
            .then((res) => {
                assert.equal(res.email, testEmail);
                assert.exists(res.risk_score);
            });
    });

    it('/emails returns error with an invalid email address', () => {
        const testEmail = '#';

        return sqreen.sqreenEmail(testEmail)
            .then(() => {
                throw new Error('should have returned an error but did not');
            }, (res) => {
                assert.equal(res.status, 404);
                assert.equal(res.message, 'Not Found');
            });
    });

    // it('/ips returns risk assessment with valid ip address', () => {
    //     const testIp = '65.154.20.170';

    //     return request.get(`/sqreen/ips/${testIp}`)
    //         .then((res) => {
    //             assert.equal(res.body.status, 200);
    //             assert.equal(res.body.riskAssessment.ip, testIp);
    //             assert.exists(res.body.riskAssessment.risk_score);
    //         });
    // });

    // //QUESTION: not sure why this isn't passing :(
    // it.skip('/ips returns error with an invalid ip address', () => {
    //     const testIp = 'bad';

    //     return request.get(`/sqreen/ips/${testIp}`)
    //         .then(() => {
    //             throw new Error('should have returned an error but did not');
    //         }, (res) => {
    //             console.log(res);
    //             assert.equal(res.status, 400);
    //             assert.equal(res.message, 'Bad Request');
    //         });
    // });

});