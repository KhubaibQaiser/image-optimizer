const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File size too large. Maximum size is 50MB.',
      });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({
    error: 'Internal server error',
  });
};

module.exports = errorHandler;
