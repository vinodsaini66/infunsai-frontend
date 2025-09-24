import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received signup data:", body,`${process.env.PYTHON_API_URL}/auth/signup`);

    // Call your Python FastAPI signup endpoint
    const res = await fetch(`${process.env.PYTHON_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.detail || "Signup failed" }, { status: res.status })
    }

    console.log("Signup successful, received data:", data);
    const cookieStore = await cookies()
    cookieStore.set("influnz_access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: data?.expires_in || 3600,
    })

    return NextResponse.json({ success: true, user: data }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to signup" }, { status: 500 })
  }
}
