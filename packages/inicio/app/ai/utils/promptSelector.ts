import { ContractInput } from '../types/ContractInput';
import { createNDAPrompt } from '../prompts/nda';
import { createInvestorAgreementPrompt } from '../prompts/investor-agreement';
import { createTeamEquityPrompt } from '../prompts/team-equity';
import { createMOUPrompt } from '../prompts/mou';
import { createProgressReportPrompt } from '../prompts/progress-report';

/**
 * Selects the appropriate prompt builder based on contract type
 * @param input Contract input data
 * @returns The specialized prompt for the given contract type
 */
export function selectPrompt(input: ContractInput): string {
  switch (input.contractType) {
    case 'nda':
      return createNDAPrompt(input);
    case 'investor-agreement':
      return createInvestorAgreementPrompt(input);
    case 'team-equity':
      return createTeamEquityPrompt(input);
    case 'mou':
      return createMOUPrompt(input);
    case 'progress-report':
      return createProgressReportPrompt(input);
    default:
      throw new Error(`Unsupported contract type: ${(input as any).contractType}`);
  }
}