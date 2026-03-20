const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointment = new Schema({
    salonId: {
            type: mongoose.Types.ObjectID,
            ref: 'Salon',
            required: true,
        },
    
    clientId: {
            type: mongoose.Types.ObjectID,
            ref: 'Client',
            required: true,
        },
    
    serviceId: {
            type: mongoose.Types.ObjectID,
            ref: 'Service',
            required: true,
        },

    professionalId: {
            type: mongoose.Types.ObjectID,
            ref: 'Professional',
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        comission: {
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

    createdAt: {            // Data do dia atual 
        type: Date,
        default: Date.now,
    }
});

module.exports= mongoose.model('Appointment', appointment);