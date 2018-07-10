# Team ^

// initial commit 

Alchemy Code Lab - 401 Group Project

* Mark Petrie (petrie.mark@gmail.com)
* Stephanie Fitzgerald (s.e.v.fitzgerald@gmail.com)
* Christy La Guardia (christinelaguardia@gmail.com)

<http://carret.herokuapp.com/>

## Synopsis

Our project is an authentication security solution that is intended for publication as an npm package. It suspends user accounts based on failed login attempts and captures IP address, geolocation and other related metadata. It also leverages the Sqreen REST API to identify IP addresses and email addresses that are known to be malicious and prevents user sign-up or sign-in. Malicious IP and email addresses are added to internal blacklists that can be exported and shared with IT security teams. Developers can install our security package for use in their new and existing apps that require enhanced login security.

For coding standards and user stories, see our [DEVELOPER.md](DEVELOPER.md).
For a more detailed description and demo code for our endpoints, see the [presentation.md](presentation.md). We recommend using postman with these examples to quickly see the responses.

## Project Structure

* Lib Directory
    * auth files
    * models
        * email- and ip-blacklist models
        * event model
        * user model
    * routes
        * see below for endpoints
    * utils
        * requests to Sqreen API are here
    * app
    * connect.js for the MongoDB connection
    * error-handler

* server - an http server

* Tests Directory
    * End to End tests
    * Unit tests
    * Some helper modules for e2e tests are included

* Data Directory
    * Seed data as json for use in postman and mongodb queries

* Public Directory 
    * This is a minimal front-end for demo purposes

## Installation

`npm i`

## Tests

`npm test`

## Dependencies

* [Sqreen API](https://doc.sqreen.io/reference)
* bcrypt
* body-parser
* dotenv
* express
* jsonwebtoken-promisified
* mongoose
* morgan
* superagent

## Endpoints

Method | Route
--- | ---
GET | /auth/verify
POST | /auth/signup
POST | /auth/signin
GET | /me
PATCH | /me
DELETE | /me
GET | /admin/users
GET | /admin/users/:email
PATCH | /admin/users/:email
DELETE | /admin/users/:email
GET | /admin/reports/events
GET | /admin/reports/events?(query)
