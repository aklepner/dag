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

    // Send to GHL API
    const ghlApiToken = process.env.GHL_API_TOKEN
    const ghlLocationId = process.env.GHL_LOCATION_ID
    if (ghlApiToken && ghlLocationId) {
      const ghlPayload = {
        firstName: data.firstName,
        lastName: data.lastName || "",
        email: data.email,
        phone: data.phone || "",
        locationId: ghlLocationId,
        source: "fit-assessment-call",
        tags: ["fit-assessment-call", "book-call"],
        customFields: [
          { key: "growth_stage", value: data.stage || "" },
          { key: "role", value: data.role || "" },
          { key: "associate_count", value: data.associates || "" },
          { key: "biggest_challenge", value: data.challenge || "" },
        ].filter(f => f.value),
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
    console.error("Book call submission error:", error)
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 })
  }
}
