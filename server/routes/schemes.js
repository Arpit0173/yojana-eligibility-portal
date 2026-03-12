const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

// Get all schemes with filters
router.get('/', async (req, res) => {
  try {
    const { category, status, state, search, popular } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (popular === 'true') filter.popular = true;
    if (state && state !== 'All') {
      filter.$or = [
        { states: 'All' },
        { states: state }
      ];
    }
    if (search) {
      filter.$text = { $search: search };
    }

    const schemes = await Scheme.find(filter).sort({ createdAt: -1 });
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single scheme
router.get('/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) return res.status(404).json({ error: 'Scheme not found' });
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check eligibility
router.post('/check-eligibility', async (req, res) => {
  try {
    const { age, income, state, category, gender } = req.body;
    let filter = { status: 'active' };

    filter.minAge = { $lte: parseInt(age) };
    filter.maxAge = { $gte: parseInt(age) };

    if (income) {
      filter.$or = [
        { maxIncome: 0 },
        { maxIncome: { $gte: parseInt(income) } }
      ];
    }

    const schemes = await Scheme.find(filter);

    const eligible = schemes.filter(scheme => {
      const stateMatch = scheme.states.includes('All') || scheme.states.includes(state);
      const genderMatch = scheme.gender === 'All' || scheme.gender === gender;
      const catMatch = scheme.categories.includes('All') || scheme.categories.includes(category);
      return stateMatch && genderMatch && catMatch;
    });

    res.json({ count: eligible.length, schemes: eligible });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create scheme (Admin)
router.post('/', async (req, res) => {
  try {
    const scheme = new Scheme(req.body);
    await scheme.save();
    res.status(201).json(scheme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update scheme (Admin)
router.put('/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!scheme) return res.status(404).json({ error: 'Scheme not found' });
    res.json(scheme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete scheme (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) return res.status(404).json({ error: 'Scheme not found' });
    res.json({ message: 'Scheme deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;