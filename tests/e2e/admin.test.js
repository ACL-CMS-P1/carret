const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe.only('admin only options', () => {

    let users = [
        {
            name: 'user1',
            email: 'one@user.com',
            password: 'password1',
            role: 'user'
        },
        {
            name: 'user2',
            email: 'two@user.com',
            password: 'password2',
            role: 'user'
        },{
            name: 'user3',
            email: 'three@user.com',
            password: 'password3',
            role: 'user'
        }
    ];

    function signup(user) {
        return request.post('/auth/signup')
            .send(user)
            .then(res => res.body);
    }

    // function signin(user) {
    //     return request.post('/auth/signin')
    //         .send(user)
    //         .then(res => res.body);
    // }

    before(db.drop);

    before(() => Promise.all(users.map(signup)));

    it('/users', () => {
        let admin = {
            name: 'admin0',
            email: 'zero@admin.com',
            password: 'password0',
            role: 'admin'
        };
        let adminToken = null;
        let expectedUsers = users.map(u => ({ name: u.name, email: u.email, role: u.role }));

        return signup(admin)
            .then(t => adminToken = t.token)
            .then(() => request
                .get('/admin/users')
                .set('Authorization', adminToken)
            )
            .then(res => {
                const foundUsers = res.body.sort((a,b) => a.name > b.name ? 1 : -1 );
                assert.deepEqual(foundUsers, expectedUsers);
            });
    });

    it('/users/:email', () => {
        let admin = {
            name: 'admin1',
            email: 'one@admin.com',
            password: 'password1',
            role: 'admin'
        };
        let adminToken = null;
        let myUser = users[0];
        let expectedUser = { name: myUser.name, email: myUser.email, role: myUser.role };
        
        return signup(admin)
            .then(t => adminToken = t.token)
            .then(() => request
                .get(`/admin/users/${myUser.email}`)
                .set('Authorization', adminToken)
            )
            .then(res => {
                assert.deepEqual(res.body, expectedUser);
            });
    });

});
