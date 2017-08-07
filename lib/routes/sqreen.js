const express = require('express');
const router = express.Router();

const superagent = require('superagent');

require('dotenv').config();
const key = process.env.SQREEN_API_KEY;

router

    .get('/emails/:address', (req, res) => {
        superagent
            .get(`https://api.sqreen.io/v1/emails/${req.params.address}`)
            .set('x-api-key', key)
            .end((err, response) => {
                if(err) {
                    console.log(err);
                    throw new Error(err);
                } else {
                    res.send(response);
                }
            });
    });

    // .get('/ips/:ip-address', (req, res) => {   

    // });

module.exports = router;
