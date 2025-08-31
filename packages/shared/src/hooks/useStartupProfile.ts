import { useCallback } from 'react';
import { useAccount, useReadContract, useWriteContract, type Address } from 'wagmi';
import { OnChainStartupProfile } from '../types/profile';
import { startupProfileRegistryAbi } from '../constants/abis';
import { contractAddresses, defaultNetwork } from '../config/networks';

// Get the correct contract address based on the environment
const contractAddress = contractAddresses.StartupProfileRegistry[defaultNetwork as keyof typeof contractAddresses.StartupProfileRegistry] as Address;

// Contract configuration
const CONTRACT_CONFIG = {
  address: contractAddress,
  abi: startupProfileRegistryAbi,
};

/**
 * Hook to read startup profile data from the blockchain
 */
export function useStartupProfile(address?: Address) {
  const { address: connectedAddress } = useAccount();
  const profileAddress = address || connectedAddress;

  const { data, isLoading, error, refetch } = useReadContract({
    ...CONTRACT_CONFIG,
    functionName: 'getProfile',
    args: [profileAddress],
    enabled: !!profileAddress,
  });

  // Process the raw data into our TypeScript type
  const profile = data
    ? {
        name: data[0],
        description: data[1],
        website: data[2],
        industry: data[3],
        stage: data[4],
        complianceRegion: data[5],
        owner: profileAddress,
        lastUpdated: data[6],
      } as OnChainStartupProfile
    : undefined;

  return {
    profile,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to update startup profile data on the blockchain
 */
export function useUpdateStartupProfile() {
  const { writeContractAsync, isPending, isSuccess, error } = useWriteContract();
  
  const updateProfile = useCallback(async (profile: {
    name: string;
    description: string;
    website: string;
    industry: string;
    stage: string;
    complianceRegion: string;
  }) => {
    if (!profile) return;
    
    return writeContractAsync({
      ...CONTRACT_CONFIG,
      functionName: 'updateProfile',
      args: [
        profile.name,
        profile.description,
        profile.website || '',
        profile.industry,
        profile.stage,
        profile.complianceRegion,
      ],
    });
  }, [writeContractAsync]);

  return {
    updateProfile,
    isPending,
    isSuccess,
    error,
  };
}

/**
 * Hook to delete a startup profile from the blockchain
 */
export function useDeleteStartupProfile() {
  const { writeContractAsync, isPending, isSuccess, error } = useWriteContract();
  
  const deleteProfile = useCallback(async () => {
    return writeContractAsync({
      ...CONTRACT_CONFIG,
      functionName: 'deleteProfile',
    });
  }, [writeContractAsync]);

  return {
    deleteProfile,
    isPending,
    isSuccess,
    error,
  };
}