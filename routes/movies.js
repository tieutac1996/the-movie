const router = require('express').Router();
const movieController = require('../controllers/movies');

router.route('/').get(movieController.findAll).post(movieController.add);

router.route('/:category').get(movieController.findByTags);

module.exports = router;
