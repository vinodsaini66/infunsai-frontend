"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentForm } from "./content-form"
import { ContentPreview } from "./content-preview"
import { ContentIdeas } from "./content-ideas"
import { TimingOptimizer } from "./timing-optimizer"
import { Sparkles, Lightbulb, Clock, FileText } from "lucide-react"
import type { GeneratedContent } from "@/lib/ai"

export function ContentGenerator() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [activeTab, setActiveTab] = useState("generate")

  const handleContentGenerated = (content: GeneratedContent) => {
    setGeneratedContent(content)
    setActiveTab("preview")
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate" className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Generate</span>
          </TabsTrigger>
          {generatedContent &&
            <TabsTrigger value="preview" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Preview</span>
            </TabsTrigger>
          }
          {/* <TabsTrigger value="ideas" className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4" />
            <span>Ideas</span>
          </TabsTrigger>
          <TabsTrigger value="timing" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Timing</span>
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Generate LinkedIn Content</span>
              </CardTitle>
              <CardDescription>
                Tell us what you want to post about, and our AI will create engaging content for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentForm onContentGenerated={handleContentGenerated} />
            </CardContent>
          </Card>
        </TabsContent>

        {generatedContent && <TabsContent value="preview" className="space-y-6">
          <ContentPreview content={generatedContent} />
        </TabsContent>}

        {/* <TabsContent value="ideas" className="space-y-6">
          <ContentIdeas />
        </TabsContent>

        <TabsContent value="timing" className="space-y-6">
          <TimingOptimizer />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
