const ImageProcessor = require('../utils/imageProcessor');

class ImageController {
  static async optimizeImage(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      // Get resize options from form-data
      const resizeOptions = {
        width: req.body.width ? parseInt(req.body.width) : undefined,
        height: req.body.height ? parseInt(req.body.height) : undefined,
      };

      // Validate resize parameters if provided
      if (resizeOptions.width || resizeOptions.height) {
        if (
          (resizeOptions.width && isNaN(resizeOptions.width)) ||
          (resizeOptions.height && isNaN(resizeOptions.height)) ||
          (resizeOptions.width && resizeOptions.width <= 0) ||
          (resizeOptions.height && resizeOptions.height <= 0)
        ) {
          return res.status(400).json({
            error: 'Invalid resize parameters. Width and height must be positive numbers.',
          });
        }
      }

      const result = await ImageProcessor.optimizeImage(req.file.buffer, resizeOptions);

      res.setHeader('Content-Type', 'image/webp');
      res.setHeader('Content-Length', result.buffer.length);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${req.file.originalname.split('.')[0]}_${result.info.compressionType}${result.info.resized ? '_resized' : ''}.webp"`
      );

      // Add image info headers
      res.setHeader('X-Original-Size', result.info.originalSize);
      res.setHeader('X-Compressed-Size', result.info.size);
      res.setHeader('X-Compression-Ratio', result.info.compressionRatio);
      res.setHeader('X-Compression-Type', result.info.compressionType);
      res.setHeader('X-Image-Width', result.info.width);
      res.setHeader('X-Image-Height', result.info.height);
      if (result.info.resized) {
        res.setHeader('X-Original-Width', result.info.originalWidth);
        res.setHeader('X-Original-Height', result.info.originalHeight);
      }

      return res.send(result.buffer);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ImageController;
