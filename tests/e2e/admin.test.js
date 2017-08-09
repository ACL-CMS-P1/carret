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

    let admin = {
        name: 'admin0',
        email: 'zero@admin.com',
        password: 'password0',
        role: 'admin'
    };

    function signup(user) {
        return request.post('/auth/signup')
            .send(user)
            .then(res => res.body);
    }

    function signin(user) {
        return request.post('/auth/signin')
            .send(user)
            .then(res => res.body);
    }

    before(db.drop);
    before(() => signup(admin));
    before(() => Promise.all(users.map(signup)));

    it('GET /admin/users returns list of all users', () => {
        let adminToken = null;
        let expectedUsers = users.map(u => ({ name: u.name, email: u.email, role: u.role }));

        return signin(admin)
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

    it('GET /admin/users/:email returns a user by email', () => {
        let adminToken = null;
        let myUser = users[0];
        let expectedUser = { name: myUser.name, email: myUser.email, role: myUser.role };
        
        return signin(admin)
            .then(t => adminToken = t.token)
            .then(() => request
                .get(`/admin/users/${myUser.email}`)
                .set('Authorization', adminToken)
            )
            .then(res => {
                assert.deepEqual(res.body, expectedUser);
            });
    });

    it('PATCH /admin/users/email returns updated user by email', () => {
        let adminToken = null;
        
        let myUser = users[1];
        let oldEmail = users[1].email;
        let newEmail = 'update@user.com';
        
        let expectedUser = { name: myUser.name, email: newEmail, role: myUser.role };
        
        return signin(admin)
            .then(t => adminToken = t.token)
            .then(() => request
                .patch(`/admin/users/${oldEmail}`)
                .send({ email: newEmail })
                .set('Authorization', adminToken)
            )
            .then(res => {
                assert.deepEqual(res.body, expectedUser);
            });
    });
    
    // it('DELETE /admin/users/email', () => {})

});
