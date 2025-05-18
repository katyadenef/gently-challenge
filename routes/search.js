// Exact text matching search

const express = require('express');
const router = express.Router();

module.exports = (documents) => {
  router.get('/', (req, res) => {
    const q = (req.query.q || '').toLowerCase();
    // error handling
    if (!q) return res.json([]);

    // simple filter of documents by filename, type and content
    const results = documents.filter(doc =>
      doc.filename.toLowerCase().includes(q) ||
      doc.type?.toLowerCase().includes(q) ||
      doc.rawText?.toLowerCase().includes(q)
    );

    res.json(results);
  });

  return router;
};
