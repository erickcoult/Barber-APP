const express = require('express');
const router = express.Router();
const Time = require('../models/time')

router.post('/', async(req,res) =>{
    try{
        const time = await new Time(req.body).save;
        res.json({time})

    }catch (err){ res.json({error: true, message: err.message});}
});



module.exports = router;