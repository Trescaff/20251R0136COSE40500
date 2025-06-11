import React, { useState } from 'react';
import albumService from '../services/albumService';

// CreateAlbum.js
// This component allows users to create a new album and generate a QR code for it
const CreateAlbum = () => {
  const [maxPhotos, setMaxPhotos] = useState(5);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { code: newCode, qrDataUrl } = await albumService.createAlbum(maxPhotos);
      setCode(newCode);
      setQrDataUrl(qrDataUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to create album.');
    }
  };

  return (
    <div className="create-album">
      <h2>Create a New Album</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Maximum Photos:
          <input
            type="number"
            value={maxPhotos}
            min="1"
            onChange={(e) => setMaxPhotos(Number(e.target.value))}
          />
        </label>
        <button type="submit">Generate QR Code</button>
      </form>
      {error && <p className="error">{error}</p>}
      {qrDataUrl && (
        <div className="qr-display">
          <p>Album Code: <strong>{code}</strong></p>
          <img src={qrDataUrl} alt="Album QR Code" />
          <p>Share this QR code for others to upload photos.</p>
        </div>
      )}
    </div>
  );
};

export default CreateAlbum;