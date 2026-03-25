const express = require('express');
const app = express();
const morgan = require('morgan');
require('./database');

//middlewares

app.use(morgan('dev'));

//Variables

app.set('port', 8000);

app.listen(app.get('port'), () =>{
    console.log(`API listening on port 8000`);
});