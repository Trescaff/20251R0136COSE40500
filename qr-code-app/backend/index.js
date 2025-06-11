require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const albumRoutes = require('./routes/albums');
const photoRoutes = require('./routes/photos');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// API routes
app.use('/api/albums', albumRoutes);
app.use('/api/photos', photoRoutes);

// Listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));