"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye, Users, Heart, Target } from "lucide-react"

export function OverviewMetrics() {
  const metrics = [
    {
      title: "Profile Views",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      description: "Last 30 days",
    },
    {
      title: "Followers",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      description: "Total followers",
    },
    {
      title: "Post Engagement",
      value: "4.8%",
      change: "+2.1%",
      trend: "up",
      icon: Heart,
      description: "Average engagement rate",
    },
    {
      title: "Connections",
      value: "892",
      change: "+15.3%",
      trend: "up",
      icon: Target,
      description: "New connections",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon
        const isPositive = metric.trend === "up"

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center space-x-1">
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{metric.change}</span>
                </Badge>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
