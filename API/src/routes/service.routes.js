const express = require('express');
const router = express.Router();
const Busboy = require ('busboy')
const Salon = require('../models/salon');
const Service = require('../models/service');

router.post('/', async(req, res) => {

    try{
        
    } catch (err) {
        res.json({ error: true, message: err.message})
    }

});


module.exports = router;