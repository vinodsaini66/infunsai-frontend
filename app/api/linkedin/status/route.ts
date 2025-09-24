import { type NextRequest, NextResponse } from "next/server"
import { LinkedInAPI } from "@/lib/linkedin"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("linkedin_access_token")?.value
    console.log({ accessToken });
    
    if (!accessToken) {
      return NextResponse.json({
        connected: false,
        profile: null,
      })
    }

    try {
      const linkedIn = new LinkedInAPI(accessToken)
      const profile = await linkedIn.getProfile()

      return NextResponse.json({
        connected: true,
        profile: {
          name: `${profile.firstName} ${profile.lastName}`,
          headline: profile.headline,
          id: profile.id,
        },
      })
    } catch (error) {
      // Token might be expired
      return NextResponse.json({
        connected: false,
        profile: null,
        error: "Token expired",
      })
    }
  } catch (error) {
    console.error("LinkedIn status check error:", error)
    return NextResponse.json({ error: "Failed to check LinkedIn status" }, { status: 500 })
  }
}
