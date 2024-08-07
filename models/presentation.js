const mongoose = require('mongoose');

const presentationSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  authors: [String],
  dateOfPublishment: { type: Date, required: true },
  slides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slide' }]
});

module.exports = mongoose.model('Presentation', presentationSchema);
