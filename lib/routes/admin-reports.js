const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const Event = require('../models/event');
const EmailBlacklist = require('../models/email-blacklist');
const IpBlacklist = require('../models/ip-blacklist');

router

    .get('/events', (req, res, next) => {
        let query = {};
        if(req.query.type) query.type = req.query.type;
        if(req.query.level) query.level = req.query.level;

        Event.find(query)
            .select('name type level')
            .select('-_id')
            .then(events => res.send(events))
            .catch(next);

    });

//TODO: add more reports . . .

module.exports = router;
