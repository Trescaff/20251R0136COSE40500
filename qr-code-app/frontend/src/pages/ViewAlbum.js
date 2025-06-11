import React, { useState } from 'react';
import axios from 'axios';

const ViewAlbum = ({ albumCode }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('photo', selectedFile);
    formData.append('albumCode', albumCode);

    try {
      setUploadStatus('Uploading...');
      const res = await axios.post('/api/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadStatus('Upload successful!');
      setUploadedPhotos((prev) => [...prev, res.data.url]);
      setSelectedFile(null);

    } catch (err) {
      console.error(err);
      setUploadStatus('Upload failed!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Album: {albumCode}</h2>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload Photo</button>

      <p>{uploadStatus}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {uploadedPhotos.map((url, index) => (
          <img key={index} src={url} alt="Uploaded" style={{ width: '150px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default ViewAlbum;
