import { ContractInput } from "../types/ContractInput";

/**
 * Builds a prompt for the AI to generate contract content based on input data
 * @param contractInput The input data for the contract
 * @returns A formatted prompt string for the AI
 */
export function buildPrompt(contractInput: ContractInput): string {
  // Common prompt instructions for all contract types
  const baseInstructions = `
You are an expert legal document generator. Create a professional, legally-formatted contract with the following characteristics:
- Use formal legal language appropriate for a ${contractInput.contractType.replace('-', ' ')}
- Include a clear title and date
- Create well-structured sections with numbered clauses
- Include appropriate legal terminology
- End with signature lines for all parties
- Format in a clean, professional manner
- Be comprehensive but concise

Based on the information below, generate a complete ${contractInput.contractType.replace('-', ' ')}:
`;

  // Format the input data as key-value pairs
  const formattedData = Object.entries(contractInput)
    .filter(([key]) => key !== 'contractType') // Skip the contractType field
    .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`)
    .join('\n');

  return `${baseInstructions}\n${formattedData}`;
}
