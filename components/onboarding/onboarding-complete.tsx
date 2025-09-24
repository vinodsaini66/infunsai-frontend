"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, ArrowRight, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { UserGoal } from "./onboarding-flow"

interface OnboardingCompleteProps {
  userGoal: UserGoal
  industry: string
}

export function OnboardingComplete({ userGoal, industry }: OnboardingCompleteProps) {
  const goalConfig = {
    "job-seeker": {
      icon: Target,
      title: "Job Seeker",
      description: "Ready to attract recruiters and showcase your expertise",
      nextSteps: [
        "Generate your first professional post",
        "Set up content scheduling",
        "Track your profile views and engagement",
      ],
    },
    "aspiring-influencer": {
      icon: TrendingUp,
      title: "Aspiring Influencer",
      description: "Ready to build your personal brand and grow your audience",
      nextSteps: ["Create viral content ideas", "Schedule engaging posts", "Monitor your follower growth"],
    },
  }

  const config = userGoal ? goalConfig[userGoal] : null
  const IconComponent = config?.icon || Sparkles

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to LinkedinAI!</h2>
          <p className="text-muted-foreground">
            Your account is set up and ready to supercharge your LinkedIn presence
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <CardTitle className="text-lg">{config?.title}</CardTitle>
              <CardDescription>{config?.description}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="mx-auto">
            {industry} Industry
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3">Your Next Steps:</h3>
            <ul className="space-y-2 text-left">
              {config?.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button asChild size="lg" className="w-full">
          <Link href="/dashboard">
            Go to Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
          <Link href="/generate">
            Generate Your First Post
            <Sparkles className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        Need help? Check out our{" "}
        <Link href="/help" className="text-primary hover:underline">
          getting started guide
        </Link>
      </div>
    </div>
  )
}
