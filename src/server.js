const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server shutting down');
  });
});
