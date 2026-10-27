const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salonProfessional = new Schema({
  salonId: {
    type: Schema.Types.ObjectId,
    ref: "Salon",
    required: true,
  },

  professionalId: {
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },

  status: {
    type: String,
    required: true,
    enum: ["A", "I", "D"], // Active, Inactive and Deleted
    default: "A",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SalonProfessional", salonProfessional);