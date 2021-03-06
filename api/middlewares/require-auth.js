const express = require('express');
const BadRequestError  = require('../errors/bad-request-error');

const RequireAuth = (req, res, next) => {
    if(!req.currentUser) {
        throw new BadRequestError('Not authorized...', 403);
    }
    next();
};

module.exports = RequireAuth;