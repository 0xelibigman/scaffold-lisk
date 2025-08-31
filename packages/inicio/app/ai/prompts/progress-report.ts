import { ProgressReportInput } from '../types/ContractInput';

/**
 * Creates a specialized prompt for Progress Report generation
 * @param input Progress Report specific input data
 * @returns Formatted prompt for Progress Report generation
 */
export function createProgressReportPrompt(input: ProgressReportInput): string {
  return `
You are an expert business document generator. Create a professional, well-formatted Progress Report with the following characteristics:
- Use formal business language appropriate for a progress report
- Include a clear title "PROGRESS REPORT"
- Create well-structured sections covering:
  1. Executive Summary
  2. Company Information
  3. Reporting Period
  4. Key Metrics and Performance Indicators
  5. Achievements and Milestones
  6. Challenges and Obstacles
  7. Action Items and Next Steps
  8. Conclusion
- Include appropriate business terminology
- End with signature lines for company representatives
- Format in a clean, professional manner

Based on the information below, generate a complete Progress Report:

Company Name: ${input.companyName}
Reporting Period: ${input.reportingPeriod}
Key Metrics: ${input.keyMetrics}
Key Achievements: ${input.achievements}
Challenges: ${input.challenges}
Next Steps: ${input.nextSteps}
`;
}
