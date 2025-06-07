const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');

// GET /api/dashboard/metrics
router.get('/metrics', async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalInstructors = await User.countDocuments({ role: 'Instructor' });
    const totalStudents = await User.countDocuments({ role: 'Student' });
    const approvedCourses = await Course.countDocuments({ approved: true });

    const highRatedCourses = await Course.find({ rating: { $gte: 4.5 } })
      .select('title rating')
      .limit(5);

    const coursesPerInstructor = await Course.aggregate([
      {
        $group: {
          _id: "$instructorId",
          totalCourses: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "instructor"
        }
      },
      {
        $unwind: "$instructor"
      },
      {
        $project: {
          instructorName: "$instructor.name",
          totalCourses: 1
        }
      }
    ]);

    const courseCompletion = await Course.aggregate([
      {
        $project: {
          title: 1,
          totalStudents: { $size: "$studentsEnrolled" },
          completed: { $size: "$completedStudents" }
        }
      }
    ]);

    res.json({
      totalCourses,
      totalInstructors,
      totalStudents,
      approvedCourses,
      highRatedCourses,
      coursesPerInstructor,
      courseCompletion
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard metrics" });
  }
});

module.exports = router;
