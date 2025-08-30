"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { WalletButton } from "@/components/ui/wallet-button"
import { useEffect } from "react"


export default function SignInPage() {
  const router = useRouter()
  const { isConnected } = useAccount()

  // Redirect to dashboard if wallet is connected
  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard')
    }
  }, [isConnected, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-black text-foreground" style={{ fontFamily: "var(--font-montserrat)" }}>
            Welcome to Inicio
          </h1>
          <p className="text-muted-foreground mt-2">Connect your wallet to get started</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>Access the platform with your Web3 wallet</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <WalletButton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
