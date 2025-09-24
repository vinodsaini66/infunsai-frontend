"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const engagementData = [
  { date: "Jan 1", likes: 45, comments: 12, shares: 8, views: 320 },
  { date: "Jan 8", likes: 52, comments: 18, shares: 12, views: 380 },
  { date: "Jan 15", likes: 38, comments: 9, shares: 6, views: 290 },
  { date: "Jan 22", likes: 67, comments: 24, shares: 15, views: 450 },
  { date: "Jan 29", likes: 71, comments: 28, shares: 18, views: 520 },
  { date: "Feb 5", likes: 59, comments: 21, shares: 14, views: 410 },
  { date: "Feb 12", likes: 83, comments: 35, shares: 22, views: 580 },
  { date: "Feb 19", likes: 76, comments: 31, shares: 19, views: 540 },
  { date: "Feb 26", likes: 94, comments: 42, shares: 28, views: 650 },
  { date: "Mar 5", likes: 88, comments: 38, shares: 25, views: 610 },
]

const weeklyEngagement = [
  { day: "Mon", engagement: 4.2 },
  { day: "Tue", engagement: 6.8 },
  { day: "Wed", engagement: 5.9 },
  { day: "Thu", engagement: 7.2 },
  { day: "Fri", engagement: 4.1 },
  { day: "Sat", engagement: 2.8 },
  { day: "Sun", engagement: 3.5 },
]

export function EngagementChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
          <CardDescription>Likes, comments, and shares on your posts</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="likes" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Likes" />
              <Line type="monotone" dataKey="comments" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Comments" />
              <Line type="monotone" dataKey="shares" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Shares" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Engagement Rate</CardTitle>
          <CardDescription>Average engagement rate by day of the week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyEngagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, "Engagement Rate"]} />
              <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
