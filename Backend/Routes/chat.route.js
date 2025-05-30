
// routes/chatRoutes.js
import express from 'express'
const router = express.Router();
import chatHandler from '../controllers/chatController.js';

router.post('/chat', chatHandler);

export default router;
