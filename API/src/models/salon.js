const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salon = new Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory'],
    },
    photo: String,
    cover: String,
    email: {
        type: String,
        required: [true, 'E-mail is mandatory'],
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
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [Number],
    },
    createdAt: { 
        type: Date,
        default: Date.now,
    }
});

salon.index({ geo: '2dsphere' });

module.exports = mongoose.model('Salon', salon);