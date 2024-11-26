const sharp = require('sharp');
const constants = require('../config/constants');

class ImageProcessor {
  static async optimizeImage(buffer, resizeOptions = {}) {
    try {
      // Get original image info
      const originalMetadata = await sharp(buffer).metadata();

      // Initialize sharp instance
      let imageProcessor = sharp(buffer);

      // Apply resize if options provided
      const shouldResize = resizeOptions.width || resizeOptions.height;
      if (shouldResize) {
        imageProcessor = imageProcessor.resize({
          width: resizeOptions.width,
          height: resizeOptions.height,
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      // Apply optimization
      const optimizedImage = await imageProcessor
        .normalize()
        .webp({
          quality: constants.OUTPUT_QUALITY,
          effort: 6,
          mixed: false,
          smartSubsample: false,
          nearLossless: true,
          reductionEffort: 6,
          force: true,
        })
        .withMetadata()
        .toBuffer({ resolveWithObject: true });

      // If optimization didn't reduce size, return original in WebP format
      if (optimizedImage.info.size >= buffer.length) {
        return {
          buffer: buffer,
          info: {
            format: originalMetadata.format,
            width: originalMetadata.width,
            height: originalMetadata.height,
            size: buffer.length,
            originalSize: buffer.length,
            compressionRatio: '1.00',
            compressionType: 'original',
            resized: shouldResize,
            originalWidth: originalMetadata.width,
            originalHeight: originalMetadata.height,
          },
        };
      }

      return {
        buffer: optimizedImage.data,
        info: {
          format: 'webp',
          width: optimizedImage.info.width,
          height: optimizedImage.info.height,
          size: optimizedImage.info.size,
          originalSize: buffer.length,
          compressionRatio: (buffer.length / optimizedImage.info.size).toFixed(2),
          compressionType: 'compressed',
          resized: shouldResize,
          originalWidth: originalMetadata.width,
          originalHeight: originalMetadata.height,
        },
      };
    } catch (error) {
      throw new Error(`Image processing failed: ${error.message}`);
    }
  }
}

module.exports = ImageProcessor;
