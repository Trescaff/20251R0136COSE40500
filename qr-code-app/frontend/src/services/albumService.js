import api from './api';

const createAlbum = async (maxPhotos) => {
  const response = await api.post('/albums', { maxPhotos });
  return response.data; // { code, qrDataUrl }
};

const getAlbum = async (code) => {
  const response = await api.get(`/albums/${code}`);
  return response.data; // full album object
};

export default {
  createAlbum,
  getAlbum
};