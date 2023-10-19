const asyncWrapper = require('../middlewares/asyncWrapper');
const usersDB = require('../models/users.model');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/generateJWT');


const getAllUsers = asyncWrapper(
    async (req, res, next) => {

        const limit = req.query.limit || 0;
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;

        const users = await usersDB.find({}, {'__v': false, 'password': false, 'token': false}).limit(limit).skip(skip);
        res.json({status: 'success', data : users})
    }
);

const register = asyncWrapper(
    async (req, res, next) => {
        const { firstName, lastName, email, password } = req.body;
        const oldUser = await usersDB.findOne({email: email})

        if(oldUser){
            const error = AppError.create('user already exists', 400, 'fail')
            return next(error)
        }

        const hashingPassword = await bcrypt.hash(password, 8)

        const user = new usersDB({
            firstName,
            lastName,
            email,
            password: hashingPassword
        });
        
        const token = await jwt({email: user.email, id: user._id});

        user.token = token;

        await user.save();

        res.status(201).json({status: 'success', data: { user }})
    }
) 

const login = asyncWrapper(
    async (req, res, next) => {
        const {email, password} = req.body;

        if(!email && !password){
            const error = AppError.create('Email and password are required', 400, 'fail')
            next(error);
        }

        const user = await usersDB.findOne({email: email});
        if(!user){
            const error = AppError.create('user not found', 400, 'fail')
            return next(error)
        }
        const matchedPassword = await bcrypt.compare(password, user.password);

        if(user && matchedPassword){
            const token = await jwt({email: user.email, id: user._id});
            res.json({status: 'success', data : {token}})
        } else {
            const error = AppError.create('Something Wrong', 500, 'error')
            next(error);
        }
    }
) 

module.exports = {
    getAllUsers,
    register,
    login
}