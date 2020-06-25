const Banner = require('../models/banner.model');
const multer = require('multer');

//move image
const fs = require('fs');
const { promisify } = require('util');
const { constants } = require('buffer');
const unlinkAsync = promisify(fs.unlink);

//multer upload file public
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './client/public/upload/banner');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = {
  findAll: (req, res) => {
    Banner.find()
      .then((banner) => res.json(banner))
      .catch((err) => {
        console.log(res.status(500).json(err));
      });
  },
  upload: (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const evaluate = req.body.evaluate;
    const duration = req.body.duration;
    const image = req.file ? '/upload/banner/' + req.file.filename : '';

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
        console.log(res.json('Create Banner Success'));
      })
      .catch((err) => res.status(500).json('Error: ' + err));
  },
  image: upload.single('image'),
  update: (req, res) => {
    // Remove image
    if (req.body.imgRemove) {
      unlinkAsync(req.body.imgRemove);
    }

    Banner.findById(req.params.id)
      .then((e) => {
        e.title = req.body.title;
        e.description = req.body.description;
        e.evaluate = req.body.evaluate;
        e.duration = req.body.duration;
        e.image = req.file ? '/upload/banner/' + req.file.filename : e.image;
        e.save()
          .then(() => {
            console.log(res.json('Upload Success'));
          })
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => {
        console.log(err);
      });
  },
  delete: (req, res) => {
    Banner.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted'))
      .catch((err) => res.status(500).json('Error: ' + err));
  },
};
