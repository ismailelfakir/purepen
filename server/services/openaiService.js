import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeText = async (text) => {
  try {
    // For testing purposes, return mock analysis immediately
    return {
      integrityScore: Math.floor(Math.random() * (95 - 70 + 1)) + 70,
      summary: "Your text shows good academic writing practices with some areas for improvement.",
      feedbackItems: [
        {
          id: 'feedback-1',
          type: 'citation',
          startIndex: Math.min(20, text.length),
          endIndex: Math.min(80, text.length),
          message: 'Consider adding a citation for this claim.',
          suggestion: 'Add a reference to support this statement.',
          severity: 'medium'
        },
        {
          id: 'feedback-2',
          type: 'positive',
          startIndex: Math.min(100, text.length),
          endIndex: Math.min(150, text.length),
          message: 'Good use of academic language here.',
          severity: 'low'
        }
      ]
    };

    // Uncomment below for actual OpenAI integration
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an academic integrity assistant. Analyze the given text and provide structured feedback.`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    return {
      integrityScore: analysis.integrityScore,
      summary: analysis.summary,
      feedbackItems: analysis.feedbackItems.map((item, index) => ({
        ...item,
        id: `feedback-${index + 1}`
      }))
    };
    */
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error('Failed to analyze text');
  }
};