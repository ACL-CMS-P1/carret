const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe.only('admin only options', () => {
    
    let admin = {
        name: 'admin0',
        email: 'zero@admin.com',
        password: 'password0',
        role: 'admin'
    };

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
            .then(({ body }) => {
                delete user.password;
                // user._id = body._id;
                // user.__v = body.__v;
                return body;
            });
    }

    // function signin(user) {
    //     return request.post('/auth/signin')
    //         .send(user)
    //         .then(res => res.body);
    // }

    before(db.drop);

    before(() => Promise.all(users.map(signup)));

    it('/users returns list of all users', () => {

        let token = null;
        
        return signup(admin)
            .then(t => token = t.token)
            .then(() => request
                .get('/admin/users')
                .set('Authorization', token)
            )
            .then(res => {
                console.log('found users', res.body);
                const users = res.body.sort((a,b) => a.name < b.name ? 1 : -1 );
                assert.deepEqual(users, users);
            });
    });

});
