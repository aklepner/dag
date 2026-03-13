import { NextResponse } from "next/server"
import { sendToGoogleSheets } from "@/lib/google-sheets"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, source, list } = body

    const payload = {
      formType: "subscribe",
      firstName,
      lastName,
      email,
      source: source || "dag-footer",
      list: list || "clinical-leadership-journal",
      submittedAt: new Date().toISOString(),
    }

    // Send to Google Sheets
    await sendToGoogleSheets(payload)

    // Send to GHL if configured
    const webhookUrl = process.env.GHL_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Newsletter subscribe error:", error)
    return NextResponse.json({ success: true })
  }
}
