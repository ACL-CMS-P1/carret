# Team ^

Alchemy Code Labs - 401 Group Project

* Mark Petrie (petrie.mark@gmail.com)
* Stephanie Fitzgerald (s.e.v.fitzgerald@gmail.com)
* Christy La Guardia (christinelaguardia@gmail.com)

<http://carret.herokuapp.com/>

## Synopsis

Our project is an authentication security solution that is intended for publication as an npm package. Developers can install our security package for use in their new and existing apps that requires security.

## Installation

`npm i`

## Tests

`npm test`

## Dependencies

Sqreen API <https://doc.sqreen.io/reference>

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
