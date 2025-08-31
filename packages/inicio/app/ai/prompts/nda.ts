import { NDAInput } from '../types/ContractInput';

/**
 * Creates a specialized prompt for NDA generation
 * @param input NDA specific input data
 * @returns Formatted prompt for NDA generation
 */
export function createNDAPrompt(input: NDAInput): string {
  return `
You are an expert legal document generator. Create a professional, legally-formatted Non-Disclosure Agreement with the following characteristics:
- Use formal legal language appropriate for an NDA
- Include a clear title "CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT"
- Create well-structured sections with numbered clauses covering:
  1. Definitions of confidential information
  2. Obligations of the receiving party
  3. Exclusions from confidential information
  4. Term and termination
  5. Return of materials
  6. No rights granted
  7. Governing law and jurisdiction
  8. Remedies
- Include appropriate legal terminology
- End with signature lines for both parties
- Format in a clean, professional manner

Based on the information below, generate a complete Non-Disclosure Agreement:

Company Name: ${input.companyName}
Recipient Name: ${input.recipientName}
Recipient Title: ${input.recipientTitle}
Jurisdiction: ${input.jurisdiction}
Effective Date: ${input.effectiveDate}
Purpose of Disclosure: ${input.purpose}
`;
}
