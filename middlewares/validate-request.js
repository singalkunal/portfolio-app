const { validationResult } = require('express-validator');
const RequestValidationError = require('../errors/request-validation-error');

module.exports = (req, res, next) => {
    var errors = validationResult(req).array();
    if(errors.length) {
        throw new RequestValidationError(errors);
    }

    next();
}