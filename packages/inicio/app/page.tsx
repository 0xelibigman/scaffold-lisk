"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, FileText, TrendingUp, Shield } from "lucide-react"
import { WalletButton } from "@/components/ui/wallet-button"
import { useAccount } from "wagmi"

export default function LandingPage() {
  const router = useRouter()
  const { isConnected } = useAccount()

  // Redirect to dashboard if already connected
  if (isConnected) {
    router.push('/dashboard')
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-black text-primary" style={{ fontFamily: "var(--font-montserrat)" }}>
                Inicio
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <WalletButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2
            className="text-4xl md:text-6xl font-black text-foreground mb-6 text-balance"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            AI-powered stakeholder relationship management for founders
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Streamline your startup operations with intelligent stakeholder management, automated compliance docs, and
            seamless team collaboration.
          </p>
          <div className="flex justify-center items-center">
            <WalletButton />
          </div>
        </div>
      </section>

      {/* Feature Teaser Cards */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <h3
            className="text-3xl font-bold text-center mb-12 text-balance"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Everything you need to manage your startup
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-accent mb-4" />
                <CardTitle>Funding Tracker</CardTitle>
                <CardDescription>
                  Track funding milestones and investor relationships with Lisk integration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-accent mb-4" />
                <CardTitle>Stakeholder CRM</CardTitle>
                <CardDescription>Manage relationships with investors, mentors, and team members</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-10 w-10 text-accent mb-4" />
                <CardTitle>AI Compliance Docs</CardTitle>
                <CardDescription>
                  Generate legal documents with AI assistance and blockchain verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-10 w-10 text-accent mb-4" />
                <CardTitle>ENS Access Control</CardTitle>
                <CardDescription>Secure team management with ENS-Liskd identity and permissions</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h4 className="text-xl font-black text-primary" style={{ fontFamily: "var(--font-montserrat)" }}>
                Inicio
              </h4>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
