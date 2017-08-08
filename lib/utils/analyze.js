const connection = require('mongoose').connection;
const Sqreen = require('../models/sqreen');
const Event = require('./event-handler');

const RISK_SCORE = 80;
const TERMINATE = 'terminate';
const VALIDATED = 'validated';


module.exports = {

    verifyEmail(email) {
        return sqreen.email(email)
            
            .then(payload => {

                if(payload.risk_score >= RISK_SCORE) {
                    return TERMINATE;
                } else {
                    return VALIDATED;
                }});
    },
    verifyIp(ip) {
        return sqreen.ip(ip)
            .then(payload => {

                if(payload.risk_score >= RISK_SCORE) {
                    return TERMINATE;
                } else { 
                    return VALIDATED;
                }    
            });
    }
};