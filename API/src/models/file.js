const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const file = new Schema({
    referenceId: {
        type: Schema.Types.ObjectId,
        refPath: 'model'
    },
    model: {
        type: String, 
        required: true,
        enum: ['Service', 'Salon']
    },
    path : {
        type: String,
        required: true
    },
    createdAt: {            // Data do dia atual Criated at
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('File', file)