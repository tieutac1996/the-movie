const Movie = require('../models/movie.model');
const unlinkAsync = require('./removeImage');

module.exports = {
  findAll: (req, res) => {
    Movie.find()
      .then((movie) => res.json(movie))
      .catch((err) => res.status(500).json(err));
  },
  findByTags: (req, res) => {
    Movie.find({ tags: req.param.category })
      .then((movie) => res.json(movie))
      .catch((err) => res.status(500).json(err));
  },
  findById: (req, res) => {
    Movie.findById(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  editMovie: (req, res) => {
    Movie.findById(req.body._id)
      .then((e) => {
        e.title = req.body.title;
        e.tags = req.body.newTags;
        e.premium = req.body.premium;
        e.image = req.body.image;
        e.url = req.body.url;
        e.title_en = req.body.title_en;
        e.director = req.body.director;
        e.release_date = req.body.release_date;
        e.nation = req.body.nation;
        e.evaluate = req.body.evaluate;
        e.duration = req.body.duration;
        e.description = req.body.description;
        e.type = req.body.type;
        if (req.file) {
          // Định dạng file giống nhau sẽ ghi đè
          e.image = '/uploads/film/' + req.file.filename;

          // Kiểm tra định dạng file khác nhau thì xóa file cũ
          if (req.body.image !== e.image) {
            unlinkAsync('./client/build' + req.body.image);
          }
        }
        e.save()
          .then(() => res.json({ Message: 'Edit Complete' }))
          .catch((err) => {
            res.status(500).json('Error: ' + err);
          });
      })
      .catch((err) => {
        console.log(err);
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
    const evaluate = req.body.evaluate;
    const duration = req.body.duration;
    const description = req.body.description;
    const type = req.body.type;
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
      evaluate,
      type,
    });
    newMovie
      .save()
      .then(() => res.json({ Message: 'Upload Complete' }))
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  delete: (req, res) => {
    unlinkAsync('./client/build' + req.body.filename);
    Movie.findByIdAndDelete(req.body.id)
      .then(() =>
        res.json({
          Message: 'Delete Complete',
        })
      )
      .catch((err) => {
        res.status(500).json('Error: ' + err);
      });
  },
  deleteMulti: (req, res) => {
    Movie.deleteMany({
      _id: { $in: req.body },
    })
      .then(() => res.json({ Message: 'Delete Complete' }))
      .catch((err) => {
        console.log(err);
      });
  },
};
