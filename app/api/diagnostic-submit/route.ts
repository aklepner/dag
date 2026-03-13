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

    // Send to GHL API
    const ghlApiToken = process.env.GHL_API_TOKEN
    const ghlLocationId = process.env.GHL_LOCATION_ID
    if (ghlApiToken && ghlLocationId) {
      const ghlPayload = {
        firstName,
        lastName: lastName || "",
        email,
        phone: phone || "",
        locationId: ghlLocationId,
        source: source || "growth-toolkit",
        tags: [source === "partnership_readiness_diagnostic" ? "readiness-diagnostic" : "growth-toolkit"],
        customFields: [
          { key: "growth_stage", value: stage || "" },
          { key: "role", value: role || "" },
          { key: "associate_count", value: associates || "" },
          { key: "biggest_challenge", value: challenge || "" },
          { key: "organization", value: organization || "" },
        ].filter(f => f.value),
      }
      const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ghlApiToken}`,
          "Version": "2021-07-28",
        },
        body: JSON.stringify(ghlPayload),
      })

      if (!response.ok) {
        console.error("[GHL] API failed:", response.status, await response.text())
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[GHL] Error processing submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
