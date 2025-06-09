const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  role: String,
  education: String,
  skill:String,
  experience:String
});

module.exports = mongoose.model('Instructor', instructorSchema);
