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
    response.status(OK).json({success: true});
})

router.put('/', (request, response) => {
        response.status(OK).json({success: true});
})

/**
 *  route:  POST /lookup/
 *  desc:   Will scan the URL passed in the request body.
 */
router.post('/lookup/', (request, response) => {
    scan(request.body.url).then((data) => {
        response.status(OK).json(data)
    })
})

module.exports = router;