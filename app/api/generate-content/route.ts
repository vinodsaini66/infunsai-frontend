import { type NextRequest, NextResponse } from "next/server"
import { generateLinkedInContent, type ContentGenerationParams } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContentGenerationParams
    console.log("Received request body:", body);
    // Validate required fields
    if (!body.userType) {
      return NextResponse.json({ error: "User type is required" }, { status: 400 })
    }

    // Generate content using Gemini AI
    const generatedContent = await generateLinkedInContent(body)
    console.log("Generated content:", generatedContent);
    

    return NextResponse.json(generatedContent)
  } catch (error) {
    console.error("Content generation error:", error)

    return NextResponse.json({ error: "Failed to generate content. Please try again." }, { status: 500 })
  }
}
