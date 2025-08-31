"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SimpleSelect } from "@/components/ui/simple-select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  User,
  Building,
  Wallet,
  Shield,
  Globe,
  Save,
  Upload,
  CheckCircle,
  AlertCircle,
  Unlink,
  Plus,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
// Import the blockchain hooks
import { useUpdateStartupProfile, useStartupProfile } from "@/app/blockchain/hooks/useStartupProfile"
import { getExplorerTxUrl, defaultNetwork } from "@/app/blockchain/config/networks"
// Import ENS formatting utility
import { formatAddressOrEns } from "@/app/blockchain/hooks/useEnsName"

interface UserProfile {
  name: string
  email: string
  ensId?: string
  role: string
  avatar?: string
}

interface StartupProfile {
  name: string
  description: string
  logo?: string
  website?: string
  industry: string
  stage: string
  complianceRegion: string
}

interface WalletConnection {
  id: string
  name: string
  address: string
  network: string
  status: "connected" | "disconnected"
  connectedDate: string
  ensName?: string | null
}

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Alex Founder",
    email: "alex@inicio.com",
    ensId: "alex.eth",
    role: "CEO",
  })

  const [startupProfile, setStartupProfile] = useState<StartupProfile>({
    name: "Inicio",
    description: "AI-powered stakeholder relationship management platform for startup founders",
    website: "https://inicio.com",
    industry: "SaaS",
    stage: "Seed",
    complianceRegion: "Delaware",
  })

  const [walletConnections, setWalletConnections] = useState<WalletConnection[]>([
    {
      id: "1",
      name: "MetaMask",
      address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      network: "Lisk",
      status: "connected",
      connectedDate: "2024-01-15",
      ensName: "alex.eth", // Added ENS name support
    },
    {
      id: "2",
      name: "WalletConnect",
      address: "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a",
      network: "Ethereum",
      status: "connected",
      connectedDate: "2024-01-10",
      ensName: null, // No ENS name for this address
    },
  ])

  const [isSaving, setIsSaving] = useState(false)
  const [currentTab, setCurrentTab] = useState('account')
  
  // Blockchain integration
  const { updateProfile, isPending: isBlockchainUpdating, isSuccess: isBlockchainSuccess } = useUpdateStartupProfile();
  const { profile: blockchainProfile, isLoading: isLoadingProfile, refetch: refetchProfile } = useStartupProfile();
  const [isBlockchainError, setIsBlockchainError] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Load profile from blockchain when available
  useEffect(() => {
    if (blockchainProfile && !isLoadingProfile) {
      setStartupProfile({
        name: blockchainProfile.name,
        description: blockchainProfile.description,
        website: blockchainProfile.website,
        industry: blockchainProfile.industry,
        stage: blockchainProfile.stage,
        complianceRegion: blockchainProfile.complianceRegion,
      });
    }
  }, [blockchainProfile, isLoadingProfile]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setIsBlockchainError(false);
    setTxHash(null);
    
    try {
      // Save to blockchain
      if (currentTab === 'startup') {
        const tx = await updateProfile({
          name: startupProfile.name,
          description: startupProfile.description,
          website: startupProfile.website || '',
          industry: startupProfile.industry,
          stage: startupProfile.stage,
          complianceRegion: startupProfile.complianceRegion,
        });
        
        if (tx) {
          setTxHash(tx);
          // Wait for transaction to be confirmed
          await new Promise((resolve) => setTimeout(resolve, 2000));
          // Refresh the profile from blockchain
          await refetchProfile();
        }
      } else {
        // For other tabs, just simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error saving profile to blockchain:', error);
      setIsBlockchainError(true);
    } finally {
      setIsSaving(false);
    }
  }

  const handleDisconnectWallet = (walletId: string) => {
    setWalletConnections((prev) =>
      prev.map((wallet) => (wallet.id === walletId ? { ...wallet, status: "disconnected" as const } : wallet)),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1
            className="text-3xl font-bold text-foreground text-balance"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">Manage your account and startup profile</p>
        </div>

        <Tabs defaultValue="account" className="space-y-6" onValueChange={setCurrentTab}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="startup">Startup Profile</TabsTrigger>
            <TabsTrigger value="wallets">Wallet Connections</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Update your personal account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="h-20 w-20 bg-accent/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ensId">ENS Name</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="ensId"
                        value={userProfile.ensId || ""}
                        onChange={(e) => setUserProfile({ ...userProfile, ensId: e.target.value })}
                        placeholder="yourname"
                      />
                      {userProfile.ensId && (
                        <Badge variant="secondary" className="flex items-center">
                          <Shield className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <SimpleSelect
                      value={userProfile.role}
                      onValueChange={(value) => setUserProfile({ ...userProfile, role: value })}
                      options={[
                        { value: "CEO", label: "CEO" },
                        { value: "CTO", label: "CTO" },
                        { value: "Founder", label: "Founder" },
                        { value: "Co-Founder", label: "Co-Founder" }
                      ]}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Save className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="startup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Startup Profile
                </CardTitle>
                <CardDescription>Configure your startup information and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="h-20 w-20 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">SVG, PNG up to 1MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startupName">Company Name</Label>
                    <Input
                      id="startupName"
                      value={startupProfile.name}
                      onChange={(e) => setStartupProfile({ ...startupProfile, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={startupProfile.website || ""}
                      onChange={(e) => setStartupProfile({ ...startupProfile, website: e.target.value })}
                      placeholder="https://yourcompany.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <SimpleSelect
                      value={startupProfile.industry}
                      onValueChange={(value) => setStartupProfile({ ...startupProfile, industry: value })}
                      options={[
                        { value: "SaaS", label: "SaaS" },
                        { value: "Fintech", label: "Fintech" },
                        { value: "Healthcare", label: "Healthcare" },
                        { value: "E-commerce", label: "E-commerce" },
                        { value: "AI/ML", label: "AI/ML" },
                        { value: "Other", label: "Other" }
                      ]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stage">Company Stage</Label>
                    <SimpleSelect
                      value={startupProfile.stage}
                      onValueChange={(value) => setStartupProfile({ ...startupProfile, stage: value })}
                      options={[
                        { value: "Idea", label: "Idea" },
                        { value: "MVP", label: "MVP" },
                        { value: "Seed", label: "Seed" },
                        { value: "Series A", label: "Series A" },
                        { value: "Series B+", label: "Series B+" }
                      ]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    value={startupProfile.description}
                    onChange={(e) => setStartupProfile({ ...startupProfile, description: e.target.value })}
                    rows={4}
                    placeholder="Describe your startup and what it does..."
                  />
                </div>

                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Save className="mr-2 h-4 w-4 animate-spin" />
                      Saving to Blockchain...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save to Blockchain
                    </>
                  )}
                </Button>
                
                {/* Blockchain transaction status */}
                <div className="mt-4">
                  {isBlockchainError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <span>Error saving to blockchain. Please try again.</span>
                    </div>
                  )}
                  
                  {isBlockchainSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Successfully saved to Lisk blockchain!</span>
                    </div>
                  )}
                  
                  {txHash && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-600 flex items-center mt-2">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        Transaction: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                      </span>
                      {defaultNetwork !== 'localhost' && (
                        <a
                          href={getExplorerTxUrl(txHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 underline"
                        >
                          View
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallets">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  Wallet Connections
                </CardTitle>
                <CardDescription>Manage your connected wallets and blockchain accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {walletConnections.map((wallet) => (
                    <div key={wallet.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{wallet.name}</span>
                            {wallet.status === "connected" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-mono">
                              {wallet.ensName || `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}
                            </span>
                            <span className="ml-2">• {wallet.network}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Connected {new Date(wallet.connectedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={wallet.status === "connected" ? "default" : "secondary"}>{wallet.status}</Badge>
                        {wallet.status === "connected" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnectWallet(wallet.id)}
                            className="bg-transparent"
                          >
                            <Unlink className="mr-2 h-4 w-4" />
                            Disconnect
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline" className="bg-transparent">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect New Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Compliance Settings
                </CardTitle>
                <CardDescription>Configure compliance region and legal document templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="complianceRegion">Compliance Region</Label>
                  <SimpleSelect
                    value={startupProfile.complianceRegion}
                    onValueChange={(value) => setStartupProfile({ ...startupProfile, complianceRegion: value })}
                    options={[
                      { value: "Delaware", label: "Delaware, USA" },
                      { value: "California", label: "California, USA" },
                      { value: "New York", label: "New York, USA" },
                      { value: "UK", label: "United Kingdom" },
                      { value: "Canada", label: "Canada" },
                      { value: "Other", label: "Other" }
                    ]}
                  />
                  <p className="text-sm text-muted-foreground">
                    This affects the legal templates and compliance requirements in AI-generated documents
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Compliance Notice</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        AI-generated documents are for reference only and should be reviewed by qualified legal counsel
                        before use. Compliance requirements may vary by jurisdiction.
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Save className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
