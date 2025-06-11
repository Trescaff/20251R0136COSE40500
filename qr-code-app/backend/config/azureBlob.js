const { BlobServiceClient } = require('@azure/storage-blob');

// Create a BlobServiceClient using the connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

// Get a reference to the container
const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_CONTAINER_NAME
);

module.exports = containerClient;