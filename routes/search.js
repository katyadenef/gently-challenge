// routes/search.js

const express = require('express');
const router = express.Router();

module.exports = (documents) => {
  router.get('/', (req, res) => {
    const q = (req.query.q || '').toLowerCase();
    if (!q) return res.json([]);

    const results = documents.filter(doc =>
      doc.filename.toLowerCase().includes(q) ||
      doc.type?.toLowerCase().includes(q) ||
      doc.rawText?.toLowerCase().includes(q)
    );

    res.json(results);
  });

  return router;
};
