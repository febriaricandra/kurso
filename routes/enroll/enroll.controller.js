const User = require("../../models/User");
const Course = require("../../models/Course");
const jwt = require("jsonwebtoken");

const enrollCourse = async (req, res) => {
    // Check if the request has an authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    // Verify the user's JSON web token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
  
    // Get the course ID from the request body
    const courseId = req.body.courseId;
  
    try {
      // Find the user and course by ID
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);
  
      if (user && course) {
        // Check if the user is already enrolled in the course
        const isEnrolled = user.courses.some(c => c._id.toString() === course._id.toString());
        if (isEnrolled) {
          return res.status(400).json({ message: "Course already enrolled" });
        }
        // Enroll the user in the course
        user.courses.push(course);
        await user.save();
        res.status(200).json({ message: "Successfully enrolled" });
      } else {
        res.status(404).json({ message: "User or course not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { enrollCourse };
