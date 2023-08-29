const jwt = require('jsonwebtoken');
const { createErr } = require('./error');

exports.verifyToken = (req, res, next) => {
    const token = req.header('authToken');

    if (!token) return next(createErr(401, "You are not authenticated!"))

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return next(createErr(403, "Token is not valid!"))
        req.user = user
        next()
    })
}