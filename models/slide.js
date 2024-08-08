const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  title: String,
  content: String,
  // Add other fields as needed
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;


// const mongoose = require('mongoose');

// const slideSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true }
// });

// module.exports = mongoose.model('Slide', slideSchema);
