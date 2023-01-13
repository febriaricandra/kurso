const User = require("../../models/User");
const Course = require("../../models/Course");

const enrollCourse = async(req,res) => {
    const { courseId } = req.body;
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);
        if(!user || !course) {
            return res.status(400).json({ message: "User or course not found" });
        }
        if(!user.courses) user.courses = [];
        if(user.courses.includes(courseId)) {
            return res.status(400).json({ message: "User already enrolled in this course" });
        }
        user.courses.push(courseId);
        await user.save();
        return res.status(200).json({
            statusCode: 200,
            message: "User enrolled in course" 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { enrollCourse };