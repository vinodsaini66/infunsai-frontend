import { google } from "@ai-sdk/google"
import { generateText } from "ai"

// Initialize Gemini model
const gemini = google("gemini-2.5-flash")

export interface ContentGenerationParams {
  userType: "job-seeker" | "aspiring-influencer"
  industry?: string
  topic?: string
  tone?: "professional" | "casual" | "engaging" | "thought-leadership"
  contentType?: "post" | "article" | "hook" | "question"
  targetAudience?: string
}

export interface GeneratedContent {
  content: string
  hashtags: string[]
  cta?: string
  suggestions?: string[]
}

export async function generateLinkedInContent(params: ContentGenerationParams): Promise<GeneratedContent> {
  const {
    userType,
    industry = "technology",
    topic,
    tone = "professional",
    contentType = "post",
    targetAudience,
  } = params

  // Build system prompt based on user type
  const systemPrompt =
    userType === "job-seeker"
      ? `You are an expert LinkedIn content creator specializing in helping job seekers build their professional presence. 
       Focus on showcasing expertise, sharing career insights, and attracting recruiters. 
       Content should be professional, authentic, and demonstrate value to potential employers.`
      : `You are an expert LinkedIn content creator specializing in helping aspiring influencers grow their audience. 
       Focus on creating engaging, shareable content that drives meaningful conversations and builds thought leadership. 
       Content should be compelling, authentic, and encourage engagement.`

  // Build user prompt
  const userPrompt = `Create a LinkedIn ${contentType} for a ${userType} in the ${industry} industry.
    ${topic ? `Topic: ${topic}` : ""}
    ${targetAudience ? `Target audience: ${targetAudience}` : ""}
    Tone: ${tone}
    
    Requirements:
    - Keep it concise and engaging (150-300 words for posts)
    - Include relevant hashtags (3-5 maximum)
    - ${userType === "job-seeker" ? "Focus on professional growth and expertise" : "Focus on audience engagement and thought leadership"}
    - Include a clear call-to-action
    - Make it authentic and personal
    
    Return the response in JSON format with:
    - content: the main post text
    - hashtags: array of relevant hashtags (without # symbol)
    - cta: call-to-action text
    - suggestions: array of 2-3 alternative angles or improvements`

  try {
    const { text } = await generateText({
      model: gemini,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
      // maxTokens: 1000,
    })

    console.log("Raw generated text:", text);
    let cleaned = text
      .replace(/^```json\s*/, "")  // remove starting ```json
      .replace(/```$/, "");        // remove ending ``
    // Parse the JSON response
    const parsed = JSON.parse(cleaned) as GeneratedContent
    return parsed
  } catch (error) {
    console.error("Error generating content:", error)
    throw new Error("Failed to generate content. Please try again.")
  }
}

export async function generateContentIdeas(params: {
  userType: "job-seeker" | "aspiring-influencer"
  industry: string
  count?: number
}): Promise<string[]> {
  const { userType, industry, count = 5 } = params

  const systemPrompt = `You are a LinkedIn content strategist. Generate engaging content ideas for ${userType}s in the ${industry} industry.`

  const userPrompt = `Generate ${count} specific, actionable LinkedIn post ideas for a ${userType} in ${industry}.
    Each idea should be:
    - Specific and actionable
    - Relevant to current industry trends
    - Engaging for the target audience
    - ${userType === "job-seeker" ? "Focused on professional development and career growth" : "Focused on thought leadership and audience building"}
    
    Return as a JSON array of strings.`

  try {
    const { text } = await generateText({
      model: gemini,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.8,
      // maxTokens: 500,
    })

    let cleaned = text
      .replace(/^```json\s*/, "")  // remove starting ```json
      .replace(/```$/, "");

    return JSON.parse(cleaned) as string[]
  } catch (error) {
    console.error("Error generating content ideas:", error)
    throw new Error("Failed to generate content ideas. Please try again.")
  }
}

export async function optimizePostTiming(params: {
  industry: string
  targetAudience: string
}): Promise<{
  bestTimes: string[]
  recommendations: string[]
}> {
  const { industry, targetAudience } = params

  const systemPrompt = `You are a LinkedIn analytics expert specializing in optimal posting times and audience engagement patterns.`

  const userPrompt = `Analyze the best posting times for ${industry} professionals targeting ${targetAudience} on LinkedIn.
    
    Provide recommendations for:
    - Best days of the week
    - Optimal times (in general time ranges)
    - Industry-specific considerations
    - Audience behavior patterns
    
    Return as JSON with:
    - bestTimes: array of recommended posting times (e.g., "Tuesday 9-10 AM")
    - recommendations: array of strategic advice for timing`

  try {
    const { text } = await generateText({
      model: gemini,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.3,
      // maxTokens: 400,
    })
    let cleaned = text
      .replace(/^```json\s*/, "")  // remove starting ```json
      .replace(/```$/, "");
    return JSON.parse(cleaned)
  } catch (error) {
    console.error("Error generating timing recommendations:", error)
    throw new Error("Failed to generate timing recommendations. Please try again.")
  }
}
