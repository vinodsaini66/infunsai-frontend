"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ScheduledPost {
  id: string
  content: string
  schedule_at: Date
  status: "scheduled" | "published" | "failed"
  content_type: "post" | "article" | "poll"
  hashtags: string[]
  visibility: "public" | "connections" | "followers"
}

interface ScheduleCalendarProps {
  posts: ScheduledPost[]
  onEditPost: (post: ScheduledPost) => void
  onDeletePost: (postId: string) => void
}

export function ScheduleCalendar({ posts, onEditPost, onDeletePost }: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getPostsForDate = (date: Date) => {
    return posts.filter((post) => {
      const postDate = new Date(post.schedule_at)
      return postDate.toDateString() === date.toDateString()
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  const days = []

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24"></div>)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayPosts = getPostsForDate(date)
    const isToday = date.toDateString() === new Date().toDateString()

    days.push(
      <Card key={day} className={`h-24 ${isToday ? "ring-2 ring-emerald-500" : ""}`}>
        <CardContent className="p-2 h-full">
          <div className="flex flex-col h-full">
            <div className={`text-sm font-medium ${isToday ? "text-emerald-600" : "text-slate-600"}`}>{day}</div>
            <div className="flex-1 overflow-hidden">
              {dayPosts.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  className="group relative mb-1 p-1 bg-emerald-100 rounded text-xs cursor-pointer hover:bg-emerald-200"
                  onClick={() => onEditPost(post)}
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        post.status === "scheduled"
                          ? "default"
                          : post.status === "published"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs px-1 py-0"
                    >
                      {post.content_type}
                    </Badge>
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          onEditPost(post)
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeletePost(post.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="truncate text-slate-600">
                    {post.schedule_at.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
              {dayPosts.length > 2 && <div className="text-xs text-slate-500">+{dayPosts.length - 2} more</div>}
            </div>
          </div>
        </CardContent>
      </Card>,
    )
  }

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{monthName}</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days}
      </div>
    </div>
  )
}
