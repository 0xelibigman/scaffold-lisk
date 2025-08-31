export async function sendToGoogleGenAI(text) {
  const apiKey = process.env.GOOGLE_GENAI;
  if (!apiKey) {
    throw new Error('GOOGLE_GENAI API key not set in environment variables');
  }
  const GOOGLE_GENAI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';
  const res = await fetch(
    `${GOOGLE_GENAI_API_URL}?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
      }),
    }
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errMsg = errorData?.error?.message || res.statusText;
    throw new Error(`Gemini API error: ${errMsg}`);
  }
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}
