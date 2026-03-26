const mongoose = require('mongoose');
const URI = 'mongodb+srv://salonUser:dPd23tvOAIsALyfj@cluster0.9y75ynn.mongodb.net/Barber-App?appName=Cluster0'; // <----após finalização, colocar na .env




mongoose.connect(URI)
.then (() => console.log('DB is Up'))
.catch ((err) => console.log(err));