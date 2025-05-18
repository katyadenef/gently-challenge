// service to parse an uploaded document to plain text
// for the sake of simplicity supporting pdf and docx only

const fs = require('fs');
const pdfParse = require('pdf-parse'); // for pdf
const mammoth = require('mammoth'); // for docx

async function extractTextFromFile(filePath, mimetype) {
  const buffer = fs.readFileSync(filePath);

  if (mimetype === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error(`Unsupported file type: ${mimetype}`);
}

module.exports = { extractTextFromFile };
