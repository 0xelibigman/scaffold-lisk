"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletButton } from "@/components/ui/wallet-button"
import { LogoSymbol } from "@/components/ui/logo"
import { useDisconnect } from "wagmi"
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  FileText,
  UserCheck,
  Settings,
  Vault,
  Shield,
  Globe,
  Store,
  Menu,
  X,
  LogOut,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
  { name: "Stakeholders CRM", href: "/dashboard/stakeholders", icon: Users, active: true },
  { name: "Funding Tracker", href: "/dashboard/funding", icon: TrendingUp, active: true },
  { name: "Compliance Docs (AI)", href: "/dashboard/compliance", icon: FileText, active: true },
  { name: "Team & Roles (ENS)", href: "/dashboard/team", icon: UserCheck, active: true },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, active: true },
]

const futureFeatures = [
  { name: "Escrow", icon: Vault, active: false },
  { name: "Privacy Vault", icon: Shield, active: false },
  { name: "Multi-Chain Hub", icon: Globe, active: false },
  { name: "Investor Marketplace", icon: Store, active: false },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { disconnect } = useDisconnect()
  
  const handleSignOut = () => {
    disconnect()
    router.push('/signin')
  }

  return (
    <div className="h-full flex">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/dashboard" className="text-xl font-bold font-montserrat text-sidebar-foreground">
              Inicio
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4">
              <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Coming Soon</p>
              {futureFeatures.map((item) => (
                <div
                  key={item.name}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground cursor-not-allowed opacity-50"
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <Link href="/dashboard">
            <LogoSymbol />
          </Link>
        </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4">
              <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Coming Soon</p>
              {futureFeatures.map((item) => (
                <div
                  key={item.name}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground cursor-not-allowed opacity-50"
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </div>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              <div className="px-2">
                <WalletButton variant="sidebar" />
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-0">
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16 px-4 bg-background border-b border-border">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/dashboard">
              <LogoSymbol />
            </Link>
            <WalletButton />
          </div>
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
