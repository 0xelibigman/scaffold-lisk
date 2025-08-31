import React from 'react';
import { generateContract } from '../generators/generateContract';
import { ContractInput, ContractResponse, ContractType } from '../types/ContractInput';

/**
 * Component props for the AIContractGenerator
 */
interface AIContractGeneratorProps {
  formData: Record<string, string>;
  contractType: ContractType;
  onGenerationComplete: (response: ContractResponse) => void;
  onGenerationStart: () => void;
}

/**
 * Component that handles AI contract generation
 */
export const AIContractGenerator: React.FC<AIContractGeneratorProps> = ({
  formData,
  contractType,
  onGenerationComplete,
  onGenerationStart,
}) => {
  const handleGenerate = async () => {
    try {
      onGenerationStart();

      // Map the form data to the contract input format
      const contractInput = {
        ...formData,
        contractType,
      } as ContractInput;

      // Generate the contract
      const response = await generateContract(contractInput);
      
      // Call the callback with the result
      onGenerationComplete(response);
    } catch (error: any) {
      console.error('Error in contract generation:', error);
      onGenerationComplete({
        content: '',
        error: error.message || 'An unexpected error occurred'
      });
    }
  };

  return (
    <button onClick={handleGenerate} className="generate-contract-btn">
      Generate Contract
    </button>
  );
};

/**
 * Hook for generating contracts with AI
 * @param contractType The type of contract to generate
 * @returns Object with generation functions and state
 */
export function useAIContractGeneration(contractType: ContractType) {
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const generateAIContract = async (formData: Record<string, string>) => {
    try {
      setIsGenerating(true);
      setError(null);

      // Map the form data to the contract input format
      const contractInput = {
        ...formData,
        contractType,
      } as ContractInput;

      // Generate the contract
      const response = await generateContract(contractInput);
      
      if (response.error) {
        setError(response.error);
      } else {
        setGeneratedContent(response.content);
      }
      
      return response;
    } catch (error: any) {
      const errorMsg = error.message || 'An unexpected error occurred';
      setError(errorMsg);
      return {
        content: '',
        error: errorMsg
      };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAIContract,
    isGenerating,
    generatedContent,
    error,
    reset: () => {
      setGeneratedContent('');
      setError(null);
    }
  };
}