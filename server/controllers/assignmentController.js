import Assignment from '../models/assignment.js';

export const submitAssignment = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Récupéré depuis le middleware auth

  console.log('Received assignment submission:', { title, content, userId });

  if (!title || !content) {
    console.log('Validation failed: Missing fields');
    return res.status(400).json({ msg: 'Please provide title and content' });
  }

  try {
    const assignment = new Assignment({
      userId,
      title,
      content,
    });

    await assignment.save();
    console.log('Assignment saved:', assignment);

    res.json({
      submissionId: assignment._id,
      message: 'Assignment submitted successfully',
    });
  } catch (err) {
    console.error('Error submitting assignment:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};