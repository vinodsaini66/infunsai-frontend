import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
    try {
        const cookieStore = cookies()
        const access_token = cookieStore.get("influnz_access_token")?.value

        if (!access_token) {
            return NextResponse.json({ user: null, error: "No access token found" }, { status: 401 })
        }

        // Fetch user profile from your Python FastAPI backend
        const res = await fetch(`${process.env.PYTHON_API_URL}/users/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        })

        const data = await res.json()

        if (!res.ok) {
            console.error("FastAPI /users/me error:", JSON.stringify(data))
            return NextResponse.json({ user: null, error: data.detail || "Failed to fetch user" }, { status: res.status })
        }

        // Return user info to frontend context
        return NextResponse.json({ user: data }, { status: 200 })
    } catch (error) {
        console.error("Error in /api/auth/me:", error)
        return NextResponse.json({ user: null, error: "Internal server error" }, { status: 500 })
    }
}
