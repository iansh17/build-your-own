// Ideas Routes for MAKE YOUR OWN Platform
const express = require('express');
const router = express.Router();

// GET /ideas - Retrieve all ideas
router.get('/', (req, res) => {
  res.json({
    message: 'Retrieve all ideas',
    ideas: []
  });
});

// POST /ideas - Create a new idea
router.post('/', (req, res) => {
  const { title, description, category } = req.body;
  
  // Validation
  if (!title || !description) {
    return res.status(400).json({
      error: 'Title and description are required'
    });
  }
  
  res.status(201).json({
    message: 'Idea created successfully',
    idea: {
      id: Date.now(), // In real implementation, use proper ID generation
      title,
      description,
      category,
      createdAt: new Date().toISOString()
    }
  });
});

// GET /ideas/:id - Retrieve a specific idea
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    message: `Retrieve idea with ID: ${id}`,
    idea: null
  });
});

// PUT /ideas/:id - Update a specific idea
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  res.json({
    message: `Update idea with ID: ${id}`,
    updatedIdea: { id, ...updates }
  });
});

// DELETE /ideas/:id - Delete a specific idea
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    message: `Delete idea with ID: ${id}`,
    deleted: true
  });
});

module.exports = router;