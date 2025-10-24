"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAIContent } from "@/hooks/use-ai-content"
import { Sparkles, Loader2 } from "lucide-react"
import type { ContentGenerationParams, GeneratedContent } from "@/lib/ai"
import { useUser } from "@/context/user-context"

interface ContentFormProps {
  onContentGenerated: (content: GeneratedContent) => void
}

export function ContentForm({ onContentGenerated }: ContentFormProps) {
   const { user} = useUser()
  const [formData, setFormData] = useState<ContentGenerationParams>({
    userType: user?.account_type || "job-seeker",
    industry: "technology",
    topic: "",
    tone: "professional",
    content_type: "post",
    targetAudience: "",
  })

  const { generateContent, isGenerating, error } = useAIContent()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //@ts-ignore
    if (!formData.topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your content.",
        variant: "destructive",
      })
      return
    }

    const content = await generateContent(formData)

    if (content) {
      onContentGenerated(content)
      toast({
        title: "Content generated!",
        description: "Your LinkedIn content is ready for review.",
      })
    } else if (error) {
      toast({
        title: "Generation failed",
        description: error,
        variant: "destructive",
      })
    }
  }

  const updateFormData = (field: keyof ContentGenerationParams, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Type Selection */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            formData.userType === "job-seeker" ? "ring-2 ring-primary bg-primary/5" : ""
          }`}
          onClick={() => updateFormData("userType", "job-seeker")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Job Seeker</CardTitle>
            <CardDescription className="text-xs">Professional content to attract recruiters</CardDescription>
          </CardHeader>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            formData.userType === "aspiring-influencer" ? "ring-2 ring-primary bg-primary/5" : ""
          }`}
          onClick={() => updateFormData("userType", "aspiring-influencer")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Aspiring Influencer</CardTitle>
            <CardDescription className="text-xs">Engaging content to grow your audience</CardDescription>
          </CardHeader>
        </Card>
      </div> */}

      {/* Content Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content_type">Content Type</Label>
          <Select value={formData.content_type} onValueChange={(value) => updateFormData("content_type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="post">Standard Post</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="hook">Hook/Opener</SelectItem>
              <SelectItem value="question">Question Post</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic">Topic or Theme</Label>
        <Textarea
          id="topic"
          placeholder="What do you want to post about? (e.g., 'My experience with AI in software development', 'Tips for remote work productivity')"
          value={formData.topic}
          onChange={(e) => updateFormData("topic", e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tone">Tone</Label>
          <Select value={formData.tone} onValueChange={(value) => updateFormData("tone", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="engaging">Engaging</SelectItem>
              <SelectItem value="thought-leadership">Thought Leadership</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
          <Input
            id="targetAudience"
            placeholder="e.g., Software engineers, HR professionals"
            value={formData.targetAudience}
            onChange={(e) => updateFormData("targetAudience", e.target.value)}
          />
        </div>
      </div>

      {/* Current Selection Summary */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <h3 className="font-medium text-sm mb-2">Content Preview:</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{formData.userType === "job-seeker" ? "Job Seeker" : "Aspiring Influencer"}</Badge>
          <Badge variant="outline">{formData.industry}</Badge>
          <Badge variant="outline">{formData.content_type}</Badge>
          <Badge variant="outline">{formData.tone}</Badge>
        </div>
      </div>

      <Button type="submit" disabled={isGenerating} className="w-full" size="lg">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Generating Content...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 w-4 h-4" />
            Generate Content
          </>
        )}
      </Button>
    </form>
  )
}
