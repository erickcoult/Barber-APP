const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const service = new Schema({
    salonId: {
        type: mongoose.Types.ObjectID,
        ref: 'Salon',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    commission: {           //em %
        type: Number,
        required: true
    },
    duration: {           // em Min
        type: Number,
        required: true
    },
    recurrence: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Date,
        required: true,
        enum: ['A', 'I'],
        default: 'A'
    },
    createdAt: { // Data  atual 
        type: Date,
        default: Date.now,
    }
});

module.exports= mongoose.model('Service', service);