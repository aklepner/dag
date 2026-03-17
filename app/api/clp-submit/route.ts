import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      leaderName,
      email,
      role,
      tenure,
      q1, q2, q3, q4, q5, q6,
      q7, q8, q9, q10,
      q7_label,
      q8_label,
      q9_text,
      q9_open,
      q10_label,
    } = body

    // Validate required fields
    if (!leaderName || !email) {
      return NextResponse.json(
        { error: "Leader name and email are required" },
        { status: 400 }
      )
    }

    const notionApiKey = process.env.NOTION_API_KEY
    const databaseId = process.env.NOTION_DATABASE_ID

    if (!notionApiKey || !databaseId) {
      console.error("[CLP] Missing NOTION_API_KEY or NOTION_DATABASE_ID")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const submissionId = `CLP-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    // Build Notion page properties
    const properties: Record<string, unknown> = {
      "Submission ID": {
        title: [{ text: { content: submissionId } }],
      },
      "Leader Name": {
        rich_text: [{ text: { content: leaderName || "" } }],
      },
      "Email": {
        email: email || null,
      },
      "Role": {
        rich_text: [{ text: { content: role || "" } }],
      },
      "Tenure": tenure
        ? { select: { name: tenure } }
        : { select: null },
      "Submitted At": {
        date: { start: new Date().toISOString() },
      },
    }

    // Q1-Q6 (select A/B/C)
    for (const qNum of [1, 2, 3, 4, 5, 6]) {
      const val = body[`q${qNum}`]
      properties[`Q${qNum}`] = val
        ? { select: { name: val } }
        : { select: null }
    }

    // Q7-Q10 (select A/B/C/D/E)
    for (const qNum of [7, 8, 9, 10]) {
      const val = body[`q${qNum}`]
      properties[`Q${qNum}`] = val
        ? { select: { name: val } }
        : { select: null }
    }

    // Label / text fields
    if (q7_label) {
      properties["Q7 Label"] = {
        rich_text: [{ text: { content: q7_label } }],
      }
    }
    if (q8_label) {
      properties["Q8 Label"] = {
        rich_text: [{ text: { content: q8_label } }],
      }
    }
    if (q9_text) {
      properties["Q9 Text"] = {
        rich_text: [{ text: { content: q9_text } }],
      }
    }
    if (q9_open) {
      properties["Q9 Open Text"] = {
        rich_text: [{ text: { content: q9_open } }],
      }
    }
    if (q10_label) {
      properties["Q10 Label"] = {
        rich_text: [{ text: { content: q10_label } }],
      }
    }

    // Send to Notion
    const notionRes = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    })

    if (!notionRes.ok) {
      const errBody = await notionRes.text()
      console.error("[CLP] Notion API error:", notionRes.status, errBody)
      return NextResponse.json(
        { error: "Failed to save response" },
        { status: 500 }
      )
    }

    // Also send to GHL webhook if configured
    const webhookUrl = process.env.GHL_WEBHOOK_URL
    if (webhookUrl) {
      try {
        const ghlRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formType: "clp-baseline",
            ...body,
            submittedAt: new Date().toISOString(),
          }),
        })
        if (!ghlRes.ok) {
          console.error("[CLP] GHL webhook failed:", ghlRes.status)
        }
      } catch (ghlErr) {
        console.error("[CLP] GHL webhook error:", ghlErr)
      }
    }

    return NextResponse.json({ success: true, submissionId })
  } catch (error) {
    console.error("[CLP] Error processing submission:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
