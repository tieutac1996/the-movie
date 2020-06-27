const router = require('express').Router();

const bannerController = require('../controllers/banners');
const upload = require('../multer/banner');

router
  .route('/')
  .post(upload.single('image'), bannerController.upload)
  .get(bannerController.findAll);

router
  .route('/:id')
  .put(upload.single('image'), bannerController.update)
  .delete(bannerController.delete);

module.exports = router;
