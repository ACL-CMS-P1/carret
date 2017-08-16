const Router = require('express').Router;
const router = Router();
const User = require('../models/user');

router
    .get('/', (req, res, next) => {
        User.findById(req.user.id)
            .lean()
            .select('email name role status')
            .select('-_id')
            .then(user => {
                if(!user) return next({ code: 404});
                res.send(user);
            })
            .catch(next);
    })

    .patch('/', (req, res, next) => {
        User.findByIdAndUpdate(req.user.id,
            // you need to control what the user can update.
            // What if req.body.hash existed?
            // or req.body.role was set to "admin"!!!!
            { $set: req.body },
            {
                new: true,
                runValidators: true
            })
            // you're sending back too much user info!!!
            .then(user => res.send(user))
            .catch(next);
    })

    .delete('/', (req, res, next) => {
        User.findByIdAndRemove(req.user.id)
            .then(result => res.send({ removed: !!result }))
            .catch(next);
    });

module.exports = router;
