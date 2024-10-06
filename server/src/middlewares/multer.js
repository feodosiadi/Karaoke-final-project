const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('audio')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = upload;
