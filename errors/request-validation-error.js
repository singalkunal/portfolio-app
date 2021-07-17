const CustomError = require("./custom-error");

class RequestValidationError extends CustomError {
    constructor(errors) {
        super('Validation error...');
        this.errors = errors;
        this.statusCode = 400;
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { msg: err.msg,  field: err.param };
        })
    }
};

module.exports = RequestValidationError;