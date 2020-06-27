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
    const image = '/uploads/film/' + req.file.filename;
    const url = req.body.url;
    const title_en = req.body.title_en;
    const director = req.body.director;
    const release_date = req.body.release_date;
    const nation = req.body.nation;
    const duration = req.body.duration;
    const description = req.body.description;
    const newMovie = new Movie({
      title,
      title_en,
      tags,
      premium,
      image,
      url,
      director,
      release_date,
      nation,
      duration,
      description,
    });
    newMovie
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json('Error: ' + err));
  },
};
