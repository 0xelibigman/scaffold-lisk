"use client"

import type React from "react"
import type { ContractInput } from "@/app/ai/types/ContractInput"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import dynamic from "next/dynamic"
import {
  Download,
  Save,
  LinkIcon,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Users,
  DollarSign,
  Shield,
  TrendingUp,
  FileCheck,
  ChevronDown,
  ChevronUp,
  FileOutput,
  Settings,
} from "lucide-react"
import Link from "next/link"

// Import the Markdown editor with dynamic import to prevent SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

// Add the required CSS styles
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"

interface DocumentTemplate {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  fields: Array<{
    name: string
    label: string
    type: "text" | "textarea" | "select" | "number" | "date"
    required: boolean
    options?: string[]
  }>
}

const templates: DocumentTemplate[] = [
  {
    id: "nda",
    name: "Non-Disclosure Agreement",
    description: "Protect confidential information shared with partners",
    icon: <Shield className="h-5 w-5" />,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "recipientName", label: "Recipient Name", type: "text", required: true },
      { name: "recipientTitle", label: "Recipient Title", type: "text", required: true },
      {
        name: "jurisdiction",
        label: "Jurisdiction",
        type: "select",
        required: true,
        options: ["Buenos Aires", "California", "New York",  "Accra", "Other"],
      },
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "purpose", label: "Purpose of Disclosure", type: "textarea", required: true },
    ],
  },
  {
    id: "investor-agreement",
    name: "Investor Agreement",
    description: "Formalize investment terms and conditions",
    icon: <DollarSign className="h-5 w-5" />,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "investorName", label: "Investor Name", type: "text", required: true },
      { name: "investmentAmount", label: "Investment Amount ($)", type: "number", required: true },
      { name: "equityPercentage", label: "Equity Percentage (%)", type: "number", required: true },
      { name: "valuation", label: "Company Valuation ($)", type: "number", required: true },
      {
        name: "jurisdiction",
        label: "Jurisdiction",
        type: "select",
        required: true,
        options: ["Buenos Aires", "California", "New York",  "Accra", "Other"],
      },
    ],
  },
  {
    id: "team-equity",
    name: "Team Equity Split",
    description: "Define equity distribution among team members",
    icon: <Users className="h-5 w-5" />,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "founderName", label: "Founder Name", type: "text", required: true },
      { name: "cofounderName", label: "Co-founder Name", type: "text", required: true },
      { name: "founderEquity", label: "Founder Equity (%)", type: "number", required: true },
      { name: "cofounderEquity", label: "Co-founder Equity (%)", type: "number", required: true },
      { name: "vestingPeriod", label: "Vesting Period (years)", type: "number", required: true },
    ],
  },
  {
    id: "mou",
    name: "Memorandum of Understanding",
    description: "Outline partnership terms and mutual agreements",
    icon: <FileCheck className="h-5 w-5" />,
    fields: [
      { name: "party1Name", label: "First Party Name", type: "text", required: true },
      { name: "party2Name", label: "Second Party Name", type: "text", required: true },
      { name: "purpose", label: "Purpose of Agreement", type: "textarea", required: true },
      { name: "duration", label: "Duration (months)", type: "number", required: true },
      {
        name: "jurisdiction",
        label: "Jurisdiction",
        type: "select",
        required: true,
        options: ["Buenos Aires", "California", "New York",  "Accra", "Other"],
      },
    ],
  },
  {
    id: "progress-report",
    name: "Progress Report",
    description: "Update stakeholders on company milestones",
    icon: <TrendingUp className="h-5 w-5" />,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "reportingPeriod", label: "Reporting Period", type: "text", required: true },
      { name: "keyMetrics", label: "Key Metrics", type: "textarea", required: true },
      { name: "achievements", label: "Key Achievements", type: "textarea", required: true },
      { name: "challenges", label: "Challenges", type: "textarea", required: true },
      { name: "nextSteps", label: "Next Steps", type: "textarea", required: true },
    ],
  },
]

