import { InvestorAgreementInput } from '../types/ContractInput';

/**
 * Creates a specialized prompt for Investor Agreement generation
 * @param input Investor Agreement specific input data
 * @returns Formatted prompt for Investor Agreement generation
 */
export function createInvestorAgreementPrompt(input: InvestorAgreementInput): string {
  return `
You are an expert legal document generator. Create a professional, legally-formatted Investor Agreement with the following characteristics:
- Use formal legal language appropriate for an investment agreement
- Include a clear title "INVESTMENT AGREEMENT"
- Create well-structured sections with numbered clauses covering:
  1. Definitions
  2. Investment amount and equity details
  3. Representations and warranties
  4. Rights of the investor
  5. Obligations of the company
  6. Term and termination
  7. Confidentiality
  8. Governing law and jurisdiction
  9. Dispute resolution
- Include appropriate legal terminology for investment contracts
- End with signature lines for all parties
- Format in a clean, professional manner

Based on the information below, generate a complete Investment Agreement:

Company Name: ${input.companyName}
Investor Name: ${input.investorName}
Investment Amount: $${input.investmentAmount}
Equity Percentage: ${input.equityPercentage}%
Company Valuation: $${input.valuation}
Jurisdiction: ${input.jurisdiction}
`;
}
