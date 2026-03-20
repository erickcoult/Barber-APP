const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salonClient = new Schema({
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

module.exports= mongoose.model('SalonClient', salonClient);