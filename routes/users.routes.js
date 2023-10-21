const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const AppError = require('../utils/appError');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb){
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0];

    if(fileType === 'image'){
        return cb(null, true);
    } else {
        const error = AppError.create('you must upload Image only', 400)
        return cb(error, false)
    }
}

const upload = multer({storage, fileFilter})

const {
    getAllUsers,
    register,
    login
} = require('../controllers/users.controllers');


router.get('/',verifyToken, getAllUsers)
router.post('/register', upload.single('avatar'), register)
router.post('/login', login)

module.exports = router;