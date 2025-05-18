# gently-challenge

This project includes a Node.js backend and a simple HTML UI for document upload, search, and AI-powered question answering.

## 🏃 Getting Started

To run the code locally:

```bash
cd gently-challenge
echo ANTHROPIC_API_KEY=sk-ant-***** >> .env
node index.js
```
Open http://localhost:3000 in your browser.


![alt text](image.png)

## Features

List documents: this page allows you to see all documents available in the system (few documents are preloaded).<br>
Upload documents: this page allows you to select a document from your drive and upload it to the system.<br>
Basic search: search documents by exact test.<br>
Ask AI: talk to Claude about the documents.<br>

## Project structure

gently-challenge/<br>
├── data/           # Uploaded documents are stored here<br>
├── db/             # Mocking a database with an in-memory JS object<br>
├── node_modules/   # All required modules<br>
├── public/         # HTML pages (static endpoints)<br>
├── routes/         # Processes that users can interact with<br>
├── services/       # Internal logic and integrations (Claude, parsing, etc.)<br>
├── index.js        # Main project entry point<br>
├── .env            # Environment variables (not committed)<br>


More details about each file available within the files.
