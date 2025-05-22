import express from 'express';
import { submitAssignment } from '../controllers/assignmentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/submit', auth, submitAssignment);

export default router;