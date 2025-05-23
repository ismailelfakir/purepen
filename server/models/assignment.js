import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: String,
  link: String,
  snippet: String,
  type: {
    type: String,
    enum: ['video', 'article']
  }
});

const relatedContentSchema = new mongoose.Schema({
  text: String,
  resources: [resourceSchema]
});

const feedbackItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['plagiarism', 'citation', 'paraphrase', 'positive'],
    required: true
  },
  startIndex: Number,
  endIndex: Number,
  message: String,
  suggestion: String,
  severity: {
    type: String,
    enum: ['low', 'medium', 'high']
  }
});

const assignmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  integrityScore: {
    type: Number,
    default: 0,
  },
  feedback: {
    summary: String,
    items: [feedbackItemSchema],
    relatedContent: [relatedContentSchema]
  },
  status: {
    type: String,
    enum: ['analyzing', 'complete', 'error'],
    default: 'analyzing'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

assignmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Assignment', assignmentSchema);