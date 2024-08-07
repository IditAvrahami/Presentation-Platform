const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/presentation-platform')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Use Routes
app.use('/api/presentations', require('./routes/presentations'));
app.use('/api/slides', require('./routes/slides'));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/presentation-platform', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Use Routes
// app.use('/api/presentations', require('./routes/presentations'));
// app.use('/api/slides', require('./routes/slides'));

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// mongoose.connect('mongodb://localhost:27017/presentation-platform', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then(() => {
//     console.log('MongoDB connected');
//   }).catch(err => {
//     console.error('MongoDB connection error:', err);
//   });
  