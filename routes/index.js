const router = require('express').Router();

const movieRoutes = require('./movies');
const bannerRoutes = require('./banners');

router.use('/movie', movieRoutes);
router.use('/banner', bannerRoutes);

module.exports = router;
