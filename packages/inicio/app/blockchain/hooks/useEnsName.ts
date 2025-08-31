import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { type Address } from 'viem';
import { mainnet } from 'wagmi/chains';

/**
 * A hook that resolves an Ethereum address to an ENS name
 * with proper verification to prevent spoofing
 */
export function useEnsName(address?: Address) {
  const [ensName, setEnsName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // We always use the mainnet client for ENS resolution
  const publicClient = usePublicClient({ chainId: mainnet.id });

  useEffect(() => {
    if (!address || !publicClient) return;

    const lookupEnsName = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Step 1: Get the ENS name from the address (reverse resolution)
        const name = await publicClient.getEnsName({ address });
        
        if (!name) {
          setEnsName(null);
          setIsLoading(false);
          return;
        }
        
        // Step 2: Verify the ENS name by resolving it back to an address (forward resolution)
        const resolvedAddress = await publicClient.getEnsAddress({
          name,
        });
        
        // Step 3: Only set the ENS name if it resolves to the original address
        if (resolvedAddress && resolvedAddress.toLowerCase() === address.toLowerCase()) {
          setEnsName(name);
        } else {
          // If verification fails, don't use the ENS name
          setEnsName(null);
        }
      } catch (err) {
        console.error('Error resolving ENS name:', err);
        setError(err instanceof Error ? err : new Error('Failed to resolve ENS name'));
        setEnsName(null);
      } finally {
        setIsLoading(false);
      }
    };

    lookupEnsName();
  }, [address, publicClient]);

  return {
    ensName,
    isLoading,
    error
  };
}

/**
 * A utility function to format an address as an ENS name or a shortened address
 * @param address The address to format
 * @param ensName The ENS name for the address, if available
 * @param chars Number of characters to show at beginning and end of the shortened address
 */
export function formatAddressOrEns(address?: string, ensName?: string | null, chars = 4): string {
  if (ensName) return ensName;
  if (!address) return '';
  
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}