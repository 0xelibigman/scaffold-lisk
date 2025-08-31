'use client';

import { useEnsName, formatAddressOrEns } from '@/app/blockchain/hooks/useEnsName';
import { type Address } from 'viem';

interface AddressOrEnsProps {
  address: Address;
  className?: string;
  chars?: number; // Number of characters to show at start/end of address
  showFull?: boolean; // Whether to show the full address
  showBlockExplorerLink?: boolean; // Whether to show a link to the block explorer
}

/**
 * A component that displays an Ethereum address, showing the ENS name if available
 * or a shortened version of the address if not
 */
export function AddressOrEns({ 
  address, 
  className = '', 
  chars = 4, 
  showFull = false,
  showBlockExplorerLink = true
}: AddressOrEnsProps) {
  const { ensName, isLoading } = useEnsName(address);
  
  if (isLoading) {
    return <span className={className}>Loading...</span>;
  }
  
  const formattedAddress = formatAddressOrEns(address, ensName, chars);
  
  if (showBlockExplorerLink) {
    const explorerUrl = `https://sepolia.etherscan.io/address/${address}`;
    return (
      <a 
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${ensName ? '' : 'font-mono'} text-accent hover:underline ${className}`}
      >
        {showFull && !ensName ? address : formattedAddress}
      </a>
    );
  }
  
  return (
    <span className={`${ensName ? '' : 'font-mono'} ${className}`}>
      {showFull && !ensName ? address : formattedAddress}
    </span>
  );
}