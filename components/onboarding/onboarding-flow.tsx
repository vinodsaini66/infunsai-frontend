"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { GoalSelection } from "./goal-selection"
import { LinkedInConnection } from "./linkedin-connection"
import { ProfileAnalysis } from "./profile-analysis"
import { OnboardingComplete } from "./onboarding-complete"
import { useToast } from "../ui/use-toast"

export type UserGoal = "job-seeker" | "influencer" | null
export type OnboardingStep = "goals" | "linkedin" | "analysis" | "complete"

export interface OnboardingData {
  goal: UserGoal
  industry: string
  linkedinConnected: boolean
  profileAnalyzed: boolean
}

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("goals")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    goal: null,
    industry: "",
    linkedinConnected: false,
    profileAnalyzed: false,
  })

  const steps = [
    { id: "goals", title: "Set Goals", description: "Choose your LinkedIn objective" },
    { id: "linkedin", title: "Connect LinkedIn", description: "Link your LinkedIn account" },
    { id: "analysis", title: "Profile Analysis", description: "AI analyzes your profile" },
    { id: "complete", title: "Complete", description: "You're all set!" },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...data }))
  }

  const updateAccountType = async (values: any) => {
    setLoading(true)
   
    try {
      const res = await fetch("/api/user/account-type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      toast({
        title: "Goal updated successfully!",
        description: "Your goal has been updated.",
      })


    } catch (error: any) {
      toast({
        title: "Failed to create account",
        description: error.message || "Something went wrong",
      })
    } finally {
      setLoading(false)
    }
  }

  const nextStep =async () => {
    const stepOrder: OnboardingStep[] = ["goals", "linkedin", "analysis", "complete"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex === 0) {
      // Handle the case for the first step
      await updateAccountType({ account_type: onboardingData.goal })
    }

    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const stepOrder: OnboardingStep[] = ["goals", "linkedin", "analysis", "complete"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">LinkedinAI</span>
        </Link>
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to LinkedinAI</h1>
        <p className="text-muted-foreground">Let's set up your account to maximize your LinkedIn growth</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`text-xs text-center ${index <= currentStepIndex ? "text-primary" : "text-muted-foreground"}`}
            >
              <div className="font-medium">{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === "goals" && (
            <GoalSelection
              selectedGoal={onboardingData.goal}
              onGoalSelect={(goal) => updateOnboardingData({ goal })}
              onNext={nextStep}
            />
          )}

          {currentStep === "linkedin" && (
            <LinkedInConnection
              isConnected={onboardingData.linkedinConnected}
              onConnect={(connected) => updateOnboardingData({ linkedinConnected: connected })}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === "analysis" && (
            <ProfileAnalysis
              userGoal={onboardingData.goal}
              onAnalysisComplete={(industry) => {
                updateOnboardingData({ profileAnalyzed: true, industry })
                nextStep()
              }}
              onBack={prevStep}
            />
          )}

          {currentStep === "complete" && (
            <OnboardingComplete userGoal={onboardingData.goal} industry={onboardingData.industry} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
