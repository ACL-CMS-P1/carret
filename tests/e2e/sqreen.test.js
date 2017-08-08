const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('sqreen api', () => {

    it('/emails returns risk assessment with a valid email address', () => {
        const testEmail = 'christinelaguardia@gmail.com';

        return request.get(`/sqreen/emails/${testEmail}`)
            .then((res) => {
                const riskAssessment = JSON.parse(res.body.text);
                assert.equal(res.status, 200);
                assert.equal(riskAssessment.email, testEmail);
                assert.exists(riskAssessment.risk_score);
            });
    });

    it('/emails returns error with an invalid email address', () => {
        const testEmail = '#';

        return request.get(`/sqreen/emails/${testEmail}`)
            .then(() => {
                throw new Error('should have returned an error but did not');
            }, (res) => {
                assert.equal(res.status, 404);
                assert.equal(res.message, 'Not Found');
            });
    });

    it('/ips returns risk assessment with valid ip address', () => {
        const testIp = '65.154.20.170';

        return request.get(`/sqreen/ips/${testIp}`)
            .then((res) => {
                const riskAssessment = JSON.parse(res.body.text);
                assert.equal(res.status, 200);
                assert.equal(riskAssessment.ip, testIp);
                assert.exists(riskAssessment.risk_score);
            });
    });

        
    it.skip('/ips returns error with an invalid ip address', () => {
        const testIp = 'bad';

        return request.get(`/sqreen/ips/${testIp}`)
            .then(() => {
                throw new Error('should have returned an error but did not');
            }, (res) => {
                assert.equal(res.status, 400);
                assert.equal(res.message, 'Bad Request');
            });
    });

});