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
          content: `You are an academic integrity assistant. Analyze the given text and provide structured feedback in the following JSON format:
          {
            "integrityScore": number (0-100),
            "summary": "overall analysis summary",
            "feedbackItems": [
              {
                "type": "plagiarism" | "citation" | "paraphrase" | "positive",
                "startIndex": number,
                "endIndex": number,
                "message": "specific feedback message",
                "suggestion": "improvement suggestion",
                "severity": "low" | "medium" | "high"
              }
            ]
          }
          
          Guidelines:
          - Identify potential plagiarism
          - Suggest where citations are needed
          - Recommend better paraphrasing
          - Highlight good academic writing practices
          - Provide specific text locations for each feedback item`
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
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze text');
  }
};