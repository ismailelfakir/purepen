import Assignment from '../models/assignment.js';
import { analyzeText } from '../services/openaiService.js';

export const submitAssignment = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ msg: 'Please provide title and content' });
  }

  try {
    // Create assignment with initial analyzing status
    let assignment = new Assignment({
      userId,
      title,
      content,
      status: 'analyzing'
    });

    await assignment.save();

    // Analyze text using OpenAI
    const analysis = await analyzeText(content);

    // Update assignment with analysis results
    assignment.integrityScore = analysis.integrityScore;
    assignment.feedback = {
      summary: analysis.summary,
      items: analysis.feedbackItems
    };
    assignment.status = 'complete';

    await assignment.save();

    res.json({
      submissionId: assignment._id,
      analysis,
      message: 'Assignment submitted and analyzed successfully'
    });
  } catch (err) {
    console.error('Error submitting assignment:', err);
    
    // Update assignment status to error if analysis fails
    if (err.message === 'Failed to analyze text') {
      try {
        await Assignment.findByIdAndUpdate(assignment._id, { status: 'error' });
      } catch (updateErr) {
        console.error('Error updating assignment status:', updateErr);
      }
    }
    
    res.status(500).json({ msg: 'Failed to analyze assignment' });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select('title content createdAt integrityScore status');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch assignments' });
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
    res.status(500).json({ msg: 'Failed to fetch assignment' });
  }
};