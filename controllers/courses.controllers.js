let {courses} = require('../data/courses');
const { validationResult } = require('express-validator')

const getAllCourses = (req, res) => {
    res.json(courses)
}

const getCourse = (req, res) => {
    const courseId = req.params.id;
    const course = courses.find(course => course.id === parseInt(courseId))
    if(!course)   res.status(404).send('Not Found course')

    res.json(course)
}

const createCourse = (req, res) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    const course = { id: courses.length + 1, ...req.body }
    courses.push(course)

    res.status(201).json(course)
}

const updateCourse = (req, res) => {
    const id = req.params.id;
    const findCourse = courses.find(course => course.id === parseInt(id));

    if(!findCourse){
        return res.status(400).json('Course Not Found');
    }

    const course = {...findCourse, ...req.body};

    res.status(200).json(course)

}

const deleteCourse = (req, res) => {

    const id = +req.params.id;
    const findCourse = courses.find(course => course.id === parseInt(id));

    if(!findCourse){
        return res.status(400).json('Course Not Found');
    }

    courses = courses.filter(course => course.id !== id)

    res.status(200).json(courses);
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}