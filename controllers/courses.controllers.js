let {courses} = require('../data/courses');
const { validationResult } = require('express-validator')
const CoursesDB = require('../models/course.model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const AppError = require('../utils/appError');

const getAllCourses = asyncWrapper(
    async (req, res) => {

        const limit = req.query.limit || 0;
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;

        const courses = await CoursesDB.find({}, {'__v': false}).limit(limit).skip(skip);
        res.json({status: 'success', data : courses})

    }
)

const getCourse = asyncWrapper( 
    async (req, res, next) => {
        
        const course = await CoursesDB.findById(req.params.id)
        if(!course) {
            const error = AppError.create('Not Found course' , 404, 'fail')
            next(error)
        }
        return res.json({status: 'success', data: { course }})
    }
)

const createCourse = asyncWrapper(
        async (req, res, next) => {

        const errors = validationResult(req);
        
        if(!errors.isEmpty()){

            const error = AppError.create(errors.array(), 400, 'fail');
            next(error)
        }

        const course = new CoursesDB(req.body)

        await course.save()

        res.status(201).json({status: 'success', data: { course }})
    }
)

const updateCourse = asyncWrapper(
    
    async (req, res, next) => {
        const id = req.params.id;
        const findCourse = await CoursesDB.updateOne({_id: id}, {$set: { ...req.body}})
        res.status(200).json({status: 'success', data: { course: findCourse}})
    }
)

const deleteCourse = asyncWrapper(
    async (req, res) => {
        const id = req.params.id;
        const deleted = await CoursesDB.deleteOne({_id: id})
        res.status(200).json({status: 'success', data: null});
    }
)

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}