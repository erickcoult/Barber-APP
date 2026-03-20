const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const client = new Schema({
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

    phone: {
        type: String,
        required: true,
    },
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

    document: {
        type: {
            type: String,
            enum: ['individual', 'corporation'],
            required: true
        }
    },

    status: {
        type: Date,
        required: true,
        enum: ['A', 'I'],    // Active and inactive
        default: 'A'
    },


    createdAt: {            // Data do dia atual 
        type: Date,
        default: Date.now,
    }
});

module.exports= mongoose.model('Client', client);