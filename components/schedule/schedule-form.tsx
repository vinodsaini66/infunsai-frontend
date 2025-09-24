"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, Globe, Users, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

interface ScheduleFormProps {
  post?: ScheduledPost | null
  onSubmit: (postData: Omit<ScheduledPost, "id" | "status">) => void
  onCancel: () => void
}

export function ScheduleForm({ post, onSubmit, onCancel }: ScheduleFormProps) {
  const [content, setContent] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [contentType, setContentType] = useState<"post" | "article" | "poll">("post")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [hashtagInput, setHashtagInput] = useState("")
  const [visibility, setVisibility] = useState<"public" | "connections" | "followers">("public")

  useEffect(() => {
    if (post) {
      setContent(post.content)
      setScheduledTime(post.scheduledTime.toISOString().slice(0, 16))
      setContentType(post.contentType)
      setHashtags(post.hashtags)
      setVisibility(post.visibility)
    } else {
      // Set default time to 1 hour from now
      const defaultTime = new Date()
      defaultTime.setHours(defaultTime.getHours() + 1)
      setScheduledTime(defaultTime.toISOString().slice(0, 16))
    }
  }, [post])

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      const newTag = hashtagInput.trim().startsWith("#") ? hashtagInput.trim() : `#${hashtagInput.trim()}`
      setHashtags([...hashtags, newTag])
      setHashtagInput("")
    }
  }

  const handleRemoveHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() || !scheduledTime) return

    onSubmit({
      content: content.trim(),
      scheduledTime: new Date(scheduledTime),
      contentType,
      hashtags,
      visibility,
    })
  }

  const getOptimalTimes = () => {
    const now = new Date()
    const times = []

    // Add some optimal posting times
    const optimalHours = [9, 12, 15, 17, 19] // 9 AM, 12 PM, 3 PM, 5 PM, 7 PM

    for (let i = 0; i < 3; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() + i)

      optimalHours.forEach((hour) => {
        const optimalTime = new Date(date)
        optimalTime.setHours(hour, 0, 0, 0)

        if (optimalTime > now) {
          times.push(optimalTime)
        }
      })
    }

    return times.slice(0, 6)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{post ? "Edit Scheduled Post" : "Schedule New Post"}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Post Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What would you like to share?"
                className="min-h-[120px]"
                required
              />
              <div className="text-sm text-slate-500">{content.length}/3000 characters</div>
            </div>

            {/* Content Type */}
            <div className="space-y-2">
              <Label>Content Type</Label>
              <div className="flex space-x-2">
                {(["post", "article", "poll"] as const).map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={contentType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContentType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Hashtags */}
            <div className="space-y-2">
              <Label>Hashtags</Label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  placeholder="Add hashtag"
                  className="flex-1 px-3 py-2 border rounded-md"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddHashtag())}
                />
                <Button type="button" onClick={handleAddHashtag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveHashtag(tag)}
                  >
                    {tag} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <Label>Visibility</Label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={visibility === "public" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVisibility("public")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Public
                </Button>
                <Button
                  type="button"
                  variant={visibility === "connections" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVisibility("connections")}
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Connections
                </Button>
                <Button
                  type="button"
                  variant={visibility === "followers" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVisibility("followers")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Followers
                </Button>
              </div>
            </div>

            {/* Scheduled Time */}
            <div className="space-y-2">
              <Label htmlFor="scheduledTime">Scheduled Time</Label>
              <input
                type="datetime-local"
                id="scheduledTime"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Optimal Times Suggestions */}
            <div className="space-y-2">
              <Label>Suggested Optimal Times</Label>
              <div className="grid grid-cols-2 gap-2">
                {getOptimalTimes().map((time, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setScheduledTime(time.toISOString().slice(0, 16))}
                    className="justify-start"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {time.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {time.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <Calendar className="h-4 w-4 mr-2" />
                {post ? "Update Schedule" : "Schedule Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
