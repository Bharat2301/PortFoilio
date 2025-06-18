const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for local development and Vercel frontend
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Local React app
      'https://port-foilio-nine.vercel.app', // Vercel frontend
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Parse JSON bodies (fixes 415 error)
app.use(express.json());

// Middleware to handle invalid Content-Type errors
app.use((err, req, res, next) => {
  if (err.status === 415) {
    return res.status(415).json({
      code: 415,
      message: 'Unsupported Media Type: Invalid Content-Type or charset',
    });
  }
  next(err);
});

// Contact endpoint
app.post('/contact', (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Basic validation
  if (!firstName || !email || !message) {
    return res.status(400).json({
      code: 400,
      message: 'First name, email, and message are required',
    });
  }

  // Log submission (replace with database or email logic)
  console.log('Received contact form submission:', req.body);

  // Respond with JSON
  res.status(200).json({
    code: 200,
    message: 'Message received successfully',
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Endpoint not found',
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});