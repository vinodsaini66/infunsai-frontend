"use client"

import { Calendar, Clock, Edit, Trash2, Globe, Users, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ScheduledPost {
  id: string
  content: string
  scheduledTime: Date
  status: "scheduled" | "published" | "failed"
  contentType: "post" | "article" | "poll"
  hashtags: string[]
  visibility: "public" | "connections" | "followers"
}

interface ScheduledPostCardProps {
  post: ScheduledPost
  onEdit: () => void
  onDelete: () => void
}

export function ScheduledPostCard({ post, onEdit, onDelete }: ScheduledPostCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "published":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "public":
        return <Globe className="h-4 w-4" />
      case "connections":
        return <UserCheck className="h-4 w-4" />
      case "followers":
        return <Users className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const isOverdue = post.status === "scheduled" && post.scheduledTime < new Date()

  return (
    <Card className={`${isOverdue ? "border-orange-200 bg-orange-50" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
              <Badge variant="outline">{post.contentType}</Badge>
              <div className="flex items-center text-sm text-slate-500">
                {getVisibilityIcon(post.visibility)}
                <span className="ml-1 capitalize">{post.visibility}</span>
              </div>
              {isOverdue && <Badge variant="destructive">Overdue</Badge>}
            </div>

            {/* Content Preview */}
            <div className="space-y-2">
              <p className="text-slate-700 line-clamp-3">{post.content}</p>

              {post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.hashtags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Timing */}
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.scheduledTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.scheduledTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 ml-4">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
