// routes/documents.js

const express = require('express');

module.exports = (documents) => {
  const router = express.Router();

  // GET /documents - return all uploaded documents
  router.get('/', (req, res) => {
    res.json(documents);
  });

  // GET /documents/:id - return a specific document by ID
  router.get('/:id', (req, res) => {
    const doc = documents.find(d => d.id == req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(doc);
  });

  return router;
};
