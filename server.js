const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extented: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'hey there' });
});

//routes
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

//listen
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
