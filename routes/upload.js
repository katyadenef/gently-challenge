// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { extractTextFromFile } = require('../services/docsParser');
const { classifyAndExtract } = require('../services/classifyAndExtract');

module.exports = (documents) => {
  const router = express.Router();

  // uploadDir setup
  const uploadDir = path.join(__dirname, '../data');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    }
  });

  const upload = multer({ storage });

  router.post('/', upload.single('document'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const newDoc = {
      id: Date.now(),
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      uploadedAt: new Date().toISOString(),
      type: null,
      extractedFields: null,
      rawText: null
    };

    try {
      newDoc.rawText = await extractTextFromFile(req.file.path, req.file.mimetype);
      const result = await classifyAndExtract(newDoc.rawText);
      newDoc.type = result.type;
      newDoc.extractedFields = result.fields;
    } catch (err) {
      console.error('Processing failed:', err.message);
    }

    documents.push(newDoc);

    res.json({ message: 'File uploaded and processed', document: newDoc });
  });

  return router;
};
