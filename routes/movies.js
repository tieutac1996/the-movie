const router = require('express').Router();
const movieController = require('../controllers/movies');

const upload = require('../multer/movie');

router
  .route('/')
  .get(movieController.findAll)
  .post(upload.single('image'), movieController.add)
  .delete(movieController.delete)
  .put(upload.single('image'), movieController.editMovie);
router.route('/:id').get(movieController.findById);
router.route('/s').post(movieController.deleteMulti);
router.route('/:category').get(movieController.findByTags);

module.exports = router;
