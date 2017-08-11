// const db = require('./helpers/db');
// const request = require('./helpers/request');
// const assert = require('chai').assert;
// const Rule = require('../../lib/models/rule');

// describe('Admin only options - Rules API', () => {

//     let adminUser = {
//         name: 'Admin User',
//         email: 'adminemail@email.com',
//         password: 'zzz',
//         role: 'admin',
//         status: 'active'
//     };

//     let rules = [
//         {
//             name: 'rule1',
//             active: true,
//             description: 'Requires risk score less than 80'
//         },{
//             name: 'rule2',
//             active: true,
//             description: 'Fails on three login attempts'
//         }
//     ];

//     before(db.drop);
//     before(() => Promise.all(rules.map(db.saveRule)));

//     it('GET /admin/rules returns list of all rules', () => {
//         let adminToken = null;
//         let returnedRules = null;

        return db.signup(adminUser)
            .then(t => adminToken = t.token)
            .then(() => request
                .get('/admin/rules')
                .set('Authorization', adminToken)
            )
            .then(res => {
                returnedRules = res.body.sort((a, b) => a.name > b.name ? 1 : -1);
                assert.deepEqual(returnedRules, rules);
            });
    });

//     it('PATCH /admin/rules/:name changes rule active', () => {
//         let adminToken = null;
//         let updatedRule = null;

//         return db.signin(adminUser)
//             .then(t => adminToken = t.token)
//             .then(() => request
//                 .patch(`/admin/rules/${rules[0].name}`)
//                 .set('Authorization', adminToken)
//                 .send({ active: false })
//             )
//             .then(res => {
//                 updatedRule = res.body;
//                 rules[0].active = false;
//                 assert.deepEqual(updatedRule, rules[0]);
//             });
//     });
// });    
