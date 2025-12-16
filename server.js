// Simple server for MAKE YOUR OWN platform
const express = require('express');
const path = require('path');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API route for ideas
app.post('/api/ideas', (req, res) => {
  const { idea } = req.body;
  
  if (!idea) {
    return res.status(400).json({ error: 'Idea is required' });
  }
  
  // Simulate processing the idea
  setTimeout(() => {
    res.json({
      success: true,
      message: `I understand your idea: "${idea}". This is a great start!`,
      nextSteps: [
        "Refine your concept",
        "Choose features",
        "Design the experience",
        "Build and test"
      ]
    });
  }, 500); // Simulate a small delay for processing
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'MAKE YOUR OWN platform is running',
    timestamp: new Date().toISOString()
  });
});

// Catch-all route to serve the main page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MAKE YOUR OWN platform server running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

module.exports = app;