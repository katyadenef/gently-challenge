// instead of actually setting up a PG DB I am using JS in-memory object to store uploaded docs

/* TODO
1. The tables and the exact list of expected fields per document type need to be predefined.
2. Original raw document needs to be stored (e.g., in S3)
*/

// This is a small list of predefined documents so the system has something to work with before the first upload.
const documents = [
  {
    id: 1,
    filename: 'invoice-1001.pdf',
    path: './data/invoice-1001.pdf',
    mimetype: 'application/pdf',
    uploadedAt: new Date().toISOString(),
    type: 'invoice',
    rawText: 'Invoice #1001\nClient: Acme Corp\nAmount: $1,200.00\nDate: 2025-01-10\nDue: 2025-01-31',
    extractedFields: {
      invoiceNumber: '1001',
      client: 'Acme Corp',
      amount: '$1,200.00',
      date: '2025-01-10',
      dueDate: '2025-01-31'
    }
  },
  {
    id: 2,
    filename: 'invoice-1002.pdf',
    path: './data/invoice-1002.pdf',
    mimetype: 'application/pdf',
    uploadedAt: new Date().toISOString(),
    type: 'invoice',
    rawText: 'Invoice #1002\nClient: Globex Inc\nAmount: $980.00\nDate: 2025-02-14\nDue: 2025-03-14',
    extractedFields: {
      invoiceNumber: '1002',
      client: 'Globex Inc',
      amount: '$980.00',
      date: '2025-02-14',
      dueDate: '2025-03-14'
    }
  },
  {
    id: 3,
    filename: 'invoice-1003.pdf',
    path: './data/invoice-1003.pdf',
    mimetype: 'application/pdf',
    uploadedAt: new Date().toISOString(),
    type: 'invoice',
    rawText: 'Invoice #1003\nClient: Initech\nAmount: $2,350.00\nDate: 2025-03-01\nDue: 2025-03-30',
    extractedFields: {
      invoiceNumber: '1003',
      client: 'Initech',
      amount: '$2,350.00',
      date: '2025-03-01',
      dueDate: '2025-03-30'
    }
  },
  {
    id: 4,
    filename: 'po-2001.pdf',
    path: './data/po-2001.pdf',
    mimetype: 'application/pdf',
    uploadedAt: new Date().toISOString(),
    type: 'purchase_order',
    rawText: 'PO #2001\nSupplier: Umbrella Corp\nTotal: $5,000.00\nItems: 25\nDelivery Date: 2025-04-10',
    extractedFields: {
      poNumber: '2001',
      supplier: 'Umbrella Corp',
      total: '$5,000.00',
      items: 25,
      deliveryDate: '2025-04-10'
    }
  },
  {
    id: 5,
    filename: 'po-2002.pdf',
    path: './data/po-2002.pdf',
    mimetype: 'application/pdf',
    uploadedAt: new Date().toISOString(),
    type: 'purchase_order',
    rawText: 'PO #2002\nSupplier: Stark Industries\nTotal: $7,800.00\nItems: 40\nDelivery Date: 2025-05-01',
    extractedFields: {
      poNumber: '2002',
      supplier: 'Stark Industries',
      total: '$7,800.00',
      items: 40,
      deliveryDate: '2025-05-01'
    }
  }
];

module.exports = { documents };
