const jwt = require('jsonwebtoken'),
    config = require('../config');

module.exports = {
    isAuthenticated: function (req, res, next) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.headers.authorization ||
            req.cookies.token;
        if (!token) {
            res.status(401).send({success: false, message: 'Unauthorized: No token provided'});
        } else {
            jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
                if (err) {
                    console.log(err, "error")
                    res.status(401).send({success: false, message: 'Unauthorized: Invalid token'});
                } else {
                    req.username = decoded.username;
                    req.email = decoded.email;
                    next();
                }
            });
        }
    }
};
