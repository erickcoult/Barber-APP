const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointment = new Schema({
    salonId: {
        type: Schema.Types.ObjectId,
        ref: 'Salon',
        required: true,
    },

    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },

    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },

    professionalId: {
        type: Schema.Types.ObjectId,
        ref: 'Professional',
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    commission: {
        type: Number,
        required: true,
    },

    value: {
        type: Number,
        required: true,
    },

    transactionId: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Appointment', appointment);