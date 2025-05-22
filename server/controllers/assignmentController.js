import Assignment from '../models/assignment.js';
import { analyzeText } from '../services/openaiService.js';

export const submitAssignment = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ msg: 'Please provide title and content' });
  }

  try {
    // Analyze text using OpenAI
    const analysis = await analyzeText(content);

    const assignment = new Assignment({
      userId,
      title,
      content,
      integrityScore: analysis.integrityScore,
      feedback: {
        summary: analysis.summary,
        items: analysis.feedbackItems
      }
    });

    await assignment.save();

    res.json({
      submissionId: assignment._id,
      analysis,
      message: 'Assignment submitted and analyzed successfully'
    });
  } catch (err) {
    console.error('Error submitting assignment:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!assignment) {
      return res.status(404).json({ msg: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};