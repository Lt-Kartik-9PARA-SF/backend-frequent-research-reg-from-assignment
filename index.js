
const express = require('express');
const mongoose = require('mongoose');
const Country = require('./models/country');
const User = require('./models/user');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3001;
const mongoURI = 'mongodb+srv://kartik:1234@ivy.aq61ire.mongodb.net/ivy?retryWrites=true&w=majority'

app.use(express.json());
app.use(cors());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to DB') ).catch((e) => console.log('error db'));



app.get('/countries', async (req, res) => {
  try {
    const countryData = await Country.findOne();
    if (!countryData) {
      res.status(404).json({ error: 'Country data not found' });
      return;
    }
    // Send the data as JSON
    res.json(countryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const nameRegex = /^[a-zA-Z]+$/;

    if (!nameRegex.test(userData.firstName) || !nameRegex.test(userData.lastName)) {
      res.status(400).json({ error: 'First Name and Last Name must contain only alphabets' });
      return;
    }

    if (!emailRegex.test(userData.email)) {
      res.status(400).send('Invalid email format');
      return;
    }

    // Create a new user document and save it to the database
    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});









  