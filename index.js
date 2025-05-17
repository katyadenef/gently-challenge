// index.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const { documents } = require('./db/mockPG');
const uploadRoute = require('./routes/upload')(documents);
const documentsRoute = require('./routes/documents')(documents);
const searchRoute = require('./routes/search')(documents);
const askRoute = require('./routes/ask')(documents);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/upload', uploadRoute);
app.use('/documents', documentsRoute);
app.use('/search', searchRoute);
app.use('/ask', askRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
