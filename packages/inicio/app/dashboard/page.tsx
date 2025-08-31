"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AddressOrEns } from "@/components/ui/address-or-ens"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Users,
  TrendingUp,
  FileText,
  Shield,
  MessageSquare,
  Calendar,
  DollarSign,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import { type Address } from "viem"

// Mock data for the funding chart
const fundingData = [
  { month: "Jan", amount: 50000 },
  { month: "Feb", amount: 75000 },
  { month: "Mar", amount: 120000 },
  { month: "Apr", amount: 200000 },
]

// Mock data for stakeholder activity
const stakeholderActivity = [
  { id: 1, type: "meeting", stakeholder: "John Investor", action: "Scheduled Q1 review meeting", time: "2 hours ago" },
  {
    id: 2,
    type: "reminder",
    stakeholder: "AI Assistant",
    action: "Send monthly update to Sarah Mentor",
    time: "1 day ago",
  },
  { id: 3, type: "document", stakeholder: "Legal Team", action: "NDA signed with TechCorp", time: "3 days ago" },
]

// Mock team data
const teamMembers = [
  { name: "Alex Founder", role: "CEO", address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" as Address, status: "active" },
  { name: "Sarah CTO", role: "CTO", address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" as Address, status: "active" },
  { name: "Mike Dev", role: "Developer", address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" as Address, status: "pending" },
]

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h2
              className="text-3xl font-bold text-foreground text-balance"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Welcome, here's your startup at a glance
            </h2>
            <p className="text-muted-foreground mt-2">Track your progress and manage stakeholder relationships</p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Funding Overview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-accent" />
                  Funding Overview
                </CardTitle>
                <CardDescription>Funds received by month (Lisk integration)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fundingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]} />
                      <Bar dataKey="amount" fill="hsl(var(--accent))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                  <span>Total Raised: $445,000</span>
                  <span>4 Investors</span>
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-accent" />
                  Milestones
                </CardTitle>
                <CardDescription>Upcoming deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Product Launch</span>
                    <Badge variant="outline">7 days</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Series A Prep</span>
                    <Badge variant="outline">30 days</Badge>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Legal Review</span>
                    <Badge variant="outline">14 days</Badge>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stakeholder Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-accent" />
                  Stakeholder Activity
                </CardTitle>
                <CardDescription>Recent interactions and AI reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stakeholderActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-card">
                      <div className="flex-shrink-0">
                        {activity.type === "meeting" && <Calendar className="h-4 w-4 text-accent" />}
                        {activity.type === "reminder" && <MessageSquare className="h-4 w-4 text-accent" />}
                        {activity.type === "document" && <FileText className="h-4 w-4 text-accent" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.stakeholder}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Compliance Docs Quick Access */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-accent" />
                    Compliance Docs
                  </CardTitle>
                  <CardDescription>Quick access to AI-powered document generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/compliance?template=contract">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Contract
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/compliance?template=investor-update">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Draft Investor Update
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/dashboard/compliance?template=mou">
                      <Shield className="mr-2 h-4 w-4" />
                      Generate MOU
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Team Snapshot */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-accent" />
                    Team Snapshot
                  </CardTitle>
                  <CardDescription>ENS-Liskd roles and member list</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-card">
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <AddressOrEns address={member.address} className="text-xs text-muted-foreground" showBlockExplorerLink={false} />
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium">{member.role}</p>
                          <Badge variant={member.status === "active" ? "default" : "secondary"} className="text-xs">
                            {member.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    <Link href="/dashboard/team">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Manage Team
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
