const express = require('express');

const router = express.Router();

const Log = require('../models/Log');

const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const string = req.query.q;
    const logs = await Log.find()
      .or([
        {
          message: { $regex: new RegExp(string), $options: 'i' },
        },
        {
          tech: { $regex: new RegExp(string), $options: 'i' },
        },
      ])
      .sort({
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

router.put('/:id', async (req, res) => {
  const { message, attention, tech } = req.body;
  const logFeilds = {};
  if (message) logFeilds.message = message;
  // if (attention) logFeilds.attention = attention;
  if (tech) logFeilds.tech = tech;
  try {
    let log = await Log.findById(req.params.id);
    if (!log) res.status(500).json({ msg: 'Log not found' });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { attention, $set: logFeilds },
      { new: true }
    );
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);
    if (!log) res.status(500).json({ msg: 'No logs found' });

    await Log.findByIdAndRemove(req.params.id);
    res.json({ msg: 'log Removed Successfylly' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

module.exports = router;
