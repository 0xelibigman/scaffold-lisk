import { sendToGoogleGenAI } from './googleGenAI.mjs';
import 'dotenv/config';

async function main() {
  try {
    const response = await sendToGoogleGenAI('Hello Gemini, how are you?');
    console.log('Gemini response:', response);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
