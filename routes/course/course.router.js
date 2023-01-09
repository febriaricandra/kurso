const express = require('express');
const router = express.Router();

const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    createCourseParts,
    updateCourseParts,
    deleteCourseParts,
} = require('./course.controller');


router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.post('/:id/parts', createCourseParts);
router.put('/:id/parts/:partId', updateCourseParts);
router.delete('/:id/parts/:partId', deleteCourseParts);

module.exports = router;