"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Users, ArrowLeft, CheckCircle } from "lucide-react"
import type { UserGoal } from "./onboarding-flow"

interface ProfileAnalysisProps {
  userGoal: UserGoal
  onAnalysisComplete: (industry: string) => void
  onBack: () => void
}

export function ProfileAnalysis({ userGoal, onAnalysisComplete, onBack }: ProfileAnalysisProps) {
  const [analysisStep, setAnalysisStep] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<{
    industry: string
    expertise: string[]
    recommendations: string[]
  } | null>(null)

  const analysisSteps = [
    "Analyzing your LinkedIn profile...",
    "Identifying your expertise areas...",
    "Researching industry trends...",
    "Generating content recommendations...",
    "Finalizing your personalized strategy...",
  ]

  useEffect(() => {
    if (isAnalyzing && analysisStep < analysisSteps.length - 1) {
      const timer = setTimeout(() => {
        setAnalysisStep((prev) => prev + 1)
      }, 1500)
      return () => clearTimeout(timer)
    } else if (isAnalyzing && analysisStep === analysisSteps.length - 1) {
      // Complete analysis
      setTimeout(() => {
        setAnalysisComplete(true)
        setIsAnalyzing(false)
        setAnalysisResults({
          industry: "Technology",
          expertise: ["Software Development", "AI/ML", "Product Strategy"],
          recommendations: [
            "Share technical insights and tutorials",
            "Comment on industry trends and innovations",
            "Post about your project experiences",
            "Engage with tech community discussions",
          ],
        })
      }, 2000)
    }
  }, [isAnalyzing, analysisStep, analysisSteps.length])

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisStep(0)
  }

  const handleComplete = () => {
    if (analysisResults) {
      onAnalysisComplete(analysisResults.industry)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">AI Profile Analysis</h2>
        <p className="text-muted-foreground">
          Our AI will analyze your LinkedIn profile to create personalized content strategies
        </p>
      </div>

      {!isAnalyzing && !analysisComplete && (
        <Card className="border-2 border-dashed border-border">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Ready to Analyze Your Profile</CardTitle>
            <CardDescription>
              We'll examine your profile, experience, and industry to create your personalized content strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm">Profile Analysis</h3>
                <p className="text-xs text-muted-foreground">Extract expertise areas</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-sm">Industry Trends</h3>
                <p className="text-xs text-muted-foreground">Research current topics</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-sm">AI Recommendations</h3>
                <p className="text-xs text-muted-foreground">Personalized strategy</p>
              </div>
            </div>

            <Button onClick={startAnalysis} className="w-full" size="lg">
              Start AI Analysis
              <Brain className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Analyzing Your Profile</h3>
              <p className="text-sm text-muted-foreground">{analysisSteps[analysisStep]}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analysis Progress</span>
                <span>{Math.round(((analysisStep + 1) / analysisSteps.length) * 100)}%</span>
              </div>
              <Progress value={((analysisStep + 1) / analysisSteps.length) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {analysisComplete && analysisResults && (
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-xl text-green-700">Analysis Complete!</CardTitle>
            <CardDescription>Here's what we discovered about your LinkedIn profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Industry Focus</h3>
              <Badge variant="secondary" className="text-sm">
                {analysisResults.industry}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Your Expertise Areas</h3>
              <div className="flex flex-wrap gap-2">
                {analysisResults.expertise.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Personalized Recommendations for {userGoal === "job-seeker" ? "Job Seekers" : "Aspiring Influencers"}
              </h3>
              <ul className="space-y-2">
                {analysisResults.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={handleComplete} className="w-full" size="lg">
              Complete Setup
              <CheckCircle className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {!analysisComplete && (
        <div className="flex justify-start">
          <Button variant="outline" onClick={onBack} disabled={isAnalyzing}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
        </div>
      )}
    </div>
  )
}
