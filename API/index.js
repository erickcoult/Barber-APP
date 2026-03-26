const express = require('express');
const app = express();
const morgan = require('morgan');
require('./database');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Variables
app.set('port', 8000);

app.listen(app.get('port'), () =>{
    console.log(`API listening on port 8000`);
});

// Routes
app.use('/salon', require('./src/routes/salon.routes'))