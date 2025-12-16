// MAKE YOUR OWN Platform Entry Point
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import configuration
const config = require('./config/index');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/v1', require('./routes'));

// New API route for ideas
app.post('/api/ideas', (req, res) => {
  const { idea } = req.body;
  
  if (!idea) {
    return res.status(400).json({ error: 'Idea is required' });
  }
  
  // In a real implementation, this would connect to your AI processing
  // For now, we'll simulate a successful response
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
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'MAKE YOUR OWN platform is running',
    timestamp: new Date().toISOString()
  });
});

// Catch-all route for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const PORT = process.env.PORT || config.port || 3000;

app.listen(PORT, () => {
  console.log(`MAKE YOUR OWN platform server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;