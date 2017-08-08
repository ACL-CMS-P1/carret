const connection = require('mongoose').connection;
const request = require('./request');

module.exports = {
    drop() {
        return connection.dropDatabase();
    },
    getToken(user = { name: 'Test User', role: 'user', email: 'test@test.com', password: 'abc' }) {
        return request.post('/auth/signup')
            .send(user)
            .then(res => res.body.token);
    }
};