export default function ComplianceDocsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [generatedDoc, setGeneratedDoc] = useState<string>("")
  const [originalDoc, setOriginalDoc] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedDocId, setSavedDocId] = useState<string>("")
  const [blockchainHash, setBlockchainHash] = useState<string>("")
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("edit")
  const [hasEdited, setHasEdited] = useState(false)
  const [isDetailsCollapsed, setIsDetailsCollapsed] = useState(false)

  const handleTemplateSelect = (template: DocumentTemplate) => {
    setSelectedTemplate(template)
    setFormData({})
    setGeneratedDoc("")
    setOriginalDoc("")
    setSavedDocId("")
    setBlockchainHash("")
    setHasEdited(false)
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateDocument = async () => {
    if (!selectedTemplate) return

    setIsGenerating(true)
    
    try {
      // Import the AI generator
      const { generateContract } = await import('@/app/ai/generators/generateContract');
      
      // Cast the form data to the appropriate contract type
      const contractData = {
        ...formData,
        contractType: selectedTemplate.id,
      } as unknown as ContractInput;
      
      const response = await generateContract(contractData);
      
      if (response.error) {
        console.error('Error generating document:', response.error);
      } else {
        // Convert plain text to markdown format
        let content = response.content;
        
        // Automatically convert headings and sections to markdown
        content = convertToMarkdown(content);
        
        setGeneratedDoc(content);
        setOriginalDoc(content); // Store the original document
        setHasEdited(false); // Reset editing state
        
        // Collapse the details card to give more space to the document
        setTimeout(() => {
          setIsDetailsCollapsed(true);
        }, 500); // Small delay for better UX
      }
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setIsGenerating(false);
    }
  }
  
  /**
   * Converts plain text to markdown by detecting sections and headings
   */
  const convertToMarkdown = (text: string): string => {
    // Split text into lines
    const lines = text.split('\n');
    let markdownLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Convert section titles/headings to markdown
      if (/^[A-Z0-9\s\.]{2,}:?$/.test(line.trim()) && line.trim().length > 0) {
        // This looks like a main heading/title (all caps)
        markdownLines.push(`# ${line.trim()}`);
      } else if (/^[0-9]+\.\s/.test(line)) {
        // Numbered section
        markdownLines.push(`## ${line.trim()}`);
      } else if (/^[A-Z][A-Za-z\s]+:/.test(line)) {
        // Section with colon
        const parts = line.split(':');
        markdownLines.push(`### ${parts[0].trim()}`);
        if (parts[1] && parts[1].trim().length > 0) {
          markdownLines.push(parts[1].trim());
        }
      } else {
        // Regular line
        markdownLines.push(line);
      }
    }
    
    return markdownLines.join('\n');
  }

  const saveDocument = async () => {
    const docId = `DOC-${Date.now()}`
    setSavedDocId(docId)
    
    // Simulate saving to dataLisk
    console.log("Document saved with ID:", docId)
    
    try {
      // Generate a PDF file
      const { default: jsPDF } = await import('jspdf');
      
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Convert markdown to plain text for better formatting
      const plainText = generatedDoc
        .replace(/^# (.*)/gm, '$1\n==============================')
        .replace(/^## (.*)/gm, '$1\n------------------------------')
        .replace(/^### (.*)/gm, '$1:')
        .replace(/\*\*(.*?)\*\*/g, '$1');
      
      // Split text into lines to handle pagination
      const lines = plainText.split('\n');
      
      // Add content to PDF
      let y = 10;
      const lineHeight = 7;
      const pageHeight = doc.internal.pageSize.height - 20; // Leave margin
      
      // Add title
      doc.setFontSize(16);
      doc.text(selectedTemplate?.name || "Document", 10, y);
      y += lineHeight * 2;
      
      // Add content with normal font size
      doc.setFontSize(12);
      
      // Add each line with proper line breaks
      for (const line of lines) {
        // Check if we need a new page
        if (y > pageHeight) {
          doc.addPage();
          y = 10;
        }
        
        // Add the line
        if (line.includes('=====')) {
          // Section title
          doc.setFontSize(14);
          doc.text(line.replace('==============================', '').trim(), 10, y);
          doc.setFontSize(12);
        } else if (line.includes('-----')) {
          // Subsection
          doc.setFontSize(13);
          doc.text(line.replace('------------------------------', '').trim(), 10, y);
          doc.setFontSize(12);
        } else {
          // Regular text
          doc.text(line, 10, y);
        }
        y += lineHeight;
      }
      
      // Save the PDF
      doc.save(`${selectedTemplate?.name.replace(/\s+/g, "_")}_${docId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Fallback to text file if PDF generation fails
      const plainText = generatedDoc
        .replace(/^# (.*)/gm, '$1\n==============================')
        .replace(/^## (.*)/gm, '$1\n------------------------------')
        .replace(/^### (.*)/gm, '$1:')
        .replace(/\*\*(.*?)\*\*/g, '$1');
        
      const blob = new Blob([plainText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${selectedTemplate?.name.replace(/\s+/g, "_")}_${docId}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
    
    // Show save confirmation with edited indicator
    return docId
  }

  const exportToPDF = async () => {
    try {
      // Dynamic import jspdf only when needed
      const { default: jsPDF } = await import('jspdf');
      
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Convert markdown to plain text for better formatting
      const plainText = generatedDoc
        .replace(/^# (.*)/gm, '$1\n==============================')
        .replace(/^## (.*)/gm, '$1\n------------------------------')
        .replace(/^### (.*)/gm, '$1:')
        .replace(/\*\*(.*?)\*\*/g, '$1');
      
      // Split text into lines to handle pagination
      const lines = plainText.split('\n');
      
      // Add content to PDF
      let y = 10;
      const lineHeight = 7;
      const pageHeight = doc.internal.pageSize.height - 20; // Leave margin
      
      // Add title
      doc.setFontSize(16);
      doc.text(selectedTemplate?.name || "Document", 10, y);
      y += lineHeight * 2;
      
      // Add content with normal font size
      doc.setFontSize(12);
      
      // Add each line with proper line breaks
      for (const line of lines) {
        // Check if we need a new page
        if (y > pageHeight) {
          doc.addPage();
          y = 10;
        }
        
        // Add the line
        if (line.includes('=====')) {
          // Section title
          doc.setFontSize(14);
          doc.text(line.replace('==============================', '').trim(), 10, y);
          doc.setFontSize(12);
        } else if (line.includes('-----')) {
          // Subsection
          doc.setFontSize(13);
          doc.text(line.replace('------------------------------', '').trim(), 10, y);
          doc.setFontSize(12);
        } else {
          // Regular text
          doc.text(line, 10, y);
        }
        y += lineHeight;
      }
      
      // Save the PDF
      doc.save(`${selectedTemplate?.name.replace(/\s+/g, "_")}_${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to text if PDF generation fails
      exportAsText();
    }
  }
  
  const exportAsText = () => {
    // Export as a formatted text file
    const plainText = generatedDoc
      .replace(/^# (.*)/gm, '$1\n==============================')
      .replace(/^## (.*)/gm, '$1\n------------------------------')
      .replace(/^### (.*)/gm, '$1:')
      .replace(/\*\*(.*?)\*\*/g, '$1');
    
    // Create a text file that can be opened in any text editor
    const blob = new Blob([plainText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedTemplate?.name.replace(/\s+/g, "_")}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const logToBlockchain = () => {
    // Simulate blockchain logging on Lisk
    const hash = `0x${Math.random().toString(16).substr(2, 64)}`
    setBlockchainHash(hash)
    console.log("Document hash logged to Lisk blockchain:", hash)
  }

  if (!selectedTemplate) {
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
              AI Legal Document Generator
            </h1>
            <p className="text-muted-foreground mt-2">Generate and edit legal documents with AI assistance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer hover:shadow-lg transition-shadow border-border"
                onClick={() => handleTemplateSelect(template)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg text-accent">{template.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Document
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
            <Badge variant="secondary">{selectedTemplate.name}</Badge>
          </div>
          <h1
            className="text-3xl font-bold text-foreground text-balance"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Generate {selectedTemplate.name}
          </h1>
          <p className="text-muted-foreground mt-2">{selectedTemplate.description}</p>
        </div>

        <div className={`grid lg:grid-cols-${isDetailsCollapsed && generatedDoc ? '1' : '2'} gap-8 transition-all duration-500 ease-in-out`}>
          {/* Form Section */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isDetailsCollapsed && generatedDoc ? 'max-h-16' : 'max-h-[2000px]'}`}>
            <Card className={`${isDetailsCollapsed && generatedDoc ? 'cursor-pointer' : ''}`} onClick={() => generatedDoc && setIsDetailsCollapsed(!isDetailsCollapsed)}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Document Details</CardTitle>
                  <CardDescription>Fill in the required information to generate your document</CardDescription>
                </div>
                {generatedDoc && (
                  <Button variant="ghost" size="sm" className="ml-2" onClick={(e) => {e.stopPropagation(); setIsDetailsCollapsed(!isDetailsCollapsed)}}>
                    {isDetailsCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                  </Button>
                )}
              </CardHeader>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isDetailsCollapsed && generatedDoc ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'}`}>
                <CardContent className="space-y-4">
                  {selectedTemplate.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>

                      {field.type === "text" && (
                        <Input
                          id={field.name}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      )}

                      {field.type === "textarea" && (
                        <Textarea
                          id={field.name}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                          rows={3}
                        />
                      )}

                      {field.type === "number" && (
                        <Input
                          id={field.name}
                          type="number"
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      )}

                      {field.type === "date" && (
                        <Input
                          id={field.name}
                          type="date"
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      )}

                      {field.type === "select" && (
                        <Select
                          value={formData[field.name] || ""}
                          onValueChange={(value) => handleInputChange(field.name, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}

                  <Button
                    onClick={generateDocument}
                    disabled={
                      isGenerating || !selectedTemplate.fields.filter((f) => f.required).every((f) => formData[f.name])
                    }
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Generating Document...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate with AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Generated Document Section */}
          <div className={`space-y-6 transition-all duration-500 ease-in-out ${isDetailsCollapsed && generatedDoc ? 'col-span-1' : ''}`}>
            {isGenerating && (
              <Card>
                <CardHeader>
                  <CardTitle>Generating Document</CardTitle>
                  <CardDescription>Our AI is crafting your legal document...</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className="relative w-24 h-24 mb-4">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute top-2 left-2 w-20 h-20 border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    <div className="absolute top-4 left-4 w-16 h-16 border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                    <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary animate-pulse" />
                  </div>
                  <p className="text-center text-muted-foreground mt-4">
                    This might take a moment as we're crafting a tailored legal document based on your inputs...
                  </p>
                  <div className="flex flex-col items-center mt-4 w-full max-w-md">
                    <div className="w-full bg-muted rounded-full h-1.5 mb-1 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full w-4/5 relative animate-pulse origin-left">
                        <div className="absolute h-full left-0 bg-white/20 w-16 transform -skew-x-12 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {generatedDoc && !isGenerating && (
              <Card className="transition-all duration-500 ease-in-out">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>
                        Generated Document
                        {hasEdited && (
                          <span className="ml-2 text-xs text-blue-500 font-normal">(edited)</span>
                        )}
                      </CardTitle>
                      <CardDescription>AI-generated legal document ready for review</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setPreviewMode(previewMode === "edit" ? "preview" : "edit")}
                        className={`${previewMode === "edit" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}`}
                      >
                        {previewMode === "edit" ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            Preview
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            Edit
                          </>
                        )}
                      </Button>
                      
                      {hasEdited && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setGeneratedDoc(originalDoc);
                            setHasEdited(false);
                          }}
                          className="text-orange-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                            <path d="M21 3v5h-5"></path>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                            <path d="M8 16H3v5"></path>
                          </svg>
                          Reset
                        </Button>
                      )}
                      
                      {isDetailsCollapsed && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsDetailsCollapsed(false)}
                          className="text-gray-700"
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Show Details
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div data-color-mode="light">
                      <MDEditor
                        value={generatedDoc}
                        onChange={(value) => {
                          setGeneratedDoc(value || "");
                          if (value !== originalDoc) {
                            setHasEdited(true);
                          } else {
                            setHasEdited(false);
                          }
                        }}
                        height={isDetailsCollapsed ? 600 : 400}
                        preview={previewMode}
                        visibleDragbar={false}
                      />
                    </div>
                    {previewMode === "edit" && (
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Pro tip:</span> You can edit the document content directly to make any necessary changes. Click the Preview button to see how it will look when finalized.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button onClick={saveDocument} variant="outline" size="sm">
                      <Save className="mr-2 h-4 w-4" />
                      Save Document
                    </Button>
                    <Button onClick={exportToPDF} variant="outline" size="sm">
                      <FileOutput className="mr-2 h-4 w-4" />
                      Export as PDF
                    </Button>
                    <Button onClick={exportAsText} variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export as Text
                    </Button>
                    <Button onClick={logToBlockchain} variant="outline" size="sm">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Log to Blockchain
                    </Button>
                  </div>

                  {savedDocId && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center text-green-800">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <div>
                          <p>Document saved with ID: {savedDocId}</p>
                          <p className="text-xs text-green-600 mt-1">Your edited document has been saved successfully.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {blockchainHash && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center text-blue-800">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Blockchain hash: {blockchainHash}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {generatedDoc && !isGenerating && !isDetailsCollapsed && (
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                  <CardDescription>Recommended actions after document generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="review" />
                      <Label htmlFor="review" className="text-sm">
                        Review document with legal counsel
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="signatures" />
                      <Label htmlFor="signatures" className="text-sm">
                        Collect required signatures
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="store" />
                      <Label htmlFor="store" className="text-sm">
                        Store in secure document repository
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify" />
                      <Label htmlFor="notify" className="text-sm">
                        Notify relevant stakeholders
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="calendar" />
                      <Label htmlFor="calendar" className="text-sm">
                        Set calendar reminders for key dates
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Document generation functions
function generateNDA(data: Record<string, string>): string {
  return `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${data.effectiveDate || "[DATE]"} between ${data.companyName || "[COMPANY]"} ("Disclosing Party") and ${data.recipientName || "[RECIPIENT]"}, ${data.recipientTitle || "[TITLE]"} ("Receiving Party").

WHEREAS, the Disclosing Party possesses certain confidential and proprietary information related to ${data.purpose || "[PURPOSE]"};

WHEREAS, the Receiving Party desires to receive such confidential information for evaluation purposes;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. CONFIDENTIAL INFORMATION
The term "Confidential Information" shall mean all information disclosed by the Disclosing Party, whether orally, in writing, or in any other form.

2. NON-DISCLOSURE OBLIGATIONS
The Receiving Party agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose any Confidential Information to third parties
c) Use Confidential Information solely for evaluation purposes

3. TERM
This Agreement shall remain in effect for a period of three (3) years from the date first written above.

4. GOVERNING LAW
This Agreement shall be governed by the laws of ${data.jurisdiction || "[JURISDICTION]"}.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

_________________________          _________________________
${data.companyName || "[COMPANY]"}                    ${data.recipientName || "[RECIPIENT]"}
Disclosing Party                    Receiving Party`
}

function generateInvestorAgreement(data: Record<string, string>): string {
  return `INVESTMENT AGREEMENT

This Investment Agreement ("Agreement") is entered into between ${data.companyName || "[COMPANY]"} ("Company") and ${data.investorName || "[INVESTOR]"} ("Investor").

INVESTMENT TERMS:
- Investment Amount: $${data.investmentAmount || "[AMOUNT]"}
- Equity Percentage: ${data.equityPercentage || "[PERCENTAGE]"}%
- Company Valuation: $${data.valuation || "[VALUATION]"}

1. INVESTMENT
Investor agrees to invest $${data.investmentAmount || "[AMOUNT]"} in exchange for ${data.equityPercentage || "[PERCENTAGE]"}% equity in the Company.

2. USE OF FUNDS
The Company shall use the investment funds for business operations and growth initiatives.

3. REPRESENTATIONS AND WARRANTIES
Both parties represent that they have the authority to enter into this Agreement.

4. GOVERNING LAW
This Agreement shall be governed by the laws of ${data.jurisdiction || "[JURISDICTION]"}.

_________________________          _________________________
${data.companyName || "[COMPANY]"}                    ${data.investorName || "[INVESTOR]"}
Company                             Investor`
}

function generateTeamEquity(data: Record<string, string>): string {
  return `TEAM EQUITY SPLIT AGREEMENT

${data.companyName || "[COMPANY]"}

EQUITY DISTRIBUTION:
- ${data.founderName || "[FOUNDER]"}: ${data.founderEquity || "[PERCENTAGE]"}%
- ${data.cofounderName || "[CO-FOUNDER]"}: ${data.cofounderEquity || "[PERCENTAGE]"}%

VESTING SCHEDULE:
All equity shall vest over ${data.vestingPeriod || "[YEARS]"} years with a one-year cliff.

This agreement establishes the initial equity distribution among founding team members.

_________________________          _________________________
${data.founderName || "[FOUNDER]"}                   ${data.cofounderName || "[CO-FOUNDER]"}
Founder                             Co-Founder`
}

function generateMOU(data: Record<string, string>): string {
  return `MEMORANDUM OF UNDERSTANDING

Between: ${data.party1Name || "[PARTY 1]"} and ${data.party2Name || "[PARTY 2]"}

PURPOSE: ${data.purpose || "[PURPOSE]"}

DURATION: ${data.duration || "[DURATION]"} months

This MOU outlines the mutual understanding and cooperation between the parties.

GOVERNING LAW: ${data.jurisdiction || "[JURISDICTION]"}

_________________________          _________________________
${data.party1Name || "[PARTY 1]"}                    ${data.party2Name || "[PARTY 2]"}`
}

function generateProgressReport(data: Record<string, string>): string {
  return `PROGRESS REPORT
${data.companyName || "[COMPANY]"}

Reporting Period: ${data.reportingPeriod || "[PERIOD]"}

KEY METRICS:
${data.keyMetrics || "[METRICS]"}

ACHIEVEMENTS:
${data.achievements || "[ACHIEVEMENTS]"}

CHALLENGES:
${data.challenges || "[CHALLENGES]"}

NEXT STEPS:
${data.nextSteps || "[NEXT STEPS]"}

Report generated on ${new Date().toLocaleDateString()}`
}
