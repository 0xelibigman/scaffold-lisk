import { MOUInput } from '../types/ContractInput';

/**
 * Creates a specialized prompt for Memorandum of Understanding generation
 * @param input MOU specific input data
 * @returns Formatted prompt for MOU generation
 */
export function createMOUPrompt(input: MOUInput): string {
  return `
You are an expert legal document generator. Create a professional, legally-formatted Memorandum of Understanding with the following characteristics:
- Use formal legal language appropriate for an MOU
- Include a clear title "MEMORANDUM OF UNDERSTANDING"
- Create well-structured sections with numbered clauses covering:
  1. Parties
  2. Purpose and scope
  3. Term and duration
  4. Responsibilities of each party
  5. Financial arrangements (if applicable)
  6. Confidentiality
  7. Non-binding nature (unless specified otherwise)
  8. Termination provisions
  9. Governing law
- Include appropriate legal terminology
- End with signature lines for all parties
- Format in a clean, professional manner

Based on the information below, generate a complete Memorandum of Understanding:

First Party Name: ${input.party1Name}
Second Party Name: ${input.party2Name}
Purpose of Agreement: ${input.purpose}
Duration: ${input.duration} months
Jurisdiction: ${input.jurisdiction}
`;
}
