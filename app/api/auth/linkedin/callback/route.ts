import { type NextRequest, NextResponse } from "next/server"
import { exchangeCodeForToken } from "@/lib/linkedin"
import { cookies } from "next/headers"
import { saveTokenToServer } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    // Handle OAuth errors
    if (error) {
      console.error("LinkedIn OAuth error:", error)
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/onboarding?error=oauth_error`)
    }

    if (!code || !state) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/onboarding?error=missing_parameters`)
    }
    console.log("Received code and state:", { code, state });


    // Verify state parameter
    const cookieStore = await cookies()
    const storedState = cookieStore.get("linkedin_oauth_state")?.value

    if (!storedState || storedState !== state) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/onboarding?error=invalid_state`)
    }

    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code, state)
    console.log("Token data received:", tokenData);

    try {
      await saveTokenToServer(tokenData?.access_token, tokenData?.linkedin_id, tokenData?.refresh_token, tokenData?.expires_in)
    } catch (error) {
      console.error("Failed to save token:", error)
    }
    
    // Store access token in secure cookie
    cookieStore.set("linkedin_access_token", tokenData?.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData?.expires_in,
    })

    // Clear state cookie
    cookieStore.delete("linkedin_oauth_state")

    // Redirect to onboarding with success
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/onboarding?linkedin=connected`)
  } catch (error) {
    console.error("LinkedIn OAuth callback error:", error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/onboarding?error=token_exchange_failed`)
  }
}
