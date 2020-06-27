const router = require('express').Router();
const movieController = require('../controllers/movies');

const upload = require('../multer/movie');

router
  .route('/')
  .get(movieController.findAll)
  .post(upload.single('image'), movieController.add);

router.route('/:category').get(movieController.findByTags);

module.exports = router;
