"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const profileViews = [
  { source: "Search", views: 1247, percentage: 43.8 },
  { source: "Posts", views: 856, percentage: 30.1 },
  { source: "Network", views: 512, percentage: 18.0 },
  { source: "Direct", views: 232, percentage: 8.1 },
]

const skillsEndorsements = [
  { skill: "Artificial Intelligence", endorsements: 45 },
  { skill: "Content Marketing", endorsements: 38 },
  { skill: "Social Media Strategy", endorsements: 32 },
  { skill: "Digital Marketing", endorsements: 28 },
  { skill: "Data Analysis", endorsements: 24 },
  { skill: "Project Management", endorsements: 21 },
]

const profileStrength = {
  score: 85,
  completeness: [
    { item: "Profile Photo", completed: true },
    { item: "Headline", completed: true },
    { item: "Summary", completed: true },
    { item: "Experience", completed: true },
    { item: "Education", completed: true },
    { item: "Skills", completed: true },
    { item: "Recommendations", completed: false },
    { item: "Accomplishments", completed: false },
  ],
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export function ProfileAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Views Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Profile View Sources</CardTitle>
            <CardDescription>Where your profile views are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={profileViews}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="views"
                >
                  {profileViews.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} views`, props.payload.source]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {profileViews.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm">{item.source}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {item.views} ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Strength */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Strength</CardTitle>
            <CardDescription>Complete your profile to attract more views</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-primary mb-2">{profileStrength.score}%</div>
              <Progress value={profileStrength.score} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">Profile Completeness</p>
            </div>
            <div className="space-y-3">
              {profileStrength.completeness.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.item}</span>
                  <Badge variant={item.completed ? "default" : "outline"}>
                    {item.completed ? "Complete" : "Missing"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills & Endorsements */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Endorsements</CardTitle>
          <CardDescription>Your most endorsed skills</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsEndorsements} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="skill" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="endorsements" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
