"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Shield,
  UserPlus,
  Mail,
  Trash2,
  Edit,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  email: string
  ensId?: string
  role: "CEO" | "CTO" | "Developer" | "Designer" | "Marketing" | "Operations"
  privileges: string[]
  status: "active" | "pending" | "inactive"
  joinedDate: string
  lastActive: string
}

interface PendingInvite {
  id: string
  email?: string
  ensId?: string
  role: string
  invitedBy: string
  invitedDate: string
  status: "pending" | "expired"
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Founder",
    email: "alex@inicio.com",
    ensId: "alex.eth",
    role: "CEO",
    privileges: ["Admin", "Financial", "Legal", "Team Management"],
    status: "active",
    joinedDate: "2024-01-01",
    lastActive: "2024-01-20",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@inicio.com",
    ensId: "sarah.eth",
    role: "CTO",
    privileges: ["Technical", "Team Management", "Product"],
    status: "active",
    joinedDate: "2024-01-05",
    lastActive: "2024-01-19",
  },
  {
    id: "3",
    name: "Mike Developer",
    email: "mike@inicio.com",
    ensId: "mike.eth",
    role: "Developer",
    privileges: ["Technical", "Product"],
    status: "pending",
    joinedDate: "2024-01-15",
    lastActive: "2024-01-18",
  },
]

const mockPendingInvites: PendingInvite[] = [
  {
    id: "1",
    email: "designer@example.com",
    role: "Designer",
    invitedBy: "Alex Founder",
    invitedDate: "2024-01-18",
    status: "pending",
  },
  {
    id: "2",
    ensId: "marketing.eth",
    role: "Marketing",
    invitedBy: "Alex Founder",
    invitedDate: "2024-01-17",
    status: "pending",
  },
]

const roleOptions = ["CEO", "CTO", "Developer", "Designer", "Marketing", "Operations"]
const privilegeOptions = ["Admin", "Financial", "Legal", "Technical", "Team Management", "Product", "Marketing"]

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>(mockPendingInvites)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteMethod, setInviteMethod] = useState<"email" | "ens">("email")
  const [inviteData, setInviteData] = useState({
    email: "",
    ensId: "",
    role: "",
  })

  const handleInvite = () => {
    const newInvite: PendingInvite = {
      id: Date.now().toString(),
      email: inviteMethod === "email" ? inviteData.email : undefined,
      ensId: inviteMethod === "ens" ? inviteData.ensId : undefined,
      role: inviteData.role,
      invitedBy: "Alex Founder",
      invitedDate: new Date().toISOString().split("T")[0],
      status: "pending",
    }

    setPendingInvites([...pendingInvites, newInvite])
    setInviteData({ email: "", ensId: "", role: "" })
    setIsInviteOpen(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "inactive":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
                Team & Roles
              </h1>
              <p className="text-muted-foreground mt-2">Manage team members and ENS-Liskd access control</p>
            </div>
            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>Add a new member to your team via email or ENS</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Tabs value={inviteMethod} onValueChange={(value) => setInviteMethod(value as "email" | "ens")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">Email Invite</TabsTrigger>
                      <TabsTrigger value="ens">ENS Invite</TabsTrigger>
                    </TabsList>
                    <TabsContent value="email" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="member@example.com"
                          value={inviteData.email}
                          onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="ens" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ens">ENS Name</Label>
                        <Input
                          id="ens"
                          placeholder="member.eth"
                          value={inviteData.ensId}
                          onChange={(e) => setInviteData({ ...inviteData, ensId: e.target.value })}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={inviteData.role}
                      onValueChange={(value) => setInviteData({ ...inviteData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleInvite}
                    disabled={!inviteData.role || (!inviteData.email && !inviteData.ensId)}
                    className="w-full"
                  >
                    Send Invite
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList>
            <TabsTrigger value="members">Team Members ({teamMembers.length})</TabsTrigger>
            <TabsTrigger value="invites">Pending Invites ({pendingInvites.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage roles, privileges, and access control</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>ENS ID</TableHead>
                      <TableHead>Privileges</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.role}</Badge>
                        </TableCell>
                        <TableCell>
                          {member.ensId ? (
                            <div className="flex items-center space-x-2">
                              <Shield className="h-4 w-4 text-accent" />
                              <span className="font-mono text-sm">{member.ensId}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Not connected</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {member.privileges.slice(0, 2).map((privilege) => (
                              <Badge key={privilege} variant="secondary" className="text-xs">
                                {privilege}
                              </Badge>
                            ))}
                            {member.privileges.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{member.privileges.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(member.status)}
                            <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            {member.role !== "CEO" && (
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invites">
            <Card>
              <CardHeader>
                <CardTitle>Pending Invites</CardTitle>
                <CardDescription>Track and manage outstanding team invitations</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingInvites.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No pending invites</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invitee</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Invited By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingInvites.map((invite) => (
                        <TableRow key={invite.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {invite.email ? (
                                <>
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span>{invite.email}</span>
                                </>
                              ) : (
                                <>
                                  <Shield className="h-4 w-4 text-accent" />
                                  <span className="font-mono">{invite.ensId}</span>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{invite.role}</Badge>
                          </TableCell>
                          <TableCell>{invite.invitedBy}</TableCell>
                          <TableCell>{new Date(invite.invitedDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(invite.status)}>{invite.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                Resend
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
