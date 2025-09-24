import { type NextRequest, NextResponse } from "next/server"
import { optimizePostTiming } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { industry, targetAudience } = await request.json()

    // Validate required fields
    if (!industry || !targetAudience) {
      return NextResponse.json({ error: "Industry and target audience are required" }, { status: 400 })
    }

    // Generate timing recommendations using Gemini AI
    const recommendations = await optimizePostTiming({ industry, targetAudience })

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Timing optimization error:", error)

    return NextResponse.json({ error: "Failed to generate timing recommendations. Please try again." }, { status: 500 })
  }
}
