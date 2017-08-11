const db = require('./helpers/db');
const { assert } = require('chai');
const User = require('../../lib/models/user');
const Event = require('../../lib/models/event');
// const ObjectId = require('mongoose').Types.ObjectId;

describe('event logging', () => {

    let user = {
        name: 'user1',
        email: 'one@user.com',
        password: 'password1',
        role: 'user',
        status: 'active'
    };

    before(db.drop);
    
    before(() => {
        return db.signup(user)
            .then(() => db.signin(user));
            // .then(() => User.find({ email: user.email }))
            // .then(found => user = found);
    });

    it('saves an event on sign up', () => {

        return Event.findOne({ type: 'signup' })
            .then(event => {
                // assert.equal(event.user, user._id;
                assert.equal(event.email, user.email);
                assert.equal(event.type, 'signup');
            });
    
    });

    it('saves an event on sign in', () => {

        return Event.findOne({ type: 'login' })
            .then(event => {
                // assert.equal(event.user, user._id;
                assert.equal(event.email, user.email);
                assert.equal(event.type, 'login');
            });
    
    });

});
