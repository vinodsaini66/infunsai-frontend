"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Repeat2, Eye, TrendingUp, Calendar } from "lucide-react"

const topPosts = [
  {
    id: 1,
    content: "Just launched a new AI-powered feature that automates content creation...",
    date: "2 days ago",
    likes: 94,
    comments: 42,
    shares: 28,
    views: 650,
    engagement: 7.2,
    type: "Achievement",
  },
  {
    id: 2,
    content: "5 key lessons I learned from building my first SaaS product...",
    date: "1 week ago",
    likes: 83,
    comments: 35,
    shares: 22,
    views: 580,
    engagement: 6.8,
    type: "Educational",
  },
  {
    id: 3,
    content: "The future of AI in content marketing: trends to watch in 2024...",
    date: "2 weeks ago",
    likes: 76,
    comments: 31,
    shares: 19,
    views: 540,
    engagement: 6.1,
    type: "Industry Insight",
  },
  {
    id: 4,
    content: "Behind the scenes: How we built our LinkedIn automation tool...",
    date: "3 weeks ago",
    likes: 71,
    comments: 28,
    shares: 18,
    views: 520,
    engagement: 5.9,
    type: "Behind the Scenes",
  },
  {
    id: 5,
    content: "Networking tips that helped me grow my LinkedIn following by 300%...",
    date: "1 month ago",
    likes: 67,
    comments: 24,
    shares: 15,
    views: 450,
    engagement: 5.4,
    type: "Tips & Advice",
  },
]

const contentTypes = [
  { type: "Educational", count: 12, avgEngagement: 6.2, color: "bg-blue-100 text-blue-800" },
  { type: "Achievement", count: 8, avgEngagement: 7.1, color: "bg-green-100 text-green-800" },
  { type: "Industry Insight", count: 6, avgEngagement: 5.8, color: "bg-purple-100 text-purple-800" },
  { type: "Tips & Advice", count: 10, avgEngagement: 5.5, color: "bg-orange-100 text-orange-800" },
  { type: "Behind the Scenes", count: 4, avgEngagement: 6.0, color: "bg-pink-100 text-pink-800" },
]

export function PostPerformance() {
  return (
    <div className="space-y-6">
      {/* Content Type Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Content Type Performance</CardTitle>
          <CardDescription>How different types of content perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {contentTypes.map((type, index) => (
              <div key={index} className="text-center">
                <Badge className={`${type.color} mb-2`}>{type.type}</Badge>
                <div className="text-2xl font-bold">{type.count}</div>
                <div className="text-sm text-muted-foreground">posts</div>
                <div className="text-sm font-medium text-primary mt-1">{type.avgEngagement}% avg engagement</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Your most engaging content from the last month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={post.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed mb-2">{post.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {post.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{post.engagement}%</span>
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Repeat2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
