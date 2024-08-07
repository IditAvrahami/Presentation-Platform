const express = require('express');
const router = express.Router();
const Presentation = require('../models/presentation');

// Create a new presentation
router.post('/', async (req, res) => {
  try {
    const presentation = new Presentation(req.body);
    await presentation.save();
    res.status(201).json(presentation);
  } catch (error) {
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

// Delete a presentation
router.delete('/:title', async (req, res) => {
  try {
    const result = await Presentation.deleteOne({ title: req.params.title });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Presentation not found' });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
