import { type NextRequest, NextResponse } from "next/server"
import { LinkedInAPI } from "@/lib/linkedin"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("linkedin_access_token")?.value

    if (!accessToken) {
      return NextResponse.json({ error: "LinkedIn not connected" }, { status: 401 })
    }

    const linkedIn = new LinkedInAPI(accessToken)
    const profile = await linkedIn.getProfile()

    return NextResponse.json(profile)
  } catch (error) {
    console.error("LinkedIn profile fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch LinkedIn profile" }, { status: 500 })
  }
}
