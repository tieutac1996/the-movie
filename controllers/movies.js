const Movie = require('../models/movie.model');

module.exports = {
  findAll: (req, res) => {
    Movie.find()
      .then((movie) => res.json(movie))
      .catch((err) => {
        console.log(res.status(500).json(err));
      });
  },
  findByTags: (req, res) => {
    Movie.find({ tags: req.param.category })
      .then((movie) => res.json(movie))
      .catch((err) => {
        console.log(res.status(500).json(err));
      });
  },
  findByTitle: (req, res) => {
    Movie.find({ title: req.body.title })
      .then((movie) => res.json(movie))
      .catch((err) => {
        console.log(res.status(500).json(err));
      });
  },
  add: (req, res) => {
    const title = req.body.title;
    const tags = req.body.tags;
    const premium = req.body.premium;
    const image = req.body.image;
    const url = req.body.url;

    const newMovie = new Movie({
      title,
      tags,
      premium,
      image,
      url,
    });

    newMovie
      .save()
      .then(() => res.json('Exercise added'))
      .catch((err) => res.status(500).json('Error: ' + err));
  },
};
