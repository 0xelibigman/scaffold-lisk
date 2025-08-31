'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { Chain } from 'wagmi';

// Define the Lisk Sepolia Testnet with exact details
const liskSepolia: Chain = {
  id: 4202,
  name: 'Lisk Sepolia Testnet',
  network: 'lisk-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia-api.lisk.com'],
    },
    public: {
      http: ['https://rpc.sepolia-api.lisk.com'],
    },
  },
  blockExplorers: {
    default: { name: 'LiskBlockScout', url: 'https://sepolia-blockscout.lisk.com' },
  },
  testnet: true,
};

const config = getDefaultConfig({
  appName: 'Inicio App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2b0cbc8f10cefd037ddc0e6fb963f0a8', 
  chains: [liskSepolia, mainnet, sepolia], // Put Lisk Sepolia first to make it the default
  transports: {
    [liskSepolia.id]: http('https://rpc.sepolia-api.lisk.com'),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function WagmiRainbowProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          initialChain={liskSepolia.id}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
