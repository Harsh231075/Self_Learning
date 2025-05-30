import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

import aiRoutes from './Routes/ai.routes.js';
import userRoutes from './Routes/user.routes.js';
import chatRoute from './Routes/chat.route.js'

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Register routes
app.use('/ai', aiRoutes);
app.use('/user', userRoutes);
app.use('/api', chatRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
