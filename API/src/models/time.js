const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const time = new Schema({
    salonId: {
            type: mongoose.Types.ObjectID,
            ref: 'Salon',
            required: true,
        },

    specialties: [
        {
            type: mongoose.Types.ObjectID,
            ref: 'Service',
            required: true,
        }
    ],
    professional: [
        {
            type: mongoose.Types.ObjectID,
            ref: 'Professional',
            required: true,
        }
    ],

    days: {
        type: [Number],
        required: true
    },

    start: {
        type: Date,
        required: true,
    },

    end: {
        type: Date,
        required: true,
    },

    createdAt: {            // Data do dia atual 
        type: Date,
        default: Date.now,
    }
});

module.exports= mongoose.model('Time', time);