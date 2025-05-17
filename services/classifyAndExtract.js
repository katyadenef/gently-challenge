// services/classifyAndExtract.js
const { callClaude } = require('./anthropic');

async function classifyAndExtract(rawText) {
  const prompt = `
    You are an intelligent document processing assistant.

    Given the following document text, do two things:
    1. Classify the type of document (e.g. invoice, purchase order).
    2. Extract key fields relevant to that type in structured JSON format.

    Return your response as:
    {
    "type": "<document-type>",
    "fields": {
        ...
    }
    }

    Document text:
    ---
    ${rawText}
  `;
  const responseText = await callClaude(prompt);

  try {
    return JSON.parse(responseText);
  } catch (err) {
    console.error('Failed to parse LLM response:', responseText);
    return {
      type: 'unknown',
      fields: {},
    };
  }
}

module.exports = { classifyAndExtract };
