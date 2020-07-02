const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    title_en: { type: String },
    description: { type: String, required: true },
    director: { type: String },
    nation: { type: String },
    release_date: { type: String },
    tags: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    evaluate: { type: Number, required: true },
    premium: { type: Boolean },
    image: { type: String, required: true },
    poster: { type: String, required: true },
    duration: { type: Number },
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
