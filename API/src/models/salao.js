const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salon = new Schema({
    name: {
        type: String,
        require: [true, 'Name is mandatory'],
    },
    photo: String,
    cover: String,
    email: {
        type: String,
        require: [true, 'E-mail is mandatory'],
    },
    password: {
        type: String,
        default: null, 
    },
    phone: String,
    address: {
        city: String,
        state: String,
        postalcode: String,
        number: String,
        country: String,
    },
    geo: {
        type: String,
        coordinates: Array,

    },
    createdAt: { // Data  atual 
        type: Date,
        default: Date.now,
    }
});

salon.index({ geo: '2dsphere'});

module.exports= mongoose.model('Salon', salon);