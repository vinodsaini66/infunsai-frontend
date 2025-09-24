"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Clock, Loader2, TrendingUp, Users, Calendar } from "lucide-react"

export function TimingOptimizer() {
  const [industry, setIndustry] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState<{
    bestTimes: string[]
    recommendations: string[]
  } | null>(null)

  const handleAnalyze = async () => {
    if (!industry.trim() || !targetAudience.trim()) return

    setIsAnalyzing(true)

    // Simulate API call
    setTimeout(() => {
      setRecommendations({
        bestTimes: ["Tuesday 9-10 AM", "Wednesday 2-3 PM", "Thursday 8-9 AM", "Friday 11 AM-12 PM"],
        recommendations: [
          "Post during business hours for maximum professional engagement",
          "Tuesday and Wednesday show highest engagement rates in your industry",
          "Avoid posting on Monday mornings and Friday afternoons",
          "Consider your audience's time zone when scheduling posts",
          "Engage with comments within the first hour for better reach",
        ],
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Optimal Posting Times</span>
          </CardTitle>
          <CardDescription>Get AI-powered recommendations for the best times to post your content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="e.g., Technology, Finance, Healthcare"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                placeholder="e.g., Software engineers, HR professionals"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !industry.trim() || !targetAudience.trim()}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Analyzing Optimal Times...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 w-4 h-4" />
                Analyze Best Posting Times
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {recommendations && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>Best Posting Times</span>
              </CardTitle>
              <CardDescription>
                Optimal times for {industry} professionals targeting {targetAudience}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {recommendations.bestTimes.map((time, index) => (
                  <Badge key={index} variant="secondary" className="justify-center py-2">
                    {time}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Strategic Recommendations</span>
              </CardTitle>
              <CardDescription>AI-powered insights to maximize your content's reach and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {!recommendations && !isAnalyzing && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">No timing analysis yet</h3>
              <p className="text-sm">
                Enter your industry and target audience to get personalized timing recommendations.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
