/**
 * Gemini API client for text generation
 * Uses the fetch API to make requests to the Gemini API
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';

/**
 * Send a prompt to the Gemini API and return the generated text
 * @param prompt The prompt to send to the Gemini API
 * @returns The generated text response
 */
export async function sendToGemini(prompt: string): Promise<string> {
  // Try both the regular env var and the Next.js public env var
  const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_GENAI_API_KEY not set in environment variables. Make sure it is set as NEXT_PUBLIC_GOOGLE_GENAI_API_KEY for client components.');
  }

  try {
    const response = await fetch(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2, // Lower temperature for more consistent, structured legal documents
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192, // Allow for longer documents
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errMsg = errorData?.error?.message || response.statusText;
      throw new Error(`Gemini API error: ${errMsg}`);
    }

    const data = await response.json();
    let generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean up the response to remove preamble text
    generatedText = cleanupResponse(generatedText);
    
    return generatedText;
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    throw new Error(`Failed to generate text: ${error.message}`);
  }
}

/**
 * Cleans up the AI response to remove preamble text and formatting
 * @param text The raw text from the AI response
 * @returns Cleaned text with preamble removed
 */
function cleanupResponse(text: string): string {
  // Remove markdown code blocks
  text = text.replace(/```(?:markdown|md|)?/g, '').replace(/```/g, '');
  
  // Remove common preamble phrases
  const preambles = [
    /^Of course\.\s*/i,
    /^Here's a\s+[\w\s]+ for you:?\s*/i,
    /^I'd be happy to\s+[\w\s]+:?\s*/i,
    /^Sure!?\s*/i,
    /^Here is\s+[\w\s]+:?\s*/i,
    /^Below is\s+[\w\s]+:?\s*/i,
    /^As a[n]? [\w\s]+ expert,?\s*/i,
    /^As requested,?\s*/i,
    /^I'll create\s+[\w\s]+:?\s*/i,
    /^I've generated\s+[\w\s]+:?\s*/i,
    /^Based on\s+[\w\s]+:?\s*/i,
    /^Here's the\s+[\w\s]+:?\s*/i,
    /^Certainly!?\s*/i
  ];
  
  for (const pattern of preambles) {
    text = text.replace(pattern, '');
  }
  
  // Remove multiple blank lines
  text = text.replace(/\n{3,}/g, '\n\n');
  
  // Trim whitespace
  return text.trim();
}
