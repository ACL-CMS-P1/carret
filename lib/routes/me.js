const Router = require('express').Router;
const router = Router();
const User = require('../models/user');

router
    
    .get('/users/:id', (req, res, next) => {
        User.findById(req.params.id)
            .then(user => res.send(user))
            .catch(next);
    });

module.exports = router;