import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT = `Parse this resume document and extract all information into JSON Resume format.
Return ONLY valid JSON with this structure (no markdown, no code blocks):
{
  "basics": {
    "name": "",
    "label": "",
    "email": "",
    "phone": "",
    "summary": "",
    "location": { "city": "", "region": "", "countryCode": "" },
    "profiles": [{ "network": "", "username": "", "url": "" }]
  },
  "work": [{
    "name": "", "position": "", "startDate": "", "endDate": "",
    "summary": "", "highlights": []
  }],
  "education": [{
    "institution": "", "area": "", "studyType": "",
    "startDate": "", "endDate": "", "score": ""
  }],
  "skills": [{ "name": "", "level": "", "keywords": [] }],
  "languages": [{ "language": "", "fluency": "" }],
  "projects": [{ "name": "", "description": "", "highlights": [], "keywords": [] }],
  "certificates": [{ "name": "", "issuer": "", "date": "" }],
  "awards": [{ "title": "", "awarder": "", "date": "", "summary": "" }]
}
Rules:
- Dates in YYYY-MM format
- Never use null — use empty string "" for missing values
- Use empty arrays [] for missing sections
- Extract ALL visible information`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only PDF and DOCX files are supported' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      { text: PROMPT },
      {
        inlineData: {
          mimeType: file.type as 'application/pdf',
          data: base64,
        },
      },
    ]);

    let text = result.response.text().trim();

    // Strip markdown code blocks if present
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    const parsed = JSON.parse(text.trim());

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to parse resume. Please try again.' },
      { status: 500 }
    );
  }
}
