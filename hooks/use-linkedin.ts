"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface LinkedInProfile {
  name: string
  headline?: string
  id: string
}

interface LinkedInStatus {
  connected: boolean
  profile: LinkedInProfile | null
}

export function useLinkedIn() {
  const [status, setStatus] = useState<LinkedInStatus>({ connected: false, profile: null })
  const [isLoading, setIsLoading] = useState(true)
  const [isPosting, setIsPosting] = useState(false)
  const { toast } = useToast()

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/linkedin/status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Failed to check LinkedIn status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const connect = () => {
    window.location.href = "/api/auth/linkedin"
  }

  const postToLinkedIn = async (content: string, visibility: "PUBLIC" | "CONNECTIONS" = "PUBLIC") => {
    if (!status.connected) {
      toast({
        title: "LinkedIn not connected",
        description: "Please connect your LinkedIn account first.",
        variant: "destructive",
      })
      return false
    }

    setIsPosting(true)

    try {
      const response = await fetch("/api/linkedin/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, visibility }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Posted to LinkedIn!",
          description: "Your content has been successfully published.",
        })
        return true
      } else {
        toast({
          title: "Failed to post",
          description: data.error || "An error occurred while posting to LinkedIn.",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Failed to connect to LinkedIn. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsPosting(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return {
    status,
    isLoading,
    isPosting,
    connect,
    postToLinkedIn,
    refreshStatus: checkStatus,
  }
}
