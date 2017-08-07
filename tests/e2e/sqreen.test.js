const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

require('dotenv').config();
const key = process.env.SQREEN_API_KEY;

describe('sqreen api', () => {

    // {
    //     "email": "ChunkyLover53@aol.com",
    //     "risk_score": 80,
    //     "is_known_attacker": true,
    //     "high_risk_security_events_count": 3,
    //     "security_events_count": 15,
    //     "is_disposable": false,
    //     "is_email_malformed": false,
    //     "is_email_harmful": false
    // }

    it('/emails with a valid email address', () => {
        const testEmail = 'christinelaguardia@gmail.com';

        return request.get(`/sqreen/emails/${testEmail}`)
            .then((res) => {
                const status = res.body.status;
                const riskAssessment = JSON.parse(res.body.text);

                assert.equal(status, 200);
                assert.equal(riskAssessment.email, testEmail);
                assert.exists(riskAssessment.risk_score);
            });

    });

    it('/emails complains about an invalid email address', () => {
        const testEmail = '#';

        return request.get(`/sqreen/emails/${testEmail}`)
            .then(() => {
                throw new Error('should have gotten an error but did not');
            }, (res) => {
                assert.equal(res.status, 404);
                assert.equal(res.message, 'Not Found');
            });
    });


});