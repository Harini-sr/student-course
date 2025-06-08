const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String, // 'Principal' | 'Instructor' | 'Student'
});

module.exports = mongoose.model('model', userSchema);
