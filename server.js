const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();
app.use(express.json({ extented: false }));
app.get('/', (req, res) => {
  res.json({ msg: 'hey there' });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
