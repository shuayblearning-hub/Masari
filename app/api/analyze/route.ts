import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { resumeContent } = await request.json();

    if (!resumeContent) {
      return NextResponse.json({ error: 'No resume content provided' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert Resume Consultant and Career Coach.
Analyze this resume and respond with ONLY valid JSON (no markdown):

${JSON.stringify(resumeContent, null, 2)}

Return this exact structure:
{
  "score": 75,
  "summary": "Brief overall assessment",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "suggestions": [
    {
      "id": "sug-1",
      "section": "basics",
      "field": "summary",
      "priority": "high",
      "title": "Improve professional summary",
      "description": "Why this matters",
      "currentContent": "current text if exists",
      "suggestedContent": "the improved version"
    }
  ]
}

Rules:
- score: 0-100 based on completeness and quality
- Provide exactly 3 strengths and 3 improvements
- Provide 5-7 specific, actionable suggestions
- priority: "high", "medium", or "low"
- section: "basics", "work", "education", "skills", "projects", "certificates", "languages"
- suggestedContent must be ready to use, not a placeholder`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    if (text.startsWith('```json')) {
      text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    const analysis = JSON.parse(text.trim());

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume. Please try again.' },
      { status: 500 }
    );
  }
}
