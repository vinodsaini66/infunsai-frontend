import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log("Received account type data:", body, `${process.env.PYTHON_API_URL}/users/account_type`);

        const cookieStore =  cookies()
        const access_token = cookieStore.get("influnz_access_token")?.value
        // Call your Python FastAPI signup endpoint
        const res = await fetch(`${process.env.PYTHON_API_URL}/users/account_type`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(body),
        })

        const data = await res.json()

        if (!res.ok) {
             console.error("Account type error:", JSON.stringify(data))
            return NextResponse.json({ error: data.detail || "Account type failed" }, { status: res.status })
        }

        console.log("Account type successful, received data:", data);

        return NextResponse.json({ success: true, user: data }, { status: 201 })
    } catch (error) {
        console.error("Account type error:", JSON.stringify(error))
        return NextResponse.json({ error: "Failed to account type" }, { status: 500 })
    }
}
