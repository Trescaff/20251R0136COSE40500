import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import albumService from '../services/albumService';
import CameraCapture from '../components/CameraCapture';

// UploadPhotos.js
// This component allows users to upload photos to a specific album
const UploadPhotos = () => {
  const { code } = useParams();
  const navigate = useNavigate ();
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAlbum() {
      try {
        const data = await albumService.getAlbum(code);
        setAlbum(data);
      } catch (err) {
        setError('Album not found');
      }
    }
    loadAlbum();
  }, [code]);

  const handleUploaded = (photo) => {
    setAlbum(prev => ({ ...prev, photos: [...prev.photos, photo] }));
    if (album.photos.length + 1 >= album.maxPhotos) {
      navigate(`/album/${code}`);
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!album) return <p>Loading...</p>;

  return (
    <div className="upload-photos">
      <h2>Upload to Album: {code}</h2>
      <p>{album.photos.length} / {album.maxPhotos} photos uploaded</p>
      <div className="photo-grid">
        {album.photos.map((p, idx) => (
          <img key={idx} src={p.url} alt={`Photo ${idx + 1}`} />
        ))}
      </div>
      {album.photos.length < album.maxPhotos && (
        <CameraCapture albumCode={code} onUploaded={handleUploaded} />
      )}
      {album.photos.length >= album.maxPhotos && (
        <button onClick={() => navigate(`/album/${code}`)}>
          View Album
        </button>
      )}
    </div>
  );
};

export default UploadPhotos;