const AppError = require("../utils/appError");

module.exports = (...roles) => {

    return (req, res, next) => {
        const role = req.currentUser.role;
        if(!roles.includes(role)){
            const error = AppError.create('this role is not authorized', 401, 'fail');
            return next(error);
        }
        next()
    }
}