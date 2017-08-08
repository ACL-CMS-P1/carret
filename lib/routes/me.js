const Router = require('express').Router;
const router = Router();
const User = require('../models/user');

router
    .get('/', (req, res, next) => {
        User.findOne(req.body.email)
            .lean()
            .select('email name role')
            .select('-_id')
            .then(user => res.send(user))
            .catch(next);
    });



module.exports = router;