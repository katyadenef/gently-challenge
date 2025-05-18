// This mmodule deals with allowing the user to interact with Claude about the available documents

const express = require('express');
const router = express.Router();
const { answerQuestionAcrossDocuments } = require('../services/questionAnswering'); //service that uses Claude

module.exports = (documents) => {
  router.post('/', async (req, res) => {
    const question = req.body.question;
    
    // some errors handling
    if (!question) {
      return res.status(400).json({ error: 'Missing question' });
    }

    if (!documents.length) {
      return res.status(400).json({ error: 'No documents available to answer from.' });
    }

    // actual call to Clause service and answer return
    try {
      const answer = await answerQuestionAcrossDocuments(documents, question);
      res.json({ answer }); // Answer right now is returned as plain text, it of course required prettifying
    } catch (err) {
      console.error('Claude API error:', err.message);
      res.status(500).json({ error: 'LLM query failed' });
    }
  });

  return router;
};
