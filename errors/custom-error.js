class CustomError extends Error {
    constructor(logMsg) {
        super(logMsg);

        Error.captureStackTrace(this, this.constructor);
        this.name = 'custom-error';
    }
};

module.exports = CustomError;