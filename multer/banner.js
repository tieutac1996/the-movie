const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './client/build/uploads/banner');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '.' + file.mimetype.split('/')[1]);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
