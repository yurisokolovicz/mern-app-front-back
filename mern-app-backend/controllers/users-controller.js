const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // library to encrypt (hash) the passwords
const jwt = require('jsonwebtoken'); // library to create token

const HttpError = require('../models/http-error');
const User = require('../models/user');

// Send a request that returns all the users stored in db
const getUsers = async (req, res, next) => {
    // users = User.find({}, 'email name'); it is the same:

    let users;
    try {
        // returns all user object information except password
        users = await User.find({}, '-password');
        // users = User.find({}, 'email name'); it is the same:
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later', 500);
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const { name, email, password } = req.body;
    // email validation
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Sign up failed, please try again later', 500);
        return next(error);
    }
    // If we have existingUser
    if (existingUser) {
        const error = new HttpError('User exists already, please login instead', 422);
        return next(error);
    }

    // Encrypt the password - hashing with bcryptjs
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError('Could not create user, please try again', 500);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: req.file.path,
        password: hashedPassword,
        places: []
    });
    // Saving the user
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again', 500);
        return next(error);
    }

    // Generating token im the backend
    let token;
    try {
        token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_KEY, { expiresIn: '1h' });
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again', 500);
        return next(error);
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    // email validation
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Logging in failed, please try again later', 500);
        return next(error);
    }
    // check if email and password hashed is correct
    if (!existingUser) {
        const error = new HttpError('Invalid credentials, could not log you in', 403); // Forbidden
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Could not log you in, please check your credentials and try again.', 500);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials, could not log you in', 403);
        return next(error);
    }

    // Generating token im the backend
    let token;
    try {
        //TODO: Check if its jwt.login or jwt.sign
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_KEY, { expiresIn: '1h' });
    } catch (err) {
        const error = new HttpError('Logging up failed, please try again', 500);
        return next(error);
    }

    res.json({ userId: existingUser.id, email: existingUser.email, token: token });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
