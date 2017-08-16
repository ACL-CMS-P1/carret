const Router = require('express').Router;
const router = Router();
const Event = require('../models/event');

router

    .get('/events', (req, res, next) => {
        const query = {};
        const { email, type, level, client_loc, risk_score, details, user } = req.query;
        if(email) query.email = email;
        if(type) query.type = type;
        if(level) query.level = level;
        if(client_loc) query.client_loc = client_loc;
        if(risk_score) query.risk_score = risk_score;
        if(details) query.details = details;
        if(user) query.user = user;

        Event.find(query)
            .select('-_id')
            .select('-__v')
            .select('-updatedAt')
            .select('-user')
            .then(events => res.send(events))
            .catch(next);
    });

module.exports = router;
