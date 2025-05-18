// generate prompt to classify a document and extract needed fields from uploaded document
const { callClaude } = require('./anthropic');

async function classifyAndExtract(rawText) {
  /* The prompt ideally would include the full list of potential documents,
  as well as the required fields for each document type.
  This is also the place to pass the DB schema to Claude (can be fetched on the fly from PG)
  */
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
    return { // in case of Claude failure we return blank result
      type: 'unknown',
      fields: {},
    };
  }
}

module.exports = { classifyAndExtract };
