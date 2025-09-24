"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewMetrics } from "./overview-metrics"
import { EngagementChart } from "./engagement-chart"
import { FollowerGrowthChart } from "./follower-growth-chart"
import { PostPerformance } from "./post-performance"
import { AIInsights } from "./ai-insights"
import { ProfileAnalytics } from "./profile-analytics"
import { BarChart3, TrendingUp, Brain, User, Activity } from "lucide-react"

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <OverviewMetrics />

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="engagement" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Engagement</span>
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Growth</span>
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Posts</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>AI Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <EngagementChart />
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <FollowerGrowthChart />
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          <PostPerformance />
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <ProfileAnalytics />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <AIInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}
