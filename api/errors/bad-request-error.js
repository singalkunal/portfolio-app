const CustomError = require("./custom-error");

class BadRequestError extends CustomError {
    constructor(msg***REMOVED*** statusCode***REMOVED*** field) {
        super('Bad request error');
        this.msg = msg;
        this.statusCode = statusCode || 500;
        this.field = field;
***REMOVED***

    serializeErrors() {
        return [{ msg: this.msg***REMOVED*** field: this.field }];
***REMOVED***
};

module.exports = BadRequestError;