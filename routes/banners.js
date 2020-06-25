const router = require('express').Router();

const bannerController = require('../controllers/banners');

router
  .route('/')
  .get(bannerController.findAll)
  .post(bannerController.image, bannerController.upload);

router
  .route('/:id')
  .put(bannerController.image, bannerController.update)
  .delete(bannerController.delete);
module.exports = router;
