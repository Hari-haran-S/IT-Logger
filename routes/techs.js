const express = require('express');

const router = express.Router();

const Tech = require('../models/Tech');

const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find().sort({
      date: -1,
    });
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});
router.post(
  '/',
  [
    body('firstName', 'firstName is required').not().isEmpty(),
    body('lastName', 'lastName is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName } = req.body;
    try {
      const newTech = new Tech({
        firstName,
        lastName,
      });
      const tech = await newTech.save();
      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

router.put('/:id', async (req, res) => {
  const { firstName, lastName } = req.body;
  const techFeilds = {};
  if (firstName) techFeilds.firstName = firstName;
  if (lastName) techFeilds.lastName = lastName;
  try {
    let tech = await Tech.findById(req.params.id);
    if (!tech) res.status(500).json({ msg: 'technician not found' });

    tech = await Tech.findByIdAndUpdate(
      req.params.id,
      { $set: techFeilds },
      { new: true }
    );
    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);
    if (!tech) res.status(500).json({ msg: 'No technician found' });

    await Tech.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Technician Removed Successfylly' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

module.exports = router;
