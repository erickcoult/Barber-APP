const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalService = new Schema({
    professionalIdId: {
            type: mongoose.Types.ObjectID,
            ref: 'Professional',
            required: true,
        },
    
    serviceId: {
            type: mongoose.Types.ObjectID,
            ref: 'Service',
            required: true,
        },
    
    status: {
        type: Date,
        required: true,
        enum: ['A', 'I'],  // Active and inactive
        default: 'A'
    },

    createdAt: {            // Data do dia atual 
        type: Date,
        default: Date.now,
    }
});

module.exports= mongoose.model('ProfessionalService', professionalService);