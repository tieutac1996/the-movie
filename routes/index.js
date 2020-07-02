const router = require('express').Router();

const movieRoutes = require('./movies');
const bannerRoutes = require('./banners');

router.use('/api/movie', movieRoutes);
router.use('/api/banner', bannerRoutes);

module.exports = router;
