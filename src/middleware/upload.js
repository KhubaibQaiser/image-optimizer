const multer = require('multer');
const constants = require('../config/constants');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!constants.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WebP are allowed.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: constants.MAX_FILE_SIZE,
  },
});

module.exports = upload;
