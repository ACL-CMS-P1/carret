const sqreen = require('./sqreen');
const EmailBlacklist = require('../../lib/models/email-blacklist');
const User = require('../../lib/models/user');
const IpBlacklist = require('../../lib/models/ip-blacklist');
const failedLogins = require('./failed-logins');
const Event = require('../../lib/models/event');
const RISK_SCORE = 80;
const TERMINATE = 'terminate';
const VALIDATED = 'validated';

module.exports = {

    verifyUser(email, ip) {

        return Promise.all([
            User.isAcctLocked({ 'email': email }),
            EmailBlacklist.emailExists({ 'email': email }),
            IpBlacklist.ipExists({ 'ip': ip }),
            sqreen.sqreenEmail(email),
            sqreen.sqreenIp(ip),
        ])
            .then(([isLockedUser, blacklistedEmail, blacklistedIp, emailPayload, ipPayload]) => {
                function logEvent() {
                    const event = new Event({
                        email: emailPayload.email,
                        type: 'blocked login',
                        level: 'medium',
                        email_details: emailPayload,
                        ip_details: ipPayload
                    });
                    event.save();
                    if(!blacklistedEmail) failedLogins.addToEmailBlacklist(emailPayload);   
                    return TERMINATE;                    
                }

                if (isLockedUser) return TERMINATE;      
                if (blacklistedEmail || blacklistedIp) return logEvent();
                if (emailPayload.risk_score >= RISK_SCORE || ipPayload.risk_score >= RISK_SCORE) return logEvent();
                return VALIDATED;
            });
    }
};
