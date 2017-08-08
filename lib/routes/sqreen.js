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
                if(err) throw new Error(err);
                else res.send(response);
            });
            // .catch(next);
    })

    .get('/ips/:address', (req, res) => {   
        superagent
            .get(`https://api.sqreen.io/v1/ips/${req.params.address}`)
            .set('x-api-key', key)
            .end((err, response) => {
                if(err) throw new Error(err);
                else res.send(response);
            });
    });

module.exports = router;
