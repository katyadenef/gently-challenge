// services/anthropic.js
const axios = require('axios');

// Add some debugging to check if the API key is loaded
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.warn('WARNING: ANTHROPIC_API_KEY environment variable is not set');
}

async function callClaude(prompt, model = 'claude-3-haiku-20240307') {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data?.content?.[0]?.text || '';
  } catch (err) {
    console.error('Claude API error:', JSON.stringify(err.response?.data || err.message));
    throw err;
  }
}

module.exports = { callClaude };