const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

const Event = require('../../lib/models/event');

describe.only('admin only reports', () => {

    let admin = {
        name: 'Mr. Admin Reporter',
        email: 'runreports@admin.com',
        password: 'passwordz',
        role: 'admin',
        status: 'active'
    };

    let events = [
        //type: ['login', 'logout', 'signup', 'login failed', 'login blocked', 'signup blocked', 'account locked']
        //level: ['low', 'medium', 'high', 'severe']
        { name: 'event 1', type: 'login', level: 'low' },
        { name: 'event 2', type: 'logout', level: 'low' },
        { name: 'event 3', type: 'signup', level: 'low' },
        { name: 'event 4', type: 'signup', level: 'low' },
        { name: 'event 5', type: 'signup', level: 'low' },
        { name: 'event 6', type: 'signup', level: 'low' },
        { name: 'event 7', type: 'login failed', level: 'medium' },
        { name: 'event 8', type: 'login failed', level: 'medium' },
        { name: 'event 9', type: 'login failed', level: 'medium' },
        { name: 'event 10', type: 'login blocked', level: 'high' },
        { name: 'event 11', type: 'signup blocked', level: 'high' },
        { name: 'event 12', type: 'signup blocked', level: 'high' },
        { name: 'event 13', type: 'signup blocked', level: 'high' },
        { name: 'event 14', type: 'signup blocked', level: 'high' },
        { name: 'event 15', type: 'account locked', level: 'severe' },
        { name: 'event 16', type: 'account locked', level: 'severe' },
        { name: 'event 17', type: 'account locked', level: 'severe' }
    ];

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

    function saveEvent(event) {
        let newEvent = new Event(event);
        newEvent.save();
    }

    before(db.drop);

    before(() => signup(admin));

    before(() => Promise.all(events.map(saveEvent)));

    it('/admin/reports/events?=type gets events for an enum type', () => {
        let adminToken = null;
        let eventTypes = ['login', 'logout', 'signup', 'login failed', 'login blocked', 'signup blocked', 'account locked'];

        return signin(admin)
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

});