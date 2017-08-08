const connection = require('mongoose').connection;
const sqreen = require('./sqreen');
const Event = require('./event-handler');

const RISK_SCORE = 80;
const TERMINATE = 'terminate';
const VALIDATED = 'validated';


module.exports = {

    verifyEmail(email) {
        return sqreen.sqreenEmail(email)
            
            .then(payload => {

                if(payload.risk_score >= RISK_SCORE) {
                    return TERMINATE;
                } else {
                    return VALIDATED;
                }});
    },
    verifyIp(ip) {
        return sqreen.sqreenIp(ip)
            .then(payload => {

                if(payload.risk_score >= RISK_SCORE) {
                    return TERMINATE;
                } else { 
                    return VALIDATED;
                }    
            });
    }
};