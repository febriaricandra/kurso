const express = require('express');
const router = express.Router();

const {
    getAllCourses,
    getCourseById,
    getCourseByIdParts,
    getCoursePartsId,
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
router.get('/:id/parts/', authRole(['user','admin']), getCoursePartsId);
router.get('/:id/parts/:part_id', authRole(['user','admin']), getCourseByIdParts);
router.post('/', authRole(['admin']), createCourse);
router.put('/:id', authRole(['admin']), updateCourse);
router.delete('/:id', authRole(['admin']), deleteCourse);
router.post('/:id/parts', authRole(['admin']), createCourseParts);
router.put('/:id/parts/:part_id', authRole(['admin']), updateCourseParts);
router.delete('/:id/parts/:part_id', authRole(['admin']), deleteCourseParts);


module.exports = router;