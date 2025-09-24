"use client"

import { useState } from "react"
import type { ContentGenerationParams, GeneratedContent } from "@/lib/ai"

export function useAIContent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateContent = async (params: ContentGenerationParams): Promise<GeneratedContent | null> => {
    setIsGenerating(true)
    setError(null)

    try {
      console.log("Generating content with params:", params);

      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate content")
      }

      const content = (await response.json()) as GeneratedContent
      return content
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      return null
    } finally {
      setIsGenerating(false)
    }
  }

  const generateIdeas = async (params: {
    userType: "job-seeker" | "aspiring-influencer"
    industry: string
    count?: number
  }): Promise<string[] | null> => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate ideas")
      }

      const { ideas } = await response.json()
      return ideas
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      return null
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    generateContent,
    generateIdeas,
    isGenerating,
    error,
  }
}
