const express = require('express');
const BadRequestError  = require('../errors/bad-request-error');

const RequireAuth = (req, res, next) => {
    // console.log('req-auth middleware:', req.cookies, req.session, req.signedCookies);
    if(!req.currentUser) {
        throw new BadRequestError('Not authorized...', 403);
    }
    next();
};

module.exports = RequireAuth;