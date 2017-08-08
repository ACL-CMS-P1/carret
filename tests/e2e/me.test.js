const db = require('./helpers/db');
const request = require('./helpers/request');
const User = require('../../lib/models/user');
const tokenService = require('../../lib/auth/token-service');
const { assert } = require('chai');

describe('users api', () => {

    before(db.drop);
    
    const me = {
        name: 'logged in user',
        email: 'me@test.com',
        role: 'user',
        password: 'abc'
    };
    let savedUser = {};

    it('GETs user\'s own account info', () => {
        return request.post('/auth/signup')
            .send(me)
            .then((res) => {
                return tokenService.verify(res.body.token)
                    .then(newUser=> {
                        savedUser = newUser;
                        return User.findOne(newUser.email);
                    })
                    .then(myInfo => assert.equal(myInfo.email, me.email))
                    .catch();
            
            });
    });

    // it('GETs user\'s own account info', () => {
    //     return request.post('/auth/signup')
    //         .send(me)
    //         .then((res) => {
                
    //         })
    //         .then(() => {
    //             request.get(`/users/${newUser._id}`)
    //                 .set('Authorization', token);
    //         })            
    //         .then(res => res.body)
    //         .then(myInfo => assert.deepEqual(myInfo, me))
    //         .catch();
            
    // });
});