import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
    const cookieStore = await cookies()
    cookieStore.delete("influnz_access_token")
    cookieStore.delete("influnz_refresh_token")
    cookieStore.delete("linkedin_access_token")

    return NextResponse.json({ success: true })
}
