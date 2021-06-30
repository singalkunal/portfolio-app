const CustomError = require("./custom-error");

class RequestValidationError extends CustomError {
    constructor(errors) {
        super('Validation error...');
        this.errors = errors;
        this.statusCode = 400;
***REMOVED***

    serializeErrors() {
        return this.errors.map(err => {
            return { msg: err.msg***REMOVED***  field: err.param };
    ***REMOVED***)
***REMOVED***
};

module.exports = RequestValidationError;