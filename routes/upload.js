/* Uploading new documents.
 Newly uploaded documents pass 3 steps:
 1. Store the document in ../data folder
 2. Parse the document
 3. Extract significant fields using Claude
 Supported formats: .pdf, .docx
*/

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { extractTextFromFile } = require('../services/docsParser');
const { classifyAndExtract } = require('../services/classifyAndExtract');

module.exports = (documents) => {
  const router = express.Router();

  // uploadDir setup, in case it doesn't exist
  const uploadDir = path.join(__dirname, '../data');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  // Using multer module to handle upload
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`; // add date to doc name to make sure it's unique
      cb(null, filename);
    }
  });

  const upload = multer({ storage });

  router.post('/', upload.single('document'), async (req, res) => {
    // error handling
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const newDoc = {
      id: Date.now(),
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      uploadedAt: new Date().toISOString(),
      // the below fields to be filled by Claude later
      type: null,
      extractedFields: null,
      rawText: null
    };

    try {
      // both extracts are available in services folder
      newDoc.rawText = await extractTextFromFile(req.file.path, req.file.mimetype);
      const result = await classifyAndExtract(newDoc.rawText);
      newDoc.type = result.type; // e.g., invoice, purchase order
      newDoc.extractedFields = result.fields;
    } catch (err) {
      console.error('Processing failed:', err.message);
    }

    // add the new document to the DB
    // TODO need smart handling of the exact fields we require for our DB: shouldn't push to DB if some crucial fields are not available 
    documents.push(newDoc);

    res.json({ message: 'File uploaded and processed', document: newDoc });
  });

  return router;
};
