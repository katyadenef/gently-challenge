const { callClaude } = require('./anthropic');

/**
 * Combines all document rawText and asks a question about them.
 * @param {Array} documents - Array of document objects.
 * @param {string} question - The user's natural language question.
 * @returns {Promise<string>} - Claude's answer.
 */
async function answerQuestionAcrossDocuments(documents, question) {
  if (!documents.length) {
    return 'No documents available to answer from.';
  }

  const context = documents
    .map(doc => `Filename: ${doc.filename}\n${doc.rawText}`)
    .join('\n\n---\n\n');

  const prompt = `
You are an intelligent assistant that answers questions about uploaded documents such as invoices and purchase orders.

Here are the documents:
${context}

Question: ${question}
Answer:
  `.trim();

  return await callClaude(prompt);
}

module.exports = { answerQuestionAcrossDocuments };
