const express = require('express');
const router = express.Router();
const Slide = require('../models/slide');
const Presentation = require('../models/presentation');

// Add a slide to a presentation
router.post('/:title', async (req, res) => {
  try {
    const presentation = await Presentation.findOne({ title: req.params.title });
    if (!presentation) return res.status(404).json({ error: 'Presentation not found' });

    const slide = new Slide(req.body);
    await slide.save();
    presentation.slides.push(slide._id);
    await presentation.save();
    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Alter a slide
router.put('/:id', async (req, res) => {
  try {
    const slide = await Slide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slide) return res.status(404).json({ error: 'Slide not found' });
    res.json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a slide
router.delete('/:id', async (req, res) => {
  try {
    const result = await Slide.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Slide not found' });

    const presentation = await Presentation.findOne({ slides: req.params.id });
    if (presentation) {
      presentation.slides.pull(req.params.id);
      await presentation.save();
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
