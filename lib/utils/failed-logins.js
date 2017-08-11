const IpBlacklist = require('../models/ip-blacklist');
const EmailBlacklist = require('../models/email-blacklist');
const User = require('../models/user');

module.exports = {

    addToIpBlacklist(payload) {
        const badIp = new IpBlacklist(
            {
                ip: payload.ip,
                risk_score: payload.risk_score,
                is_known_attacker: payload.is_known_attacker,
                security_events_count: payload.security_events_count,
                high_risk_security_events_count: payload.high_risk_security_events_count,
                ip_geo: {
                    country_code: payload.ip_geo.country_code,
                    city: payload.ip_geo.city,
                    longitude: payload.ip_geo.longitude,
                    latitude: payload.ip_geo.latitude
                },
                is_datacenter: payload.is_datacenter,
                is_vpn: payload.is_vpn,
                is_proxy: payload.is_proxy,
                is_private: payload.is_private,
                is_tor: payload.is_tor,
                event_id: payload.event_id,
            });
        return badIp.save();
    },

    addToEmailBlacklist(payload) {
        const badEmail = new EmailBlacklist({
            email: payload.email,
            risk_score: payload.risk_score,
            is_known_attacker: payload.is_known_attacker,
            high_risk_security_events_count: payload.high_risk_security_events_count,
            security_events_count: payload.security_events_count,
            is_disposable: payload.is_disposable,
            is_email_malformed: payload.is_email_malformed,
            is_email_harmful: payload.is_email_harmful,
            event_id: payload.event_id,
        });
        return badEmail.save();
    },

    lockUserAccount(email) {
        return User.findOneAndUpdate(
            (email),
            { $set: { status: 'locked' } },
            { new: true })
            .then(res => console.log('RES IS:', res));
    }
};