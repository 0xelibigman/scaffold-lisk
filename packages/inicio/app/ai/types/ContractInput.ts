// Types for the contract input data
export type ContractType = 'nda' | 'investor-agreement' | 'team-equity' | 'mou' | 'progress-report';

// Base contract input interface
export interface BaseContractInput {
  contractType: ContractType;
}

// NDA specific input
export interface NDAInput extends BaseContractInput {
  contractType: 'nda';
  companyName: string;
  recipientName: string;
  recipientTitle: string;
  jurisdiction: string;
  effectiveDate: string;
  purpose: string;
}

// Investor Agreement specific input
export interface InvestorAgreementInput extends BaseContractInput {
  contractType: 'investor-agreement';
  companyName: string;
  investorName: string;
  investmentAmount: string;
  equityPercentage: string;
  valuation: string;
  jurisdiction: string;
}

// Team Equity specific input
export interface TeamEquityInput extends BaseContractInput {
  contractType: 'team-equity';
  companyName: string;
  founderName: string;
  cofounderName: string;
  founderEquity: string;
  cofounderEquity: string;
  vestingPeriod: string;
}

// MOU specific input
export interface MOUInput extends BaseContractInput {
  contractType: 'mou';
  party1Name: string;
  party2Name: string;
  purpose: string;
  duration: string;
  jurisdiction: string;
}

// Progress Report specific input
export interface ProgressReportInput extends BaseContractInput {
  contractType: 'progress-report';
  companyName: string;
  reportingPeriod: string;
  keyMetrics: string;
  achievements: string;
  challenges: string;
  nextSteps: string;
}

// Union type for all contract inputs
export type ContractInput = 
  | NDAInput
  | InvestorAgreementInput
  | TeamEquityInput
  | MOUInput
  | ProgressReportInput;

// Response from the AI generator
export interface ContractResponse {
  content: string;
  error?: string;
}
