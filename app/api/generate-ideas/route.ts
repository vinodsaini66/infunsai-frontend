import { type NextRequest, NextResponse } from "next/server"
import { generateContentIdeas } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { userType, industry, count } = await request.json()

    // Validate required fields
    if (!userType || !industry) {
      return NextResponse.json({ error: "User type and industry are required" }, { status: 400 })
    }

    // Generate content ideas using Gemini AI
    const ideas = await generateContentIdeas({ userType, industry, count })

    return NextResponse.json({ ideas })
  } catch (error) {
    console.error("Content ideas generation error:", error)

    return NextResponse.json({ error: "Failed to generate content ideas. Please try again." }, { status: 500 })
  }
}
