const errorHandler = (err, req, res, next) => {
    if(err.name && err.name === 'custom-error') {
        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }

    res.status(500).send({errors: [{msg: 'Some error happened...'}]});
}

module.exports = errorHandler;