import { NextResponse } from "next/server"
import { sendToGoogleSheets } from "@/lib/google-sheets"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const payload = {
      formType: "book-call",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || "",
      growthStage: data.stage,
      role: data.role,
      associateCount: data.associates,
      biggestChallenge: data.challenge,
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
    console.error("Book call submission error:", error)
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 })
  }
}
