const errorHandler = (err***REMOVED*** req***REMOVED*** res***REMOVED*** next) => {
    if(err.name && err.name === 'custom-error') {
        return res.status(err.statusCode).send({errors: err.serializeErrors()***REMOVED***
***REMOVED***

    console.log('My Error handler: '***REMOVED*** err);
    res.status(500).send({errors: [{msg: 'Some error happened...'}]***REMOVED***
}

module.exports = errorHandler;