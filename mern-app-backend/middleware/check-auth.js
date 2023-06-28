const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        // required adjustments to endure our OPTION request is not blocked
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN' - accessing second elemento (TOKEN).
        // If the split fails - if we dont have authorization headers.
        if (!token) {
            throw new Error('Authentication failed!');
        }
        // Validating the token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        // Adding data to the request
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        // If succed but we dont have a token
        const error = new HttpError('Authentication failed', 403); // 403 - Forbidden
        return next(error);
    }
};
