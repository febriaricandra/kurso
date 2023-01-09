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

const { authRole } = require('../../middlewares/jwt');

router.get('/', authRole(['user','admin']), getAllCourses);
router.get('/:id', authRole(['user','admin']), getCourseById);
router.post('/', authRole(['admin']), createCourse);
router.put('/:id', authRole(['admin']), updateCourse);
router.delete('/:id', authRole(['admin']), deleteCourse);
router.post('/:id/parts', authRole(['admin']), createCourseParts);
router.put('/:id/parts/:partId', authRole(['admin']), updateCourseParts);
router.delete('/:id/parts/:partId', authRole(['admin']), deleteCourseParts);


module.exports = router;