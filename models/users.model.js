const mongoose = require('mongoose');
const validator = require('validator');
const userRole = require('../utils/userRoles');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Email must be valid']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [userRole.ADMIN, userRole.USER, userRole.MANGER],
        default: userRole.USER,
    },
    avatar: {
        type: String,
        default: 'uploads/avatar.jpg'
    }
})

module.exports = mongoose.model('Users', userSchema);