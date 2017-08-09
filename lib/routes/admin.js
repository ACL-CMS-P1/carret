const Router = require('express').Router;
const router = Router();
const User = require('../models/user');

router
    .get('/users', (req, res, next) => {
        User.find({ role: 'user' })
            .lean()
            .select('name email role')
            .select('-_id')
            .then(users => res.send(users))
            .catch(next);
    })

    .get('/users/:email', (req, res, next) => {
        User.findOne({ email: req.params.email })
            .lean()
            .select('name email role')
            .select('-_id')
            .then(user => res.send(user))
            .catch(next);
    });

module.exports = router;
