import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
    try {

        const cookieStore = cookies()
        const access_token = cookieStore.get("influnz_access_token")?.value
        // Call your Python FastAPI signup endpoint
        if (!access_token) {
            return NextResponse.json({ error: "No access token found" }, { status: 401 })
        }

        const res = await fetch(`${process.env.PYTHON_API_URL}/post/scheduled`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
        })

        const data = await res.json()
        console.log("Fetched scheduled posts data:", data);
        

        if (!res.ok) {
            console.error("Scheduled posts error:", JSON.stringify(data))
            return NextResponse.json({ error: data.detail || "Scheduled posts failed" }, { status: res.status })
        }

        console.log("Scheduled posts successful, received data:", data);

        return NextResponse.json({ success: true, data: data }, { status: 200 })
    } catch (error) {
        console.error("Scheduled posts error:", JSON.stringify(error))
        return NextResponse.json({ error: "Failed to fetch scheduled posts" }, { status: 500 })
    }
}
