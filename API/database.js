
const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;




mongoose.connect(URI)
.then (() => console.log('DB is Up'))
.catch ((err) => console.log(err));