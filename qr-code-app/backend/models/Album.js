const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  url: String,
  uploadedAt: { type: Date, default: Date.now }
});

const AlbumSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  maxPhotos: Number,
  photos: [PhotoSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);