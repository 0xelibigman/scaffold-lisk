"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ArrowLeft, DollarSign, TrendingUp, Users, Calendar } from "lucide-react"
import Link from "next/link"

// Mock funding data
const monthlyFunding = [
  { month: "Oct", amount: 25000, investor: "Angel Network" },
  { month: "Nov", amount: 50000, investor: "Seed Fund" },
  { month: "Dec", amount: 75000, investor: "VC Partners" },
  { month: "Jan", amount: 120000, investor: "Growth Capital" },
  { month: "Feb", amount: 200000, investor: "Series A Lead" },
]

const investorBreakdown = [
  { name: "Sarah Johnson", amount: 250000, percentage: 45 },
  { name: "Michael Chen", amount: 150000, percentage: 27 },
  { name: "Lisa Thompson", amount: 100000, percentage: 18 },
  { name: "Others", amount: 50000, percentage: 10 },
]

const milestones = [
  { name: "MVP Development", target: 50000, raised: 50000, status: "completed" },
  { name: "Market Validation", target: 150000, raised: 150000, status: "completed" },
  { name: "Product Launch", target: 300000, raised: 280000, status: "in-progress" },
  { name: "Series A Prep", target: 500000, raised: 280000, status: "upcoming" },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export default function FundingTrackerPage() {
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
            Funding Tracker
          </h1>
          <p className="text-muted-foreground mt-2">Track funding progress and investor relationships</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$550,000</div>
              <p className="text-xs text-muted-foreground">+$200K from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Runway</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 months</div>
              <p className="text-xs text-muted-foreground">At current burn rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$500K</div>
              <p className="text-xs text-muted-foreground">Series A target</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Funding Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Funding Progress</CardTitle>
              <CardDescription>Funds received over time (Lisk integration)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyFunding}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]} />
                    <Bar dataKey="amount" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Investor Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Investor Breakdown</CardTitle>
              <CardDescription>Distribution by investor contribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={investorBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                    >
                      {investorBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Investment"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestone Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Milestone Progress</CardTitle>
            <CardDescription>Track progress towards funding milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{milestone.name}</h4>
                      <Badge
                        variant={
                          milestone.status === "completed"
                            ? "default"
                            : milestone.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${milestone.raised.toLocaleString()} / ${milestone.target.toLocaleString()}
                    </div>
                  </div>
                  <Progress value={(milestone.raised / milestone.target) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
