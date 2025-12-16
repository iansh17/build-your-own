// Main Routes for MAKE YOUR OWN Platform
const express = require('express');
const router = express.Router();

// Import individual route modules
const ideaRoutes = require('./ideas');
const projectRoutes = require('./projects');
const authRoutes = require('./auth');

// API version 1 routes
router.use('/ideas', ideaRoutes);
router.use('/projects', projectRoutes);
router.use('/auth', authRoutes);

// Root API info
router.get('/', (req, res) => {
  res.json({
    name: 'MAKE YOUR OWN API',
    version: 'v1.0.0',
    description: 'API for the MAKE YOUR OWN idea-realization platform',
    endpoints: {
      ideas: '/api/v1/ideas',
      projects: '/api/v1/projects',
      auth: '/api/v1/auth'
    }
  });
});

module.exports = router;