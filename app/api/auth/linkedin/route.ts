import { type NextRequest, NextResponse } from "next/server"
import { generateLinkedInAuthUrl } from "@/lib/linkedin"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    // Generate a random state parameter for CSRF protection
    const state = crypto.randomUUID()

    // Store state in cookie for verification
    const cookieStore = await cookies()
    cookieStore.set("linkedin_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
    })

    // Generate LinkedIn authorization URL
    const authUrl = generateLinkedInAuthUrl(state)

    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error("LinkedIn OAuth initiation error:", error)
    return NextResponse.json({ error: "Failed to initiate LinkedIn OAuth" }, { status: 500 })
  }
}
