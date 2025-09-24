"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Clock, Target, Lightbulb, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"

const insights = [
  {
    type: "opportunity",
    icon: TrendingUp,
    title: "Peak Engagement Window",
    description: "Your posts perform 40% better when published on Tuesday between 9-11 AM",
    action: "Schedule your next post for Tuesday morning",
    priority: "high",
    impact: "High Impact",
  },
  {
    type: "content",
    icon: Lightbulb,
    title: "Content Type Recommendation",
    description: "Educational posts generate 2x more engagement than other content types",
    action: "Create more tutorial and how-to content",
    priority: "medium",
    impact: "Medium Impact",
  },
  {
    type: "growth",
    icon: Target,
    title: "Follower Growth Opportunity",
    description: "Engaging with comments within 1 hour increases reach by 35%",
    action: "Set up notifications for post comments",
    priority: "high",
    impact: "High Impact",
  },
  {
    type: "optimization",
    icon: Clock,
    title: "Posting Frequency",
    description: "You're posting 2x per week. Optimal frequency for your audience is 3-4x per week",
    action: "Increase posting frequency gradually",
    priority: "medium",
    impact: "Medium Impact",
  },
]

const recommendations = [
  {
    category: "Content Strategy",
    suggestions: [
      "Share more behind-the-scenes content - it gets 25% more engagement",
      "Add industry insights to your posts - they perform 30% better",
      "Use 3-5 hashtags per post for optimal reach",
      "Include a clear call-to-action in every post",
    ],
  },
  {
    category: "Engagement Tactics",
    suggestions: [
      "Ask questions at the end of your posts to encourage comments",
      "Respond to comments within the first hour of posting",
      "Share others' content with your insights added",
      "Use LinkedIn polls to boost engagement",
    ],
  },
  {
    category: "Profile Optimization",
    suggestions: [
      "Add 2-3 more recommendations to boost credibility",
      "Update your headline to include relevant keywords",
      "Add recent accomplishments to your profile",
      "Optimize your summary with industry keywords",
    ],
  },
]

const nextSteps = [
  {
    task: "Schedule 3 educational posts for next week",
    priority: "High",
    estimated: "30 min",
    completed: false,
  },
  {
    task: "Engage with 10 posts in your industry daily",
    priority: "Medium",
    estimated: "15 min/day",
    completed: true,
  },
  {
    task: "Update profile with recent achievements",
    priority: "Medium",
    estimated: "20 min",
    completed: false,
  },
  {
    task: "Set up comment notifications",
    priority: "High",
    estimated: "5 min",
    completed: true,
  },
]

export function AIInsights() {
  return (
    <div className="space-y-6">
      {/* AI-Powered Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>AI-Powered Insights</span>
          </CardTitle>
          <CardDescription>Personalized recommendations based on your LinkedIn performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon
              return (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge variant={insight.priority === "high" ? "default" : "secondary"} className="mt-1">
                          {insight.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{insight.action}</span>
                    <Button variant="outline" size="sm">
                      Apply
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Strategies to improve your LinkedIn performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendations.map((category, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-3">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.suggestions.map((suggestion, suggestionIndex) => (
                      <li key={suggestionIndex} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
            <CardDescription>Action items to boost your LinkedIn growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                  <div className="mt-1">
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{step.task}</h4>
                      <Badge variant={step.priority === "High" ? "default" : "secondary"} className="text-xs">
                        {step.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Estimated time: {step.estimated}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">
              <Target className="w-4 h-4 mr-2" />
              Create Action Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
