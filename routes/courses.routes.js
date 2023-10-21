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
const verifyToken = require("../middlewares/verifyToken");
const userRole = require("../utils/userRoles");
const allowedTo = require("../middlewares/allowedTo");



router.route('/')
    .get(verifyToken, getAllCourses)
    .post(validation(), createCourse)

router.route('/:id')
    .get(getCourse)
    .patch(updateCourse)
    .delete(verifyToken, allowedTo(userRole.ADMIN, userRole.MANGER), deleteCourse)

module.exports = router;