const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Album = require('../models/Album');
const { generateQRCode } = require('../utils/qrGenerator');

const router = express.Router();

// Create new album + QR
router.post('/', async (req, res) => {
  const { maxPhotos } = req.body;
  const code = uuidv4().slice(0, 8);
  const album = await Album.create({ code, maxPhotos, photos: [] });
  const url = `${process.env.FRONTEND_URL}/upload/${code}`;
  const qrDataUrl = await generateQRCode(url);
  res.json({ code, qrDataUrl });
});

// Get album details
router.get('/:code', async (req, res) => {
  const album = await Album.findOne({ code: req.params.code });
  if (!album) return res.status(404).json({ error: 'Not found' });
  res.json(album);
});

module.exports = router;