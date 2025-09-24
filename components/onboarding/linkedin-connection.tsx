"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Linkedin, Shield, CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import { useLinkedIn } from "@/hooks/use-linkedin"
import { useSearchParams } from "next/navigation"

interface LinkedInConnectionProps {
  isConnected: boolean
  onConnect: (connected: boolean) => void
  onNext: () => void
  onBack: () => void
}

export function LinkedInConnection({ isConnected, onConnect, onNext, onBack }: LinkedInConnectionProps) {
  const { status, isLoading, connect } = useLinkedIn()
  const [isConnecting, setIsConnecting] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for OAuth callback results
    const linkedinParam = searchParams.get("linkedin")
    const errorParam = searchParams.get("error")

    if (linkedinParam === "connected") {
      onConnect(true)
      setIsConnecting(false)
    } else if (errorParam) {
      setIsConnecting(false)
      // Handle error cases
    }
  }, [searchParams, onConnect])

  useEffect(() => {
    // Update connection status based on LinkedIn hook
    if (status.connected && !isConnected) {
      onConnect(true)
    }
  }, [status.connected, isConnected, onConnect])

  const handleConnect = () => {
    setIsConnecting(true)
    connect()
  }

  const connected = isConnected || status.connected

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Connect Your LinkedIn Account</h2>
        <p className="text-muted-foreground">
          We'll analyze your profile to create personalized content recommendations
        </p>
      </div>

      <Card className="border-2 border-dashed border-border">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Linkedin className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-xl">LinkedIn Integration</CardTitle>
          <CardDescription>
            Connect securely with OAuth 2.0 to access your profile data and post content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!connected ? (
            <>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure OAuth 2.0 authentication</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Read profile data for personalization</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Post content on your behalf</span>
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your data is encrypted and secure. We never store your LinkedIn credentials.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleConnect}
                disabled={isConnecting || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {isConnecting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect LinkedIn Account
                    <Linkedin className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700">Successfully Connected!</h3>
                <p className="text-sm text-muted-foreground">
                  {status.profile?.name && `Connected as ${status.profile.name}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your LinkedIn account is now connected and ready for AI analysis.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button onClick={onNext} disabled={false} size="lg">
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
