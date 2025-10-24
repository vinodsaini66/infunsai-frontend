import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log("Received post data:", body, `${process.env.PYTHON_API_URL}/post`);

        const cookieStore =  cookies()
        const access_token = cookieStore.get("influnz_access_token")?.value
        // Call your Python FastAPI signup endpoint
        const res = await fetch(`${process.env.PYTHON_API_URL}/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(body),
        })

        const data = await res.json()

        if (!res.ok) {
             console.error("Post creation error:", JSON.stringify(data))
            return NextResponse.json({ error: data.detail || "Post creation failed" }, { status: res.status })
        }

        console.log("Post creation successful, received data:", data);

        return NextResponse.json({ success: true, data: data }, { status: 201 })
    } catch (error) {
        console.error("Post creation error:", JSON.stringify(error))
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
    }
}
