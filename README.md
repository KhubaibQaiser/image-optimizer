# Image Optimizer API

A Node.js API for optimizing images using the Sharp library. This API allows you to upload images, compress them, and optionally resize them while maintaining high quality. It supports various image formats including JPG, JPEG, PNG, and WebP.

## Features

- **Image Compression**: Reduces image file sizes significantly without losing quality.
- **Optional Resizing**: Resize images by specifying width and height.
- **Supports Multiple Formats**: Accepts JPG, JPEG, PNG, and WebP formats.
- **Lossless and Lossy Compression**: Offers both lossless and lossy compression options.
- **Detailed Response**: Provides information about the original and compressed image sizes, compression ratio, and more.

## Technologies Used

- Node.js
- Express.js
- Sharp (for image processing)
- Multer (for handling file uploads)
- CORS (for cross-origin requests)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/image-optimizer-api.git
   cd image-optimizer-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The server will run on `http://localhost:3000`.

### API Endpoints

#### Optimize Image

- **POST** `/api/optimize`
  
  Upload an image and optionally specify width and height for resizing.

  **Request Body** (form-data):
  - `image`: The image file to be optimized (required).
  - `width`: The desired width for resizing (optional).
  - `height`: The desired height for resizing (optional).

  **Response**:
  - Returns the optimized image in WebP format as a downloadable file.
  - Includes headers with original size, compressed size, compression ratio, and more.

### Example Usage with Postman

1. Create a new POST request to `http://localhost:3000/api/optimize`.
2. In the Body tab, select `form-data`.
3. Add the following fields:
   - Key: `image` (Type: File) - Select your image file.
   - Key: `width` (Type: Text) - Enter desired width (optional).
   - Key: `height` (Type: Text) - Enter desired height (optional).
4. Send the request and download the optimized image.

### Deployment

This API can be deployed on platforms like Vercel. The `vercel.json` file is included for easy deployment.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing library.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Multer](https://github.com/expressjs/multer) - Middleware for handling `multipart/form-data`.

---

Feel free to contribute to this project by submitting issues or pull requests!
