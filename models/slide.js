const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;

