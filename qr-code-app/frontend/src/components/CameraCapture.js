import React, { useRef, useState, useEffect } from 'react';
import albumService from '../services/albumService';
import api from '../services/api';

const CameraCapture = ({ albumCode, onUploaded }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function initCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        setError('Cannot access camera');
      }
    }
    initCamera();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  const handleCapture = async () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('albumCode', albumCode);
      formData.append('photo', blob, `${albumCode}.jpg`);
      try {
        const resp = await api.post('/photos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        onUploaded(resp.data);
      } catch (err) {
        console.error(err);
        setError('Upload failed');
      }
    }, 'image/jpeg');
  };

  return (
    <div className="camera-capture">
      {error && <p className="error">{error}</p>}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
      <button onClick={handleCapture}>Capture & Upload</button>
    </div>
  );
};

export default CameraCapture;