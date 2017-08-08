const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('users api', () => {

    before(db.drop);

    let token = null;
    before(() => db.getToken().then(t => token = t));
    
    let me = {
        name: 'logged in user',
        email: 'testy@test.com',
        role: 'user',
        password: 'abc'
    };

    // function saveUser(user) {
    //     return request
    //         .post('/users/me')
    //         .set('Authorization', token)
    //         .send(user)
    //         .then(({ body }) => {
    //             user._id = body._id;
    //             user.__v = body.__v;
    //             return body;
    //         });
    // }

    // it.only('saves a user', () => {
    //     return saveUser(me)
    //         .then(savedUser => {
    //             assert.ok(savedUser._id);
    //             assert.deepEqual(savedUser, me);
    //         });
    // });

    it('GETs user\'s own account info', () => {
        request.post('/auth/signup')
            .send(me)
            .then(user => request
                .get(`/users/me/${user._id}`)
                .set('Authorization', token)
            )
            .then(res => res.body)
            .then(myInfo => assert.deepEqual(myInfo, me));
            
    });
    

});