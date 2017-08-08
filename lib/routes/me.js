const Router = require('express').Router;
const router = Router();
const User = require('../models/user');

router
    // .post('/', (req, res, next) => {
    //     const { email, password, name, role } = req.body;

    //     const user = new User({ email, name, role });
    //     user.generateHash(password);
    //     return user.save();

    //     new User(req.body)
    //         .save()
    //         .then(user => res.send(user))
    //         .catch(next);
    // })
    .get('/', (req, res, next) => {
        User.findById(req.params.id)
            .lean()
            .then(user => {
                console.log('user is', user);
                res.send(user);
            })
            .catch(next);
    });

module.exports = router;