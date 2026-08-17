const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archive = new Schema({
  referenceId: {
    type: Schema.Types.ObjectId,
    refPath: 'model',
  },
  model: {
    type: String,
    required: true,
    enum: ['Service', 'salon'],
  },
  archive: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Archive', archive);