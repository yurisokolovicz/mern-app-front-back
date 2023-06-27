const express = require('express'); // Importing express
// using express validator
const { check } = require('express-validator');
const { getPlaceById } = require('../controllers/places-controller');
const placesControllers = require('../controllers/places-controller'); // Importing controllers containing the midleware functions.
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// Pointing to the midlewares
router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);
// validating the title with express validator to check if it is not empty, the description length to min 5 characters, and address to not be empty.

// The routos: post (for createing a new place), patch (update a place) and delete (for deleting a place) must be protected with token - for this we add a middleware 'router.use()' before the code reach them (post, patch and delete).
router.use(checkAuth);

router.post(
    '/',
    fileUpload.single('image'),
    [check('title').not().isEmpty(), check('description').isLength({ min: 5 }), check('address').not().isEmpty()],
    placesControllers.createPlace
);

router.patch('/:pid', [check('title').not().isEmpty(), check('description').isLength({ min: 5 })], placesControllers.updatePlace);

router.delete('/:pid', placesControllers.deletePlace);

// Export the router to apps.js
module.exports = router;
