"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useLinkedIn } from "@/hooks/use-linkedin"
import { Copy, Edit3, Save, Share, Calendar, ThumbsUp, MessageCircle, Repeat2, Loader2 } from "lucide-react"
import { ScheduleForm } from "@/components/schedule/schedule-form"
import type { GeneratedContent } from "@/lib/ai"

interface ContentPreviewProps {
  content: GeneratedContent | null
}

export function ContentPreview({ content }: ContentPreviewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState("")
  const [visibility, setVisibility] = useState<"PUBLIC" | "CONNECTIONS">("PUBLIC")
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const { toast } = useToast()
  const { status, postToLinkedIn, isPosting } = useLinkedIn()

  const handleEdit = () => {
    setEditedContent(content.content)
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Content saved",
      description: "Your edits have been saved successfully.",
    })
  }

  const handleCopy = () => {
    const fullContent = `${isEditing ? editedContent : content.content}\n\n${content.hashtags.map((tag) => `#${tag}`).join(" ")}`
    navigator.clipboard.writeText(fullContent)
    toast({
      title: "Copied to clipboard",
      description: "Content and hashtags copied successfully.",
    })
  }

  const handlePostToLinkedIn = async () => {
    const contentToPost = `${isEditing ? editedContent : content.content}\n\n${content.hashtags.map((tag) => `#${tag}`).join(" ")}`
    await postToLinkedIn(contentToPost, visibility)
  }

  const handleSchedulePost = (postData: any) => {
    const existingPosts = JSON.parse(localStorage.getItem("scheduledPosts") || "[]")
    const newPost = {
      ...postData,
      id: Date.now().toString(),
      status: "scheduled",
    }
    localStorage.setItem("scheduledPosts", JSON.stringify([...existingPosts, newPost]))

    setShowScheduleForm(false)
    toast({
      title: "Post scheduled successfully",
      description: `Your post has been scheduled for ${new Date(postData.scheduledTime).toLocaleString()}`,
    })
  }

  const handleOpenScheduleForm = () => {
    if (!content) return
    setShowScheduleForm(true)
  }

  const displayContent = isEditing ? editedContent : content.content

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>LinkedIn Post Preview</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              )}
            </div>
          </CardTitle>
          <CardDescription>This is how your post will appear on LinkedIn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {status.profile?.name
                    ? status.profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "JD"}
                </span>
              </div>
              <div>
                <div className="font-semibold text-sm">{status.profile?.name || "John Doe"}</div>
                <div className="text-xs text-muted-foreground">{status.profile?.headline || "Professional"} • 2h</div>
              </div>
            </div>

            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={6}
                className="mb-4 resize-none"
              />
            ) : (
              <div className="text-sm leading-relaxed mb-4 whitespace-pre-wrap">{displayContent}</div>
            )}

            <div className="flex flex-wrap gap-1 mb-4">
              {content.hashtags.map((hashtag, index) => (
                <span key={index} className="text-blue-600 text-sm">
                  #{hashtag}
                </span>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>24 likes</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>5 comments</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Repeat2 className="w-3 h-3" />
                  <span>2 reposts</span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {content.cta && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Call to Action</CardTitle>
            <CardDescription>Suggested call-to-action for your post</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm font-medium text-accent-foreground">{content.cta}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {content.suggestions && content.suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Suggestions</CardTitle>
            <CardDescription>Alternative approaches and improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {content.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {status.connected ? (
          <>
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Select value={visibility} onValueChange={(value: "PUBLIC" | "CONNECTIONS") => setVisibility(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="CONNECTIONS">Connections</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handlePostToLinkedIn} disabled={isPosting} className="flex-1" size="lg">
              {isPosting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Share className="w-4 h-4 mr-2" />
                  Post to LinkedIn
                </>
              )}
            </Button>
          </>
        ) : (
          <Button variant="outline" className="flex-1 bg-transparent" size="lg" disabled>
            <Share className="w-4 h-4 mr-2" />
            Connect LinkedIn to Post
          </Button>
        )}
        <Button
          variant="outline"
          className="flex-1 bg-transparent"
          size="lg"
          onClick={handleOpenScheduleForm}
          disabled={!content}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Post
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent" size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
      </div>

      {showScheduleForm && content && (
        <ScheduleForm
          onSubmit={handleSchedulePost}
          onCancel={() => setShowScheduleForm(false)}
          post={{
            content: `${displayContent}\n\n${content.hashtags.map((tag) => `#${tag}`).join(" ")}`,
            scheduledTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
            contentType: "post",
            hashtags: content.hashtags.map((tag) => `#${tag}`),
            visibility: visibility.toLowerCase() as "public" | "connections",
          }}
        />
      )}
    </div>
  )
}
