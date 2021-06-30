class CustomError extends Error {
    constructor(logMsg) {
        super(logMsg);

        Error.captureStackTrace(this***REMOVED*** this.constructor);
        this.name = 'custom-error';
***REMOVED***
};

module.exports = CustomError;