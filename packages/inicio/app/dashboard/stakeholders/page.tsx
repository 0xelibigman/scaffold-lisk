"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Search,
  Plus,
  DollarSign,
  Users,
  Award,
  Gavel,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Bell,
  Edit,
} from "lucide-react"
import Link from "next/link"

interface Stakeholder {
  id: string
  name: string
  role: "Investor" | "Mentor" | "Sponsor" | "Judge"
  company?: string
  email: string
  phone?: string
  lastInteraction: string
  nextStep: string
  status: "active" | "pending" | "inactive"
  notes: string
  investmentAmount?: number
  expertise?: string[]
  aiReminders: string[]
}

const mockStakeholders: Stakeholder[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Investor",
    company: "Venture Capital Partners",
    email: "sarah@vcpartners.com",
    phone: "+1 (555) 123-4567",
    lastInteraction: "2024-01-15",
    nextStep: "Send Q1 financial report",
    status: "active",
    notes: "Interested in Series A round. Prefers monthly updates. Strong network in fintech.",
    investmentAmount: 250000,
    expertise: ["Fintech", "B2B SaaS"],
    aiReminders: [
      "Send monthly investor update by end of week",
      "Schedule Q1 board meeting",
      "Prepare Series A pitch deck",
    ],
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Mentor",
    company: "TechStars",
    email: "michael@techstars.com",
    lastInteraction: "2024-01-10",
    nextStep: "Schedule product strategy session",
    status: "active",
    notes: "Former CTO at successful startup. Great for technical guidance and product strategy.",
    expertise: ["Product Strategy", "Technical Leadership", "Scaling"],
    aiReminders: ["Follow up on product roadmap feedback", "Ask about intro to potential CTO candidates"],
  },
  {
    id: "3",
    name: "Jennifer Martinez",
    role: "Sponsor",
    company: "Innovation Labs",
    email: "jennifer@innovationlabs.com",
    phone: "+1 (555) 987-6543",
    lastInteraction: "2024-01-08",
    nextStep: "Finalize partnership agreement",
    status: "pending",
    notes: "Sponsoring our participation in upcoming demo day. Interested in strategic partnership.",
    aiReminders: ["Send partnership proposal draft", "Confirm demo day presentation slot"],
  },
  {
    id: "4",
    name: "Robert Kim",
    role: "Judge",
    company: "Startup Competition",
    email: "robert@startupcomp.com",
    lastInteraction: "2024-01-05",
    nextStep: "Submit final pitch materials",
    status: "active",
    notes: "Judge for the upcoming startup competition. Focus on scalability and market potential.",
    expertise: ["Market Analysis", "Business Models"],
    aiReminders: ["Prepare 3-minute elevator pitch", "Update financial projections for competition"],
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "Investor",
    company: "Angel Network",
    email: "lisa@angelnetwork.com",
    lastInteraction: "2024-01-12",
    nextStep: "Due diligence review",
    status: "pending",
    notes: "Angel investor interested in seed round. Requires detailed due diligence package.",
    investmentAmount: 50000,
    expertise: ["Early Stage", "Consumer Tech"],
    aiReminders: ["Prepare due diligence data room", "Schedule follow-up call next week"],
  },
]

const getRoleIcon = (role: string) => {
  switch (role) {
    case "Investor":
      return <DollarSign className="h-4 w-4" />
    case "Mentor":
      return <Users className="h-4 w-4" />
    case "Sponsor":
      return <Award className="h-4 w-4" />
    case "Judge":
      return <Gavel className="h-4 w-4" />
    default:
      return <Users className="h-4 w-4" />
  }
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "Investor":
      return "bg-green-100 text-green-800"
    case "Mentor":
      return "bg-blue-100 text-blue-800"
    case "Sponsor":
      return "bg-purple-100 text-purple-800"
    case "Judge":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function StakeholdersPage() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(mockStakeholders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredStakeholders = stakeholders.filter(
    (stakeholder) =>
      stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stakeholder.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stakeholder.company?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStakeholderClick = (stakeholder: Stakeholder) => {
    setSelectedStakeholder(stakeholder)
    setIsDetailOpen(true)
  }

  const updateNotes = (notes: string) => {
    if (selectedStakeholder) {
      const updatedStakeholder = { ...selectedStakeholder, notes }
      setSelectedStakeholder(updatedStakeholder)
      setStakeholders((prev) => prev.map((s) => (s.id === selectedStakeholder.id ? updatedStakeholder : s)))
    }
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
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold text-foreground text-balance"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Stakeholder CRM
              </h1>
              <p className="text-muted-foreground mt-2">Manage relationships with investors, mentors, and partners</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Stakeholder
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search stakeholders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  All ({stakeholders.length})
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Investors ({stakeholders.filter((s) => s.role === "Investor").length})
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Mentors ({stakeholders.filter((s) => s.role === "Mentor").length})
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stakeholders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Stakeholders</CardTitle>
            <CardDescription>Track interactions and manage relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Interaction</TableHead>
                  <TableHead>Next Step</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStakeholders.map((stakeholder) => (
                  <TableRow
                    key={stakeholder.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleStakeholderClick(stakeholder)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{stakeholder.name}</div>
                        {stakeholder.company && (
                          <div className="text-sm text-muted-foreground">{stakeholder.company}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`p-1 rounded ${getRoleColor(stakeholder.role)}`}>
                          {getRoleIcon(stakeholder.role)}
                        </div>
                        <span>{stakeholder.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(stakeholder.lastInteraction).toLocaleDateString()}</TableCell>
                    <TableCell className="max-w-xs truncate">{stakeholder.nextStep}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          stakeholder.status === "active"
                            ? "default"
                            : stakeholder.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {stakeholder.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stakeholder Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedStakeholder && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                    <div className={`p-2 rounded ${getRoleColor(selectedStakeholder.role)}`}>
                      {getRoleIcon(selectedStakeholder.role)}
                    </div>
                    <div>
                      <div>{selectedStakeholder.name}</div>
                      <div className="text-sm font-normal text-muted-foreground">{selectedStakeholder.company}</div>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    {selectedStakeholder.role} • Last interaction:{" "}
                    {new Date(selectedStakeholder.lastInteraction).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStakeholder.email}</span>
                      </div>
                      {selectedStakeholder.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedStakeholder.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Investment Details */}
                  {selectedStakeholder.investmentAmount && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Investment Details</h3>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">${selectedStakeholder.investmentAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expertise */}
                  {selectedStakeholder.expertise && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedStakeholder.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Reminders */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Bell className="mr-2 h-4 w-4 text-accent" />
                      AI-Suggested Reminders
                    </h3>
                    <div className="space-y-2">
                      {selectedStakeholder.aiReminders.map((reminder, index) => (
                        <div key={index} className="flex items-start space-x-2 p-2 bg-accent/10 rounded-lg">
                          <MessageSquare className="h-4 w-4 text-accent mt-0.5" />
                          <span className="text-sm">{reminder}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">Notes</h3>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      value={selectedStakeholder.notes}
                      onChange={(e) => updateNotes(e.target.value)}
                      placeholder="Add notes about this stakeholder..."
                      rows={4}
                    />
                  </div>

                  {/* Next Steps */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm">{selectedStakeholder.nextStep}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t">
                    <Button className="flex-1">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
