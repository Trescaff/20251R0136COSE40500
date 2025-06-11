const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const containerClient = require('../config/azureBlob');
const Album = require('../models/Album');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to check if album exists
// Upload endpoint: expects `albumCode` + `photo` file
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { albumCode } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const blobName = `${albumCode}/${uuidv4()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype }
    });

    const url = blockBlobClient.url;

    const album = await Album.findOne({ code: albumCode });
    if (!album) return res.status(404).json({ error: 'Album not found' });

    if (album.photos.length >= album.maxPhotos) {
      return res.status(400).json({ error: 'Photo limit reached' });
    }

    album.photos.push({ url });
    await album.save();

    res.json({ url, uploadedAt: new Date() });

  } catch (err) {
    console.error('Photo upload failed:', err);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
});

module.exports = router;