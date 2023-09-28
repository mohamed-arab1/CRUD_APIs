const express = require("express");
const router = express.Router();
const {validation} = require('../middlewares/validationSchema')
const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/courses.controllers");



router.route('/')
    .get( getAllCourses)
    .post(validation(), createCourse)

router.route('/:id')
    .get(getCourse)
    .patch(updateCourse)
    .delete(deleteCourse)

module.exports = router;