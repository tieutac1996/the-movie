const Banner = require('../models/banner.model');

const unlinkAsync = require('./removeImage');

module.exports = {
  findAll: (req, res) => {
    Banner.find().then((data) => {
      res.json(data);
    });
  },
  upload: (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const evaluate = req.body.evaluate;
    const tags = req.body.tags;
    const url = req.body.url;
    const duration = req.body.duration;
    const image = '/uploads/banner/' + req.file.filename;
    const banner = new Banner({
      title,
      description,
      evaluate,
      duration,
      image,
      url,
      tags,
    });
    banner
      .save()
      .then(() => res.json({ Message: 'Upload Complete' }))
      .catch((err) => console.log(err));
  },
  update: (req, res) => {
    Banner.findById(req.params.id)
      .then((e) => {
        e.title = req.body.title;
        e.description = req.body.description;
        e.evaluate = req.body.evaluate;
        e.duration = req.body.duration;
        e.url = req.body.url;
        e.tags = req.body.tags;
        if (req.file) {
          e.image = '/uploads/banner/' + req.file.filename;
        }
        if (req.body.image !== e.image) {
          unlinkAsync('./client/build' + req.body.image);
        }
        e.save()
          .then(() => {
            res.json('Upload Success');
          })
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => {
        console.log(err);
      });
  },
  delete: (req, res) => {
    unlinkAsync('./client/build' + req.body.image);
    Banner.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted'))
      .catch((err) => res.status(500).json('Error: ' + err));
  },
};
