import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeText = async (text) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an academic integrity assistant. Analyze the text for potential plagiarism, citation needs, and paraphrasing suggestions. Provide detailed feedback with specific locations in the text."
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const analysis = response.choices[0].message.content;
    
    // Parse the analysis to create structured feedback
    const feedbackItems = [];
    let integrityScore = 85; // Base score
    
    // Simple scoring logic based on detected issues
    if (analysis.toLowerCase().includes('plagiarism')) {
      integrityScore -= 20;
    }
    if (analysis.toLowerCase().includes('citation')) {
      integrityScore -= 10;
    }
    if (analysis.toLowerCase().includes('paraphrase')) {
      integrityScore -= 5;
    }

    // Ensure score stays within 0-100 range
    integrityScore = Math.max(0, Math.min(100, integrityScore));

    return {
      integrityScore,
      summary: analysis,
      feedbackItems: generateFeedbackItems(text, analysis)
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze text');
  }
};

const generateFeedbackItems = (text, analysis) => {
  const items = [];
  let id = 1;

  // Example logic to generate feedback items
  const sentences = text.split('. ');
  sentences.forEach((sentence, index) => {
    const start = text.indexOf(sentence);
    const end = start + sentence.length;

    if (analysis.toLowerCase().includes(sentence.toLowerCase().substring(0, 20))) {
      items.push({
        id: `feedback-${id++}`,
        type: 'plagiarism',
        startIndex: start,
        endIndex: end,
        message: 'Potential plagiarism detected',
        suggestion: 'Consider rewriting this section in your own words',
        severity: 'high'
      });
    }
  });

  return items;
};