const connection = require('mongoose').connection;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../../lib/app');
module.exports = chai.request(app);

let admins = [
    { name: 'Christy La Guardia', email: 'christy@teamcaret.com', password: 'chr15ty', role: 'admin'},
    { name: 'Mark Petrie', email: 'mark@teamcaret.com', password: '|v|ark!', role: 'admin'},
    { name: 'Stephanie Fitzgerald', email: 'stephanie@teamcaret.com', password: '5t3phan13', role: 'admin' }
];

// let users = [
db.getCollection('users').create(
    { name: 'Sean Bean2', email: 'Ned.Stark@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Mark Addy', email: 'Robert.Baratheon@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Nikolaj Coster-Waldau', email: 'Jaime.Lannister@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Michelle Fairley', email: 'Catelyn.Stark@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Lena Headey1', email: 'Cersei.Lannister@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Emilia Clarke', email: 'Daenerys.Targaryen@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Iain Glen', email: 'Jorah.Mormont@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Aidan Gillen', email: 'Petyr.Baelish@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Harry Lloyd', email: 'Viserys.Targaryen@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Kit Harington', email: 'Jon.Snow@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Sophie Turner', email: 'Sansa.Stark@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Maisie Williams', email: 'Arya.Stark@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Richard Madden', email: 'Robb.Stark@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Alfie Allen', email: 'Theon.Greyjoy@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Isaac Hempstead Wright', email: 'Bran.Stark@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Jack Gleeson', email: 'Joffrey.Baratheon@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Rory McCann', email: 'Sandor.Clegane@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Peter Dinklage', email: 'Tyrion.Lannister@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Jason Momoa', email: 'Khal.DrogoGuest@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Liam Cunningham', email: 'Davos.Seaworth@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'John Bradley-West', email: 'Samwell.Tarly@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Natalie Dormer', email: 'Margaery.Tyrell@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Stephen Dillane', email: 'Stannis.Baratheon@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Carice van Houten', email: 'Melisandre@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'James Cosmo', email: 'Jeor.Mormont@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Jerome Flynn', email: 'Bronn@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Conleth Hill', email: 'Varys@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Sibel Kekilli', email: 'Shae@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Charles Dance', email: 'Tywin.Lannister@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Rose Leslie', email: 'Ygritte@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Oona Chaplin', email: 'Talisa Maegyr@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Joe Dempsie', email: 'Gendry@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Kristofer Hivju', email: 'Tormund.Giantsbane@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Hannah Murray', email: 'Gilly@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Gwendoline Christie', email: 'Brienne.of.Tarth@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Iwan Rheon', email: 'Ramsay.Bolton@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Indira Varma', email: 'Ellaria.Sand@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Michiel Huisman', email: 'Daario.Naharis@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Nathalie Emmanuel', email: 'Missandei@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Tom Wlaschiha', email: 'Jaqen.Hghar@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Dean-Charles Chapman', email: 'Tommen.Baratheon@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Michael McElhatton', email: 'Roose.Bolton@gameofthrones.tv', password: 'hbo', role: 'user' },
    { name: 'Jonathan Pryce', email: 'The.High.Sparrow@gameofthrones.tv', password: 'hbo', role: 'user' }
)

// ]

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


function populateUsers() {

    return connection.dropDatabase()
        .then(Promise.all(admins.map(signup)))
        .then(Promise.all(users.map(signup)));

}

// events

//