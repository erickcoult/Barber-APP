const express = require('express');
const morgan = require('morgan');
const busboyBodyParser = require('busboy-body-parser');

require('./database');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use(
  busboyBodyParser({
    limit: '15mb',
  })
);

// Application settings
app.set('port', 8000);

// Routes
app.use('/salon', require('./src/routes/salon.routes'));
app.use('/service', require('./src/routes/service.routes'));
app.use('/time', require('./src/routes/time.routes'));
app.use('/professional', require('./src/routes/professional.routes'));


// Start server
app.listen(app.get('port'), () => {
  console.log(`API listening on port ${app.get('port')}`);
});