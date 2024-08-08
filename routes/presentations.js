const express = require('express');
const router = express.Router();
const Presentation = require('../models/presentation');
const Slide = require('../models/slide');

// Create a new presentation and slide with data
router.post('/', async (req, res) => { 
    try {
      const { title, authors, dateOfPublishment, slides } = req.body;
  
      // Step 1: Create slide documents
      const createdSlides = await Promise.all(
        slides.map(async slideData => {
          const slide = new Slide(slideData);
          return await slide.save();
        })
      );
  
      // Step 2: Extract slide IDs
      const slideIds = createdSlides.map(slide => slide._id);
  
      // Step 3: Create and save presentation
      const presentation = new Presentation({
        title,
        authors,
        dateOfPublishment,
        slides: slideIds,
      });
  
      await presentation.save();
  
      // Step 4: Send response
      res.status(201).json(presentation);
    } catch (error) {
      console.error('Error creating presentation and slides:', error);
      res.status(400).json({ error: error.message });
    }
  });

// Fetch a presentation by title
router.get('/:title', async (req, res) => {
  try {
    const presentation = await Presentation.findOne({ title: req.params.title }).populate('slides');
    if (!presentation) return res.status(404).json({ error: 'Presentation not found' });
    res.json(presentation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all presentations
router.get('/', async (req, res) => {
  try {
    const presentations = await Presentation.find().populate('slides');
    res.json(presentations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a presentation and its associated slides
router.delete('/:title', async (req, res) => {
    try {
      // Step 1: Find the presentation by title
      const presentation = await Presentation.findOne({ title: req.params.title });
  
      if (!presentation) {
        return res.status(404).json({ error: 'Presentation not found' });
      }
  
      // Step 2: Get the slide IDs
      const slideIds = presentation.slides;
  
      // Step 3: Delete slides
      if (slideIds.length > 0) {
        await Slide.deleteMany({ _id: { $in: slideIds } });
      }
  
      // Step 4: Delete the presentation
      await Presentation.deleteOne({ title: req.params.title });
  
      // Step 5: Send response
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

// Middleware to update the authors list for a specific presentation
router.put('/authors/:title', async (req, res) => {
    try {
      const { authors } = req.body; // Expect authors to be an array of strings
  
      // Validate the authors list
      if (!Array.isArray(authors) || authors.some(author => typeof author !== 'string')) {
        return res.status(400).json({ error: 'Invalid authors list format' });
      }
  
      // Find the presentation by title
      const presentation = await Presentation.findOne({ title: req.params.title });
  
      if (!presentation) {
        return res.status(404).json({ error: 'Presentation not found' });
      }
  
      // Update the authors list
      presentation.authors = authors;
      await presentation.save();
  
      // Return the updated presentation
      res.json(presentation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  


// Middleware to add an author to the existing authors list for a specific presentation
router.put('/authorsAdd/:title', async (req, res) => {
    try {
      const { author } = req.body; // Expect author to be a string
  
      // Validate the author
      if (typeof author !== 'string') {
        return res.status(400).json({ error: 'Invalid author format' });
      }
  
      // Find the presentation by title
      const presentation = await Presentation.findOne({ title: req.params.title });
  
      if (!presentation) {
        return res.status(404).json({ error: 'Presentation not found' });
      }
  
      // Check if the author already exists
      if (presentation.authors.includes(author)) {
        return res.status(400).json({ error: 'Author already exists' });
      }
  
      // Add the new author to the authors list
      presentation.authors.push(author);
      await presentation.save();
  
      // Return the updated presentation
      res.json(presentation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
