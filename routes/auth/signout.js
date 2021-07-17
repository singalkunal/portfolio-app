const express = require('express');
const currentUser = require('../../middlewares/current-user');
const RequireAuth = require('../../middlewares/require-auth');

const router = express.Router();

router.delete('/api/users/signout',
currentUser,
RequireAuth,
(req, res) => {
    req.session = null;
    res.sendStatus(200);
});

module.exports = router;