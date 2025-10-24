import { cookies } from "next/headers"

export async function saveTokenToServer(
    access_token: string,
    linkedin_id: string='',
    refresh_token: any = undefined,
    expires_in: number = 0
): Promise<{
    access_token: string
    linkedin_id: string
    refresh_token?: string
}> {
    const cookieStore = cookies()
    const auth_token = cookieStore.get("influnz_access_token")?.value
   
    const body = {
        linkedin_id: linkedin_id,
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in
    }

    const response = await fetch(`${process.env.PYTHON_API_URL}/linkedin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth_token}`
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Token exchange failed: ${errorData.error_description || response.statusText}`)
    }

    return response.json()
}