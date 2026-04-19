const express = require('express');
const app = express();
const morgan = require('morgan');
const busboy = require ('connect-busboy');
const busboyBodyParser = require ('busboy-body-parser');
require('dotenv').config()
require('./database');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(busboy());
app.use(busboyBodyParser());



//Variables
app.set('port', 8000);

app.listen(app.get('port'), () =>{
    console.log(`API listening on port 8000`);
});

// Routes
app.use('/salon', require('./src/routes/salon.routes'))