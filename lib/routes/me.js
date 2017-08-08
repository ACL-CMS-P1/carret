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
    })

    .patch('/', (req, res, next) => {
        User.findOneAndUpdate(req.params.email,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            })
            .then(user => res.send(user))
            .catch(next);

    });


module.exports = router;