const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect(
  'mongodb+srv://harivarshinisr:W0LGfYTndADWxi8g@cluster0.vzc65q1.mongodb.net/dashboardDB?retryWrites=true&w=majority')
.then(() => console.log(' MongoDB Atlas connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

app.listen(3700, () => {
  console.log('🚀 Server running at http://localhost:3700');
});

const Instructor = require('./models/Instructor');
app.post('/instructors', (req, res) => {
   const instructor = new Instructor(req.body);
     instructor.save();
    console.log('Received Instructor:', instructor);
    res.status(201).json({ message: 'Instructor saved', data: instructor });
});

app.get('/instructors', async (req, res) => {

    const instructors = await Instructor.find();
    res.json(instructors);
 
});