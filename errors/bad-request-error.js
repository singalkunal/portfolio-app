const CustomError = require("./custom-error");

class BadRequestError extends CustomError {
    constructor(msg, statusCode, field) {
        super('Bad request error');
        this.msg = msg;
        this.statusCode = statusCode || 500;
        this.field = field;
    }

    serializeErrors() {
        return [{ msg: this.msg, field: this.field }];
    }
};

module.exports = BadRequestError;