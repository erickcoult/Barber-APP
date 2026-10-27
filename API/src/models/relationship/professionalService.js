const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const professionalService = new Schema({
  professionalId: {
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },

  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service",
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

module.exports = mongoose.model("ProfessionalService", professionalService);