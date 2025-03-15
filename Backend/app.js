require('dotenv').config();
const express = require('express');
const cors = require('cors')
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const aiRoutes = require('./Routes/ai.routes.js');
const userRoutes = require('./Routes/user.routes.js'); // User route को include करें

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(express.json()); // JSON middleware
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Root Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/ai', aiRoutes);
app.use('/user', userRoutes); // New user routes

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
