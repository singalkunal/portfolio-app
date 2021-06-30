const { validationResult } = require('express-validator');
const RequestValidationError = require('../errors/request-validation-error');

module.exports = (req***REMOVED*** res***REMOVED*** next) => {
    // console.log("validation result: "***REMOVED*** validationResult(req));
    const errors = validationResult(req).array();
    if(errors.length) {
        throw new RequestValidationError(errors);
***REMOVED***

    next();
}