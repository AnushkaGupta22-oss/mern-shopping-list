const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {

    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }

    try {

        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Add user from payload
        req.user = decoded;

        next();

    } catch (e) {

        res.status(400).json({
            msg: 'Token is not valid'
        });

    }

};