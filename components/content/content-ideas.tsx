"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAIContent } from "@/hooks/use-ai-content"
import { useToast } from "@/hooks/use-toast"
import { Lightbulb, Loader2, RefreshCw, Sparkles } from "lucide-react"

export function ContentIdeas() {
  const [userType, setUserType] = useState<"job-seeker" | "aspiring-influencer">("job-seeker")
  const [industry, setIndustry] = useState("technology")
  const [ideas, setIdeas] = useState<string[]>([])
  const { generateIdeas, isGenerating, error } = useAIContent()
  const { toast } = useToast()

  const handleGenerateIdeas = async () => {
    const generatedIdeas = await generateIdeas({ userType, industry, count: 8 })

    if (generatedIdeas) {
      setIdeas(generatedIdeas)
      toast({
        title: "Ideas generated!",
        description: `Generated ${generatedIdeas.length} content ideas for you.`,
      })
    } else if (error) {
      toast({
        title: "Generation failed",
        description: error,
        variant: "destructive",
      })
    }
  }

  const handleUseIdea = (idea: string) => {
    // This would typically navigate to the generate tab with the idea pre-filled
    toast({
      title: "Idea selected",
      description: "Navigate to the Generate tab to create content from this idea.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span>Content Ideas Generator</span>
          </CardTitle>
          <CardDescription>Get AI-powered content ideas tailored to your goals and industry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Goal</label>
              <Select
                value={userType}
                onValueChange={(value: "job-seeker" | "aspiring-influencer") => setUserType(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job-seeker">Job Seeker</SelectItem>
                  <SelectItem value="aspiring-influencer">Aspiring Influencer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue />
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
          </div>

          <Button onClick={handleGenerateIdeas} disabled={isGenerating} className="w-full" size="lg">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 w-4 h-4" />
                Generate Content Ideas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {ideas.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Content Ideas</CardTitle>
                <CardDescription>Click on any idea to use it for content generation</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleGenerateIdeas} disabled={isGenerating}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {ideas.map((idea, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50"
                  onClick={() => handleUseIdea(idea)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <p className="text-sm leading-relaxed flex-1">{idea}</p>
                      <Button variant="ghost" size="sm" className="ml-2 flex-shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {ideas.length === 0 && !isGenerating && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">No ideas generated yet</h3>
              <p className="text-sm">Generate content ideas to get started with your LinkedIn posts.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
