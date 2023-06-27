const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bear TOKEN' - accessing second elemento (TOKEN).
        // If the split fails - if we dont have authorization headers.
        throw new Error('Authentication failed!');
        // Validating the token
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        // Adding data to the request
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        // If succed but we dont have a token
        const error = new HttpError('Authentication failed', 401);
        return next(error);
    }
};
