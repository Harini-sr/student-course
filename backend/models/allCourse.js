const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  department: String,
  instructor: String,
  material: String,
  category: String,
  duration: String,
  rating: Number
});

module.exports = mongoose.model('Course', courseSchema);
