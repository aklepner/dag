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

    // Send to GHL API
    const ghlApiToken = process.env.GHL_API_TOKEN
    const ghlLocationId = process.env.GHL_LOCATION_ID
    if (ghlApiToken && ghlLocationId) {
      const ghlPayload = {
        firstName,
        lastName: lastName || "",
        email,
        locationId: ghlLocationId,
        source: source || "dag-footer",
        tags: [list || "clinical-leadership-journal", "newsletter-signup"],
      }
      await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ghlApiToken}`,
          "Version": "2021-07-28",
        },
        body: JSON.stringify(ghlPayload),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Newsletter subscribe error:", error)
    return NextResponse.json({ success: true })
  }
}
