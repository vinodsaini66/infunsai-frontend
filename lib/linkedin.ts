// LinkedIn API integration utilities
export interface LinkedInProfile {
  id: string
  firstName: string
  lastName: string
  headline?: string
  summary?: string
  industry?: string
  profilePicture?: string
}

export interface LinkedInPost {
  author: string
  lifecycleState: "PUBLISHED"
  specificContent: {
    "com.linkedin.ugc.ShareContent": {
      shareCommentary: {
        text: string
      }
      shareMediaCategory: "NONE" | "ARTICLE" | "IMAGE"
    }
  }
  visibility: {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" | "CONNECTIONS"
  }
}

export class LinkedInAPI {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async getProfile(): Promise<LinkedInProfile> {
    const response = await fetch("https://api.linkedin.com/v2/people/~", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      id: data.id,
      firstName: data.firstName?.localized?.en_US || "",
      lastName: data.lastName?.localized?.en_US || "",
      headline: data.headline?.localized?.en_US,
      summary: data.summary?.localized?.en_US,
      industry: data.industry,
      profilePicture: data.profilePicture?.displayImage,
    }
  }

  async createPost(content: string, visibility: "PUBLIC" | "CONNECTIONS" = "PUBLIC"): Promise<string> {
    // First, get the user's profile ID
    const profile = await this.getProfile()

    const postData: LinkedInPost = {
      author: `urn:li:person:${profile.id}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": visibility,
      },
    }

    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Failed to create LinkedIn post: ${errorData.message || response.statusText}`)
    }

    const result = await response.json()
    return result.id
  }

  async getPostAnalytics(postId: string) {
    // Note: This requires additional permissions and may not be available for all applications
    const response = await fetch(`https://api.linkedin.com/v2/socialActions/${postId}/statistics`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`)
    }

    return response.json()
  }
}

// OAuth configuration
export const linkedInConfig = {
  clientId: process.env.LINKEDIN_CLIENT_ID!,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  redirectUri: process.env.LINKEDIN_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/auth/linkedin/callback`,
  scope: "openid profile email w_member_social r_basicprofile",
  authUrl: "https://www.linkedin.com/oauth/v2/authorization",
  tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
}

export function generateLinkedInAuthUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: linkedInConfig.clientId,
    redirect_uri: linkedInConfig.redirectUri,
    state,
    scope: linkedInConfig.scope,
  })
  const url = `${linkedInConfig.authUrl}?${params.toString()}`
  console.log({ url });

  return url
}

export async function exchangeCodeForToken(
  code: string,
  state: string,
): Promise<{
  access_token: string
  expires_in: number
  refresh_token?: string
}> {
  const response = await fetch(linkedInConfig.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: linkedInConfig.clientId,
      client_secret: linkedInConfig.clientSecret,
      redirect_uri: linkedInConfig.redirectUri,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Token exchange failed: ${errorData.error_description || response.statusText}`)
  }

  return response.json()
}
