const mongoose = required('mongoose');
const Schema = mongoose.Schema;

const professional = new Schema({
    name: {
        type: String,
        require: [true, 'Name is mandatory'],
    },
    photo: String,
    cover: String,
    email: {
        type: String,
        require: [true, 'E-mail is mandatory'],
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
    geo: {
        type: String,
        coordinates: Array,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports= mongoose.model('Professional', professional);