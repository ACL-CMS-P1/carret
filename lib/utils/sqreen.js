const superagent = require('superagent');
require('dotenv').config();
const key = process.env.SQREEN_API_KEY;

function sqreenEmail(emailAddress) {

    return superagent
        .get(`https://api.sqreen.io/v1/emails/${emailAddress}`)
        .set('x-api-key', key)
        .then((res) => {
            // console.log('RES', res);
            // console.log('ERROR', err);
            return res.body;

            // if(err) throw new Error(err);
            // else return JSON.parse(response);
        });
        // .then((res) => {
        //     console.log(res);
        //     return res;
        // });
}

function sqreenIp(ipAddress) {

    superagent
        .get(`https://api.sqreen.io/v1/ips/${ipAddress}`)
        .set('x-api-key', key)
        .end((err, res) => {
            if(err) throw new Error(err);
            return JSON.parse(res.text);
        });
}

module.exports = { sqreenEmail, sqreenIp };


// router

//     .get('/emails/:address', (req, res) => {
//         superagent
//             .get(`https://api.sqreen.io/v1/emails/${req.params.address}`)
//             .set('x-api-key', key)
//             .end((err, response) => {
//                 if(err) throw new Error(err);
//                 else res.send({
//                     status: response.status,
//                     riskAssessment: JSON.parse(response.text)
//                 });
//             });
//             // .catch(next);
//     })

//     .get('/ips/:address', (req, res) => {   
//         superagent
//             .get(`https://api.sqreen.io/v1/ips/${req.params.address}`)
//             .set('x-api-key', key)
//             .end((err, response) => {
//                 if(err) throw new Error(err);
//                 else res.send({
//                     status: response.status,
//                     riskAssessment: JSON.parse(response.text)
//                 });
//             });
//     });

// module.exports = router;
