const router = require('express').Router();
const Lookup = require('../models/lookup');
const scan = require('../services/scanner');
const { request, response } = require('express');

const OK = 200;
const BAD_REQUEST = 400;
const ERROR = 500;

/**
 *  route:  GET /api/
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
            response.status(BAD_REQUEST).json({success: false})
        })
})

module.exports = router;