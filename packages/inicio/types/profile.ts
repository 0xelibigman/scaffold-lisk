export interface UserProfile {
  name: string;
  email: string;
  ensId?: string;
  role: string;
  avatar?: string;
}

export interface StartupProfile {
  name: string;
  description: string;
  logo?: string;
  website?: string;
  industry: string;
  stage: string;
  complianceRegion: string;
}

export interface WalletConnection {
  id: string;
  name: string;
  address: string;
  network: string;
  status: "connected" | "disconnected";
  connectedDate: string;
}