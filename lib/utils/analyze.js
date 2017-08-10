
const sqreen = require('./sqreen');
const EmailBlacklist = require('../../lib/models/email-blacklist');
const IpBlacklist = require('../../lib/models/ip-blacklist');
const RISK_SCORE = 80;
const TERMINATE = 'terminate';
const VALIDATED = 'validated';
const UNKNOWN = 'unknown';

let blacklistedEmail = null;
let blacklistedIp = null;
let emailPayload = null;
let ipPayload = null;

module.exports = {

    verifyUser(email, ip) {
        
        return Promise.all([

            EmailBlacklist.emailExists({ 'email': email })
                .then(result => {
                    blacklistedEmail = result;
                    return blacklistedEmail;
                }),

            IpBlacklist.ipExists({ 'ip': ip })
                .then(result => {
                    blacklistedIp = result;
                    return blacklistedIp;
                }),

            sqreen.sqreenEmail(email)
                .then(payload => {
                    emailPayload = payload;
                    return emailPayload;
                }),

            sqreen.sqreenIp(ip)
                .then(payload => {
                    ipPayload = payload;
                    return emailPayload;
                })
        ])
            .then(() => {

                if (blacklistedEmail === true || blacklistedIp === true) {
                    return TERMINATE;
                }
                else if (emailPayload.risk_score >= RISK_SCORE || ipPayload.risk_score >= RISK_SCORE) {
                    return TERMINATE;
                }
                else if (emailPayload.risk_score < RISK_SCORE && ipPayload.risk_score < RISK_SCORE) {
                    return VALIDATED;
                }
                else return UNKNOWN;
            });
    }
};

// .then(() => {
//     if(emailPayload)


// })




// verifyIp(ip => {
//     return sqreen.sqreenIp(ip)
//         .then(payload => {

//             if(payload.risk_score >= RISK_SCORE) {
//                 return TERMINATE;
//             } else { 
//                 return VALIDATED;
//             }});
// })



//     .then(emailPayload => {
//             if(emailPayload.risk_score >= RISK_SCORE) {
//                 return TERMINATE;
//             } else {
//                 return VALIDATED;
//             }});
//          }),