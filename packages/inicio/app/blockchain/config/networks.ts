// Network configuration for the project
// These values should be updated based on environment and deployment targets

export const networks = {
  // Local development network
  localhost: {
    name: 'Hardhat Local',
    chainId: 31337,
    currency: 'ETH',
    blockExplorer: '',
    rpcUrl: 'http://localhost:8545',
  },
  // Lisk Sepolia testnet
  liskSepolia: {
    name: 'Lisk Sepolia Testnet',
    chainId: 4202,
    currency: 'LSK',
    blockExplorer: 'https://sepolia-blockscout.lisk.com',
    rpcUrl: 'https://rpc.sepolia-api.lisk.com',
  }
};

// Default to localhost for development
export const defaultNetwork = (typeof window !== 'undefined' && window.localStorage.getItem('network')) || 'liskSepolia';

// Contract addresses by network
export const contractAddresses = {
  StartupProfileRegistry: {
    localhost: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    liskSepolia: '0x224e22F862C8AdD613f23f9D11f3719f92f066Cc',
  }
};

// Helper to get the correct contract address based on network
export function getContractAddress(contractName: keyof typeof contractAddresses, network: keyof typeof networks = defaultNetwork as keyof typeof networks) {
  return contractAddresses[contractName][network];
}

// Helper to get block explorer URL for transaction
export function getExplorerTxUrl(txHash: string, network: keyof typeof networks = defaultNetwork as keyof typeof networks) {
  const explorer = networks[network].blockExplorer;
  if (!explorer) return '';
  return `${explorer}/tx/${txHash}`;
}

// Helper to get block explorer URL for address
export function getExplorerAddressUrl(address: string, network: keyof typeof networks = defaultNetwork as keyof typeof networks) {
  const explorer = networks[network].blockExplorer;
  if (!explorer) return '';
  return `${explorer}/address/${address}`;
}