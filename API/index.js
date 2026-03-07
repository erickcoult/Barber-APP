const express = require('express');
const app = express();
const morgan = require('morgan');

//middlewares

app.use(morgan('dev'));

//Variables

app.set('port', 8000);

app.listen(app.get('port'), () =>{
    console.log(`API escutando na porta 8000`);
});