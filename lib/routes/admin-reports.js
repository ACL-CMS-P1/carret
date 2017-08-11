const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const Event = require('../models/event');
const EmailBlacklist = require('../models/email-blacklist');
const IpBlacklist = require('../models/ip-blacklist');

router

    .get('/events', (req, res, next) => {
        let query = {};
        if(req.query.email) query.email = req.query.email;
        if(req.query.type) query.type = req.query.type;
        if(req.query.level) query.level = req.query.level;
        if(req.query.client_loc) query.client_loc = req.query.client_loc;
        if(req.query.risk_score) query.risk_score = req.query.risk_score;
        if(req.query.details) query.details = req.query.details;
        // if(req.query.createdAt) {
        //     let date = new Date(req.query.createdAt);
        //     query.createdAt = `{ createdAt: ISODate(${date}) }`;}
        if(req.query.user) query.user = req.query.user;

        Event.find(query)
            .select('-_id')
            .select('-__v')
            .select('-updatedAt')
            .select('-user')
            .then(events => res.send(events))
            .catch(next);

    });

//TODO: add more reports . . .

module.exports = router;
