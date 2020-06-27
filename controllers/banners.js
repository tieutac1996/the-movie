const Banner = require('../models/banner.model');

//Remove Image
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

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
    const duration = req.body.duration;
    const image = '/uploads/' + req.file.filename;

    const banner = new Banner({
      title,
      description,
      evaluate,
      duration,
      image,
    });
    banner
      .save()
      .then(() => {
        res.json('Create Banner Success');
      })
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  update: (req, res) => {
    //Remove image
    if (req.body.imgRemove) {
      unlinkAsync(req.body.imgRemove);
    }

    Banner.findById(req.params.id)
      .then((e) => {
        e.title = req.body.title;
        e.description = req.body.description;
        e.evaluate = req.body.evaluate;
        e.duration = req.body.duration;
        e.image = req.file ? '/uploads/' + req.file.filename : e.image;
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
    unlinkAsync('./client/public' + req.body.image);
    Banner.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted'))
      .catch((err) => res.status(500).json('Error: ' + err));
  },
};
