import { type NextRequest, NextResponse } from "next/server"
import { LinkedInAPI } from "@/lib/linkedin"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("linkedin_access_token")?.value

    if (!accessToken) {
      return NextResponse.json({ error: "LinkedIn not connected" }, { status: 401 })
    }

    const { content, visibility = "PUBLIC" } = await request.json()

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const linkedIn = new LinkedInAPI(accessToken)
    const postId = await linkedIn.createPost(content, visibility)

    return NextResponse.json({
      success: true,
      postId,
      message: "Post published successfully to LinkedIn",
    })
  } catch (error) {
    console.error("LinkedIn post creation error:", error)

    // Handle specific LinkedIn API errors
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        return NextResponse.json({ error: "LinkedIn authentication expired. Please reconnect." }, { status: 401 })
      }
      if (error.message.includes("403")) {
        return NextResponse.json({ error: "Insufficient permissions to post to LinkedIn." }, { status: 403 })
      }
    }

    return NextResponse.json({ error: "Failed to post to LinkedIn" }, { status: 500 })
  }
}
