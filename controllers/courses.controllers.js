let {courses} = require('../data/courses');
const { validationResult } = require('express-validator')
const CoursesDB = require('../models/course.model');

const getAllCourses = async (req, res) => {
    const courses = await CoursesDB.find();
    res.json(courses)
}

const getCourse = async (req, res) => {
    try{
        const course = await CoursesDB.findById(req.params.id)

        if(!course) {
          return res.status(404).send('Not Found course')
        }
    
        return res.json(course)
    } catch(err) {
        return res.status(404).send('Not Valid Object ID')
    }

}

const createCourse = async (req, res) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    const course = new CoursesDB(req.body)

    await course.save()

    res.status(201).json(course)
}

const updateCourse = async (req, res) => {
    const id = req.params.id;
    try{
        const findCourse = await CoursesDB.updateOne({_id: id}, {$set: { ...req.body}})
        return res.status(200).json(findCourse)
    
    } catch(err) {
        return res.status(400).send('Not Valid Object ID')
    }
}

const deleteCourse = async (req, res) => {
    const id = req.params.id;
    try{
        const deleted = await CoursesDB.deleteOne({_id: id})
    
        res.status(200).json({success: true, deleted});
    } catch(err) {
        return res.status(400).send('Not Valid Object ID')
    }

}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}