const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('admin only reports', () => {

    let admin = {
        name: 'Mr. Admin Reporter',
        email: 'runreports@admin.com',
        password: 'passwordz',
        role: 'admin',
        status: 'active'
    };

    let events = [
        //type: ['login', 'logout', 'signup', 'failed login', 'blocked login', 'signup blocked', 'account locked']
        //level: ['low', 'medium', 'high', 'severe']
        { email: 'event1@email.com', type: 'login', level: 'low' },
        { email: 'event2@email.com', type: 'logout', level: 'low' },
        { email: 'event3@email.com', type: 'logout', level: 'low' },
        { email: 'event4@email.com', type: 'signup', level: 'low' },
        { email: 'event5@email.com', type: 'signup', level: 'low' },
        { email: 'event6@email.com', type: 'signup', level: 'low' },
        { email: 'event7@email.com', type: 'failed login', level: 'medium' },
        { email: 'event8@email.com', type: 'failed login', level: 'medium' },
        { email: 'event9@email.com', type: 'failed login', level: 'medium' },
        { email: 'event10@email.com', type: 'blocked login', level: 'high' },
        { email: 'event11@email.com', type: 'blocked login', level: 'high' },
        { email: 'event12@email.com', type: 'signup blocked', level: 'high' },
        { email: 'event13@email.com', type: 'signup blocked', level: 'high' },
        { email: 'event14@email.com', type: 'signup blocked', level: 'high' },
        { email: 'event15@email.com', type: 'account locked', level: 'severe' },
        { email: 'event16@email.com', type: 'account locked', level: 'severe' },
        { email: 'event17@email.com', type: 'account locked', level: 'severe' }
    ];

    before(db.drop);

    before(() => db.signup(admin));

    before(() => Promise.all(events.map(db.saveEvent)));

    //TODO: CHRISTY STILL WORKING ON THIS

    it.skip('/admin/reports/events?=type gets events for an enum type', () => {
        let adminToken = null;
        let eventTypes = ['login', 'logout', 'signup', 'login failed', 'login blocked', 'signup blocked', 'account locked'];

        return db.signin(admin)
            .then(t => adminToken = t.token)
            .then(() => request
                .get(`/admin/reports/events?type=${eventTypes[0]}`)
                .set('Authorization', adminToken)
            )
            .then(res => {
                console.log(res.body);
                assert.ok(res.body);
            });
    });

    //TODO: add more reports...

});