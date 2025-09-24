"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const followerData = [
  { date: "Dec 1", followers: 1050, connections: 720 },
  { date: "Dec 8", followers: 1067, connections: 735 },
  { date: "Dec 15", followers: 1089, connections: 748 },
  { date: "Dec 22", followers: 1102, connections: 761 },
  { date: "Dec 29", followers: 1118, connections: 774 },
  { date: "Jan 5", followers: 1134, connections: 789 },
  { date: "Jan 12", followers: 1156, connections: 805 },
  { date: "Jan 19", followers: 1178, connections: 821 },
  { date: "Jan 26", followers: 1195, connections: 836 },
  { date: "Feb 2", followers: 1212, connections: 852 },
  { date: "Feb 9", followers: 1234, connections: 869 },
  { date: "Feb 16", followers: 1251, connections: 885 },
  { date: "Feb 23", followers: 1268, connections: 892 },
]

const growthMetrics = [
  { metric: "Follower Growth Rate", value: "8.2%", period: "Last 30 days" },
  { metric: "Connection Growth Rate", value: "15.3%", period: "Last 30 days" },
  { metric: "Average Daily Growth", value: "+3.2", period: "Followers per day" },
  { metric: "Best Growth Day", value: "Thursday", period: "Most new followers" },
]

export function FollowerGrowthChart() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Follower & Connection Growth</CardTitle>
          <CardDescription>Track your network expansion over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={followerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="followers"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
                name="Followers"
              />
              <Area
                type="monotone"
                dataKey="connections"
                stackId="2"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.6}
                name="Connections"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {growthMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
