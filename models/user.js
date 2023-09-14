const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  email: String,
  gender: String,
  country: String,
  state: String,
  city: String,
});
 
User = new mongoose.model('Users', userSchema);
module.exports = User;