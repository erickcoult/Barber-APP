const mongoose = require('mongoose');
const URI = '';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', flase);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);



mongoose.set("", "");
mongoose.connect(URI)
.then (() => console.log('DB is Up'))
.catch ((err) => console.log(err));