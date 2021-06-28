const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extented: false }));

//routes
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

//listen
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
