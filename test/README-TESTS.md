1. File Upload
Test: Upload valid file (PDF, DOCX, etc.)
Check: File is stored in data/, document metadata is added to memory (documents array).
Edge cases:
- No file uploaded → returns 400
- Unsupported file type → handled gracefully

2. Document Parsing & Classification
Test: After upload, verify rawText, type, and extractedFields are populated.
Mock LLM: mock the classifyAndExtract() output to avoid real API calls during tests.

3. Test: Send a query to /search?q=term
Check: Returns relevant documents containing that term in their rawText
Edge cases:
- No query provided → returns 400
- Query returns 0 results → empty array

4. Ask Questions
Test: POST /ask with a question
Check: Calls answerQuestionAcrossDocuments and returns LLM response
Edge cases:
- No question → returns 400
- No documents → returns 400
- LLM call fails → returns 500

5. Security & API Key Handling
Test: .env is not pushed
Check: ANTHROPIC_API_KEY is never logged or exposed in frontend or error responses

6. Integration
Test: Upload → parse → search → ask flow end-to-end with mock Claude API