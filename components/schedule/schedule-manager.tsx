"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Plus, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ScheduleCalendar } from "./schedule-calendar"
import { ScheduleForm } from "./schedule-form"
import { ScheduledPostCard } from "./scheduled-post-card"

interface ScheduledPost {
  id: string
  content: string
  scheduledTime: Date
  status: "scheduled" | "published" | "failed"
  contentType: "post" | "article" | "poll"
  hashtags: string[]
  visibility: "public" | "connections" | "followers"
}

export function ScheduleManager() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([])
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null)
  const [filter, setFilter] = useState<"all" | "scheduled" | "published" | "failed">("all")
  const [view, setView] = useState<"calendar" | "list">("calendar")

  useEffect(() => {
    // Load scheduled posts from localStorage
    const saved = localStorage.getItem("scheduledPosts")
    if (saved) {
      const posts = JSON.parse(saved).map((post: any) => ({
        ...post,
        scheduledTime: new Date(post.scheduledTime),
      }))
      setScheduledPosts(posts)
    } else {
      // Add some mock data
      const mockPosts: ScheduledPost[] = [
        {
          id: "1",
          content:
            "Excited to share my latest insights on AI in the workplace! 🚀 The future of work is here, and it's more collaborative than ever.",
          scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
          status: "scheduled",
          contentType: "post",
          hashtags: ["#AI", "#FutureOfWork", "#Innovation"],
          visibility: "public",
        },
        {
          id: "2",
          content:
            "Just published a comprehensive guide on LinkedIn growth strategies. Check it out and let me know your thoughts!",
          scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
          status: "scheduled",
          contentType: "article",
          hashtags: ["#LinkedIn", "#Growth", "#ContentStrategy"],
          visibility: "connections",
        },
        {
          id: "3",
          content:
            "What's your biggest challenge in content creation? A) Time management B) Ideas C) Consistency D) Engagement",
          scheduledTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          status: "published",
          contentType: "poll",
          hashtags: ["#ContentCreation", "#Poll"],
          visibility: "public",
        },
      ]
      setScheduledPosts(mockPosts)
      localStorage.setItem("scheduledPosts", JSON.stringify(mockPosts))
    }
  }, [])

  const saveScheduledPosts = (posts: ScheduledPost[]) => {
    setScheduledPosts(posts)
    localStorage.setItem("scheduledPosts", JSON.stringify(posts))
  }

  const handleSchedulePost = (postData: Omit<ScheduledPost, "id" | "status">) => {
    const newPost: ScheduledPost = {
      ...postData,
      id: Date.now().toString(),
      status: "scheduled",
    }
    const updatedPosts = [...scheduledPosts, newPost]
    saveScheduledPosts(updatedPosts)
    setShowScheduleForm(false)
  }

  const handleEditPost = (postData: Omit<ScheduledPost, "id" | "status">) => {
    if (!editingPost) return

    const updatedPosts = scheduledPosts.map((post) =>
      post.id === editingPost.id ? { ...postData, id: editingPost.id, status: editingPost.status } : post,
    )
    saveScheduledPosts(updatedPosts)
    setEditingPost(null)
  }

  const handleDeletePost = (postId: string) => {
    const updatedPosts = scheduledPosts.filter((post) => post.id !== postId)
    saveScheduledPosts(updatedPosts)
  }

  const filteredPosts = scheduledPosts.filter((post) => filter === "all" || post.status === filter)

  const upcomingPosts = scheduledPosts.filter(
    (post) => post.status === "scheduled" && post.scheduledTime > new Date(),
  ).length

  const publishedToday = scheduledPosts.filter(
    (post) => post.status === "published" && new Date(post.scheduledTime).toDateString() === new Date().toDateString(),
  ).length

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Upcoming</p>
                <p className="text-2xl font-bold text-slate-900">{upcomingPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Published Today</p>
                <p className="text-2xl font-bold text-slate-900">{publishedToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Grid className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Total Scheduled</p>
                <p className="text-2xl font-bold text-slate-900">{scheduledPosts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <Button onClick={() => setShowScheduleForm(true)} className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Post
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Scheduled Content</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Filter className="h-4 w-4 text-slate-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="all">All Posts</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="flex border rounded">
                <Button
                  variant={view === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("calendar")}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant={view === "list" ? "default" : "ghost"} size="sm" onClick={() => setView("list")}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={view} onValueChange={(v) => setView(v as any)}>
            <TabsContent value="calendar">
              <ScheduleCalendar posts={filteredPosts} onEditPost={setEditingPost} onDeletePost={handleDeletePost} />
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No scheduled posts found</p>
                    <Button onClick={() => setShowScheduleForm(true)} className="mt-4">
                      Schedule Your First Post
                    </Button>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <ScheduledPostCard
                      key={post.id}
                      post={post}
                      onEdit={() => setEditingPost(post)}
                      onDelete={() => handleDeletePost(post.id)}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Schedule Form Modal */}
      {(showScheduleForm || editingPost) && (
        <ScheduleForm
          post={editingPost}
          onSubmit={editingPost ? handleEditPost : handleSchedulePost}
          onCancel={() => {
            setShowScheduleForm(false)
            setEditingPost(null)
          }}
        />
      )}
    </div>
  )
}
