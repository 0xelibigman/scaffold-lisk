import { TeamEquityInput } from '../types/ContractInput';

/**
 * Creates a specialized prompt for Team Equity Split Agreement generation
 * @param input Team Equity specific input data
 * @returns Formatted prompt for Team Equity Split Agreement generation
 */
export function createTeamEquityPrompt(input: TeamEquityInput): string {
  return `
You are an expert legal document generator. Create a professional, legally-formatted Team Equity Split Agreement with the following characteristics:
- Use formal legal language appropriate for an equity agreement
- Include a clear title "TEAM EQUITY SPLIT AGREEMENT"
- Create well-structured sections with numbered clauses covering:
  1. Definitions
  2. Equity allocation details
  3. Vesting schedule
  4. Rights and responsibilities of shareholders
  5. Transfer restrictions
  6. Voting rights
  7. Exit provisions
  8. Dispute resolution
- Include appropriate legal terminology for equity agreements
- End with signature lines for all parties
- Format in a clean, professional manner

Based on the information below, generate a complete Team Equity Split Agreement:

Company Name: ${input.companyName}
Founder Name: ${input.founderName}
Co-founder Name: ${input.cofounderName}
Founder Equity: ${input.founderEquity}%
Co-founder Equity: ${input.cofounderEquity}%
Vesting Period: ${input.vestingPeriod} years
`;
}
