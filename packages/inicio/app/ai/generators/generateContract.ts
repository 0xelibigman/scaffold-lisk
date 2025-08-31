import { ContractInput, ContractResponse } from '../types/ContractInput';
import { selectPrompt } from '../utils/promptSelector';
import { sendToGemini } from '../utils/geminiClient';

/**
 * Generates contract content using the Gemini API
 * @param contractInput The input data for generating the contract
 * @returns The generated contract content
 */
export async function generateContract(contractInput: ContractInput): Promise<ContractResponse> {
  try {
    // Select and build the specialized prompt for this contract type
    const prompt = selectPrompt(contractInput);
    
    // Send the prompt to the Gemini API
    const generatedContent = await sendToGemini(prompt);
    
    return {
      content: generatedContent,
    };
  } catch (error: any) {
    console.error('Error generating contract:', error);
    return {
      content: '',
      error: error.message || 'Failed to generate contract'
    };
  }
}
