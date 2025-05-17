// routes/ask.js
const express = require('express');
const router = express.Router();
const { answerQuestionAcrossDocuments } = require('../services/questionAnswering');

module.exports = (documents) => {
  router.post('/', async (req, res) => {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({ error: 'Missing question' });
    }

    if (!documents.length) {
      return res.status(400).json({ error: 'No documents available to answer from.' });
    }

    try {
      const answer = await answerQuestionAcrossDocuments(documents, question);
      res.json({ answer });
    } catch (err) {
      console.error('Claude API error:', err.message);
      res.status(500).json({ error: 'LLM query failed' });
    }
  });

  return router;
};
