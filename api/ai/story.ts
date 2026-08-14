import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { craftName, region, artisanName, technique, materials } = req.body || {};
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        story: `${artisanName || 'This artisan'} carries forward the multigenerational legacy of ${craftName || 'traditional craft'} in ${region || 'India'}. Practicing ancestral ${technique || 'handcrafted techniques'} using ${materials || 'natural local materials'}, each piece embodies cultural memory and care.`,
        provenanceNotes: `Registered heritage practices and material declarations are recorded for ${region || 'the craft region'}.`,
        source: 'fallback',
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `Write an authentic artisan narrative for ${artisanName || 'an artisan'} practicing ${craftName || 'traditional craft'} in ${region || 'India'}, using ${technique || 'handcrafted techniques'} and ${materials || 'natural materials'}. Return JSON with story and provenanceNotes.`,
      config: { responseMimeType: 'application/json' },
    });
    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, source: 'gemini' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'AI story generation failed' });
  }
}
