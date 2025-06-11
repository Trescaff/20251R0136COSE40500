import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreateAlbum from './pages/CreateAlbum';
import QRScanner from './components/QRScanner';
import UploadPhotos from './pages/UploadPhotos';
import ViewAlbum from './pages/ViewAlbum';

const App = () => (
  <div>
    <nav>
      <Link to="/">Create Album</Link> |{' '}
      <Link to="/scan">Scan QR</Link>
    </nav>
    <Routes>
      <Route path="/" element={<CreateAlbum />} />
      <Route path="/scan" element={<QRScanner />} />
      <Route path="/upload/:code" element={<UploadPhotos />} />
      <Route path="/album/:code" element={<ViewAlbum />} />
    </Routes>
  </div>
);

export default App;
