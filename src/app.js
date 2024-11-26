const express = require('express');
const cors = require('cors');
const upload = require('./middleware/upload');
const errorHandler = require('./middleware/errorHandler');
const ImageController = require('./controllers/imageController');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Image optimization API is running' });
});

app.post('/api/optimize', upload.single('image'), ImageController.optimizeImage);

app.use(errorHandler);

module.exports = app;
