const Course = require("../../models/Course");

// @route   GET api/course
// @desc    Get all courses
// @access  Public

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            statusCode: 200,
            message: "success fetching all courses",
            data: courses,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

// @route   GET api/course/:id
// @desc    Get course by id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                statusCode: 404,
                message: "Course not found",
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: "success fetching course",
            data: course,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const getCoursePartsId = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                statusCode: 404,
                message: "Course not found",
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: "success fetching course parts",
            data: course.parts,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
const getCourseByIdParts = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                statusCode: 404,
                message: "Course not found",
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: "success fetching course parts id",
            data: course.parts.id(req.params.part_id),
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
const createCourse = async (req, res) => {
    const { title, description, image, parts } = req.body;
    try {
        const newCourse = new Course({
            title,
            description,
            image,
            parts,
        });
        const course = await newCourse.save();
        res.status(201).json({
            statusCode: 201,
            message: "success creating course",
            data: course,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
// create course parts in the same route as create course
const createCourseParts = async (req, res) => {
    const { title, description, video_url } = req.body;
    try {
        const newCoursePart = {
            title,
            description,
            video_url,
        };
        const course = await Course.findById(req.params.id);
        course.parts.unshift(newCoursePart);
        await course.save();
        res.status(201).json({
            statusCode: 201,
            message: "success creating course part",
            data: course,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

// @route   PUT api/course/:id
// @desc    Update a course
// @access  Private
const updateCourse = async (req, res) => {
    const { title, description, image, parts } = req.body;
    const courseFields = {};
    if (title) courseFields.title = title;
    if (description) courseFields.description = description;
    if (image) courseFields.image = image;
    if (parts) courseFields.parts = parts;
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                statusCode: 404,
                message: "Course not found",
            });
        }
        course = await Course.findByIdAndUpdate(
            req.params.id,
            { $set: courseFields },
            { new: true }
        );
        res.status(200).json({
            statusCode: 200,
            message: "success updating course",
            data: course,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

// @route   DELETE api/course/:id
// @desc    Delete a course
// @access  Private
const deleteCourse = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                statusCode: 404,
                message: "Course not found",
            });
        }
        await Course.findByIdAndRemove(req.params.id);
        res.status(200).json({
            statusCode: 200,
            message: "success deleting course",
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
//update course parts in the same route as update course
const updateCourseParts = async (req, res) => {
    const { title, description, video_url } = req.body;
    const courseFields = {};
    if (title) courseFields.title = title;
    if (description) courseFields.description = description;
    if (video_url) courseFields.video_url = video_url;
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                statusCode: 404,
                message: "Course not found",
            });
        }
        course = await Course.findByIdAndUpdate(
            req.params.id,
            { $set: courseFields },
            { new: true }
        );
        res.status(200).json({
            statusCode: 200,
            message: "success updating course",
            data: course,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

//delet course parts in the same route as delete course
const deleteCourseParts = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                statusCode: 404,
                message: "Course not found",
            });
        }
        course = await Course.findByIdAndUpdate(
            req.params.id,
            { $pull: { parts: { _id: req.params.part_id } } },
            { new: true }
        );
        res.status(200).json({
            statusCode: 200,
            message: "success deleting course part",
            data: course,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    getAllCourses,
    getCourseById,
    getCoursePartsId,
    getCourseByIdParts,
    createCourse,
    createCourseParts,
    updateCourse,
    updateCourseParts,
    deleteCourse,
    deleteCourseParts,
};
