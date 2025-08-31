// Types for startup profile data
export interface StartupProfile {
  name: string;
  description: string;
  logo?: string; // This stays off-chain as requested
  website?: string;
  industry: string;
  stage: string;
  complianceRegion: string;
}

// This is what gets stored on-chain
export interface OnChainStartupProfile {
  name: string;
  description: string;
  website: string;
  industry: string;
  stage: string;
  complianceRegion: string;
  owner: string; // The wallet address of the owner
  lastUpdated: bigint; // Timestamp of last update
}