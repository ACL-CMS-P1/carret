const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const tokenService = require('../auth/token-service');
const ensureAuth = require('../auth/ensure-auth')();
const analyze = require('../utils/analyze');
const superagent = require('superagent');

function hasEmailAndPassword(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return next({
            code: 400,
            error: 'both email and password are required'
        });
    }
    next();
}

function analyzeVerify(email, ip) {
    return 'okay';
}

function checkUser(req, res, next) {
    return superagent
        .get('https://api.ipify.org?format=json')
        .then(res => analyzeVerify(req.body.email, res.body.ip))
        .then(result => {
            if (result === 'terminate') {
                return next({
                    code: 401,
                    error: 'Access Denied'
                });
            }
            next();
        });
}

router
    .get('/verify', ensureAuth, (req, res) => {
        res.send({ valid: true });
    })

    .post('/signup', hasEmailAndPassword, checkUser, (req, res, next) => {
        const { email, password, name, role, status } = req.body;

        delete req.body.password;

        User.exists({ email })
            .then(exists => {
                if (exists) {
                    throw next({
                        code: 400,
                        error: 'the email provided is already in use'
                    });
                }

                const user = new User({ email, name, role, status });
                user.generateHash(password);
                return user.save();
            })
            .then(user => tokenService.sign(user))
            .then(token => res.send({ token }))
            .catch(next);
    })

    .post('/signin', hasEmailAndPassword, checkUser, (req, res, next) => {
        const { email, password } = req.body;
        delete req.body.password;

        User.findOne({ email })
            .then(user => {
                if (!user || !user.comparePassword(password)) {
                    throw next({
                        code: 401,
                        error: 'Invalid Login'
                    });
                }
                return user;
            })
            .then(user => tokenService.sign(user))
            .then(token => res.send({ token }))
            .catch(next);
    });

module.exports = router;