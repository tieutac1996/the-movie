const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  evaluate: { type: Number, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: true },
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
