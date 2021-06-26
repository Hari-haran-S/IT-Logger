const express = require('express');

const router = express.Router();

const Log = require('../models/Log');

const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});
router.post(
  '/',
  [
    body('message', 'Message is required').not().isEmpty(),
    body('tech', 'Technician name is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { message, attention, date, tech } = req.body;
    try {
      const newLog = new Log({
        message,
        attention,
        date,
        tech,
      });
      const log = await newLog.save();
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

module.exports = router;
