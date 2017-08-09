const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
// const ensureRole = require('../auth/ensure-role');
// const ensureAdmin = ensureRole('admin');

router
    .get('/users', (req, res, next) => {
        User.find({ role: 'user' })
            .lean()
            .select('name email role')
            .select('-_id')
            .then(users => res.send(users))
            .catch(next);
    });

module.exports = router;
