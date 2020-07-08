const Movie = require('../models/movie.model');
const unlinkAsync = require('./removeImage');
const xoa_dau = require('./xoadau');

module.exports = {
  findAll: (req, res) => {
    if (req.query._page) {
      Movie.find()
        .then((movie) => {
          const start = req.query._page * req.query._limit - req.query._limit;
          const end = start + parseInt(req.query._limit);
          const data = movie.slice(start, end);
          return res.json({
            data: data,
            pagination: {
              _page: req.query._page,
              _limit: req.query._limit,
              _total: movie.length,
            },
          });
        })
        .catch((err) => res.status(50).json(err));
    } else {
      Movie.find()
        .then((movie) => res.json({ data: movie }))
        .catch((err) => res.status(50).json(err));
    }
  },

  findById: (req, res) => {
    Movie.findById(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  findByTitleTag: (req, res) => {
    Movie.find({ title_tag: req.params.title })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  editMovie: (req, res) => {
    Movie.findById(req.body._id)
      .then((e) => {
        e.title = req.body.title;
        e.title_tag = xoa_dau(req.body.title).replace(/ /g, '-').toLowerCase();
        e.tags = req.body.newTags;
        e.image = req.body.image;
        e.poster = req.body.poster;
        e.url = req.body.url;
        e.title_en = req.body.title_en;
        e.director = req.body.director;
        e.release_date = req.body.release_date;
        e.nation = req.body.nation;
        e.evaluate = req.body.evaluate;
        e.duration = req.body.duration;
        e.description = req.body.description;
        e.type = req.body.newType;
        if (req.files.image) {
          // Định dạng file giống nhau sẽ ghi đè
          e.image = '/uploads/film/' + req.files.image[0].filename;

          // Kiểm tra định dạng file khác nhau thì xóa file cũ
          if (req.body.image !== e.image) {
            unlinkAsync('./client/build' + req.body.image);
          }
        }
        if (req.files.poster) {
          // Định dạng file giống nhau sẽ ghi đè
          e.poster = '/uploads/film/' + req.files.poster[0].filename;

          // Kiểm tra định dạng file khác nhau thì xóa file cũ
          if (req.body.poster !== e.poster) {
            unlinkAsync('./client/build' + req.body.poster);
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
    const title = req.body.title.toLowerCase();
    const poster = '/uploads/film/' + req.files.poster[0].filename;
    const tags = req.body.tags;
    const image = '/uploads/film/' + req.files.image[0].filename;
    const url = req.body.url;
    const title_en = req.body.title_en;
    const director = req.body.director;
    const release_date = req.body.release_date;
    const nation = req.body.nation;
    const evaluate = req.body.evaluate;
    const duration = req.body.duration;
    const description = req.body.description;
    const type = req.body.type;
    const title_tag = xoa_dau(req.body.title).replace(/ /g, '-').toLowerCase();
    const newMovie = new Movie({
      title,
      title_en,
      tags,
      image,
      url,
      director,
      release_date,
      nation,
      duration,
      description,
      evaluate,
      type,
      poster,
      title_tag,
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
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  deleteMulti: (req, res) => {
    Movie.deleteMany({
      _id: { $in: req.body },
    })
      .then(() => res.json({ Message: 'Delete Complete' }))
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  getMovieForTag: (req, res) => {
    if (req.query._page) {
      Movie.find()
        .then((movie) => {
          const start = req.query._page * req.query._limit - req.query._limit;
          const end = start + parseInt(req.query._limit);
          const data = movie.filter((filter) => {
            if (filter.tags.search(req.query.tags) > 0) {
              return true;
            }
            return false;
          });
          const newData = data.slice(start, end);
          return res.json({
            data: newData,
            pagination: {
              _page: req.query._page,
              _total: movie.length,
            },
          });
        })
        .catch((err) => res.status(50).json(err));
    } else {
      Movie.find()
        .then((movie) => {
          const data = movie.filter((filter) => {
            if (filter.tags.search(req.query.tags) > 0) {
              return true;
            }
            return false;
          });
          res.json(data);
        })
        .catch((err) => res.status(500).json('Error: ' + err));
    }
  },
  getMovieForType: (req, res) => {
    Movie.find()
      .then((movie) => {
        const data = movie.filter((filter) => {
          if (filter.type.search(req.query.type) > 0) {
            return true;
          }
          return false;
        });

        res.json(data);
      })
      .catch((err) => res.status(500).json('Error: ' + err));
  },
};
