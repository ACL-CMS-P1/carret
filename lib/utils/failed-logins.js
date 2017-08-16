const IpBlacklist = require('../models/ip-blacklist');
const EmailBlacklist = require('../models/email-blacklist');
const User = require('../models/user');
const Event = require('../models/event');

module.exports = {

    addToIpBlacklist(payload) {
        return badIp.save(payload);
    },

    addToEmailBlacklist(payload) {
        return badEmail.save(payload);
    },

    lockUserAccount(email) {
        return User.findOneAndUpdate(
            (email),
            { $set: { status: 'locked' } },
            { new: true })
            .then(user => {
                const event = new Event({
                    email: user.email,
                    type: 'account locked',
                    user: user._id,
                    level: 'medium'
                });
                event.save();  
            });              
    }

    // where is unlock???
};
