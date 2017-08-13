// To remove in robo 3t:
// db.getCollection('users').remove({})

const superagent = require('superagent');
const User = require('../models/user');

const hackers = new User([
    { name: 'Elliot Alderson', email: 'test@test.com', password: 'fsociety', role: 'user'},
    { name: 'Darlene Alderson', email: 'k399792@mvrht.net', password: 'fsociety', role: 'user'},
    { name: 'Angela Moss', email: 'hhhhhhhhhhhhhhhh@mailinator.com', password: 'fsociety', role: 'user'},
    { name: 'Tyrell Wellick', email: 'email@email.com', password: 'fsociety', role: 'user'},
    { name: 'Mr Robot', email: 'k888246@mvrht.net', password: 'fsociety', role: 'user'},
    { name: 'Phillip Price', email: 'mail@mail.com', password: 'fsociety', role: 'user'},
    { name: 'Joanna Wellick', email: 'mail@mail.com', password: 'fsociety', role: 'user'},
    { name: 'Dominique Dom DiPierro', email: 'mail@mail.com', password: 'fsociety', role: 'user'}
]);

const users = new User([{ name: 'Sean Bean2', email: 'Ned.Stark@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' },
    { name: 'Mark Addy', email: 'Robert.Baratheon@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' },
    { name: 'Nikolaj Coster-Waldau', email: 'Jaime.Lannister@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' },
    { name: 'Michelle Fairley', email: 'Catelyn.Stark@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' },
    { name: 'Lena Headey1', email: 'Cersei.Lannister@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' },
    { name: 'Emilia Clarke', email: 'Daenerys.Targaryen@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' },
    { name: 'Iain Glen', email: 'Jorah.Mormont@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' },
    { name: 'Aidan Gillen', email: 'Petyr.Baelish@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' },
    { name: 'Harry Lloyd', email: 'Viserys.Targaryen@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' },
    { name: 'Kit Harington', email: 'Jon.Snow@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' }
]);

// let randomNum = Math.floor(Math.random() * hackers.length) + 1;

module.exports = {
    run(){
        superagent
            // .post('/auth/signup')
            // .set('Content-Type', 'application/json')
            // .send({ name: 'Elliot Alderson', email: 'test@test.com', password: 'fsociety', role: 'user'})
            // .send({ name: 'Sean Bean2', email: 'Ned.Stark@gameofthrones.tv', password: 'hbo', role: 'user', status: 'active' })
            .post('/auth/signin')
            .send({ email: 'me@me.com', password: 'christy' })
            .end((err, res) => {
                if(err || !res.ok) console.log('Uh-oh! Something went wrong.');
                else console.log('Simulator simulated successfully!');
            });
    }
};
