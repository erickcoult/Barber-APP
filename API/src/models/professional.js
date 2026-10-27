const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professional = new Schema({
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

    date: {
        type: String,
        required: true
    },

    sex: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['A', 'I'],
        default: 'A'
    },

    stripeAccountId: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Professional', professional);