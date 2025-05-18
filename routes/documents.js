// The module to list all documents and view specific ones

const express = require('express');

module.exports = (documents) => {
  const router = express.Router();

  // GET /documents - returns all uploaded documents
  router.get('/', (req, res) => {
    res.json(documents);
  });

  // GET /documents/:id - returns a specific document by ID (as stored in the DB, not the raw doc)
  router.get('/:id', (req, res) => {
    const doc = documents.find(d => d.id == req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(doc);
  });

  return router;
};
