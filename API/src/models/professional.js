const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professional = new Schema({
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

    phone: String,
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

    status: {
        type: Date,
        required: true,
        enum: ['A', 'I'],
        default: 'A'
    },

    bankAccount: {
       accountHolder:{          // titular da conta
        type: string,
        required: true
       },
       cpfCnpj:{
        type: string,
        required: true
       }, 
       bank:{
        type: string,
        required: true
       }, 
       type:{ 
        type: string,
        required: true
       }, 
       branch:{                 // agencia
        type: string,
        required: true
       }, 
       CD:{           //Dígito verificador (CheckDigit)
        type: string,
        required: true
       }, 
       accountNumber:{      // numero da conta
        type: string,
        required: true
       }, 
    },

    recipientId: {
        type: String,
        required: true
    },

    createdAt: {            // Data do dia atual 
        type: Date,
        default: Date.now,
    }
});

module.exports= mongoose.model('Professional', professional);