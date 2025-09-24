"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, TrendingUp, ArrowRight } from "lucide-react"
import type { UserGoal } from "./onboarding-flow"

interface GoalSelectionProps {
  selectedGoal: UserGoal
  onGoalSelect: (goal: UserGoal) => void
  onNext: () => void
}

export function GoalSelection({ selectedGoal, onGoalSelect, onNext }: GoalSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">What's your LinkedIn goal?</h2>
        <p className="text-muted-foreground">Choose your primary objective so we can personalize your experience</p>
      </div>

      <div className="grid gap-4">
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedGoal === "job-seeker" ? "ring-2 ring-primary bg-primary/5" : ""
          }`}
          onClick={() => onGoalSelect("job-seeker")}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Job Seeker</CardTitle>
                <CardDescription>Find your dream job and attract recruiters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Professional content that showcases expertise</li>
              <li>• Career insights and industry trends</li>
              <li>• Strategies to attract recruiters and hiring managers</li>
            </ul>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedGoal === "influencer" ? "ring-2 ring-primary bg-primary/5" : ""
          }`}
          onClick={() => onGoalSelect("influencer")}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-lg">Aspiring Influencer</CardTitle>
                <CardDescription>Build your personal brand and grow your audience</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Viral content ideas and engaging hooks</li>
              <li>• Audience growth and engagement strategies</li>
              <li>• Thought leadership and personal branding</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!selectedGoal} size="lg">
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
