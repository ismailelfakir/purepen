import express from 'express';
import { submitAssignment, getAssignments, getAssignment } from '../controllers/assignmentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/submit', auth, submitAssignment);
router.get('/', auth, getAssignments);
router.get('/:id', auth, getAssignment);

export default router;