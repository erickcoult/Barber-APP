const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const time = new Schema({
    salonId: {
        type: Schema.Types.ObjectId,
        ref: 'Salon',
        required: true,
    },

    specialties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        }
    ],

    professional: [
        {
            type: Schema.Types.ObjectId,
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

    createdAt: {           
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Time', time);