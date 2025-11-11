import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const data = JSON.parse(formData.get("data") as string)

    console.log("Resume Data:", data)
    console.log("Uploaded File:", file?.name)

    // TODO: Save file to storage (e.g. S3 / local) and data to DB
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: "Failed to upload resume" }, { status: 500 })
  }
}
