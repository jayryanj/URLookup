const router = require('express').Router();
const Lookup = require('../models/lookup');
const scan = require('../services/scanner');
const { request, response } = require('express');

// Response statuses
const OK = 200;
const BAD_REQUEST = 400;
const ERROR = 500;

/**
 *  route:  GET /api/
 *  desc:   Will return a welcome message. Mostly for testing.
 */
router.get('/', (request, response) => {
    response.status(OK).json({message: "Hello, welcome to URLooker API"});
})

router.put('/', (request, response) => {
        response.status(OK).json({success: true});
})

/**
 *  route:  POST /lookup/
 *  desc:   Will scan the URL passed in the request body.
 */
router.post('/lookup/', (request, response) => {
    console.log(`${new Date(Date.now())} - Received URL: ${request.body.url}`)
    scan(request.body.url)
        .then(results => {
            console.log(`${new Date(Date.now())} - Sending back response to client.`)
            response.status(OK).json(results)
        })
        .catch(error => {
            console.error(`${new Date(Date.now())} - Error: ${error}`);
            response.status(BAD_REQUEST).json({success: false, message: error})
        })
})

module.exports = router;