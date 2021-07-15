const { validationResult } = require('express-validator');
const RequestValidationError = require('../errors/request-validation-error');

module.exports = (req, res, next) => {
    // console.log("validation result: ", validationResult(req));
    var errors = validationResult(req).array();
    if(errors.length) {
        throw new RequestValidationError(errors);
    }

    next();
}