import { NextResponse } from "next/server"
import { sendToGoogleSheets } from "@/lib/google-sheets"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { firstName, lastName, email, phone, stage, role, associates, challenge, organization, source } = body

    // Validate required fields
    if (!firstName || !email) {
      return NextResponse.json({ error: "First name and email are required" }, { status: 400 })
    }

    const payload = {
      formType: source === "partnership_readiness_diagnostic" ? "readiness-diagnostic" : "diagnostic",
      firstName,
      lastName: lastName || "",
      email,
      phone: phone || "",
      stageSelected: stage || "",
      role: role || "",
      associateCount: associates || "",
      biggestChallenge: challenge || "",
      organization: organization || "",
      submittedAt: new Date().toISOString(),
    }

    // Send to Google Sheets
    await sendToGoogleSheets(payload)

    // Send to GHL if configured
    const webhookUrl = process.env.GHL_WEBHOOK_URL
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error("[GHL] Webhook failed:", response.status, await response.text())
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[GHL] Error processing submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
