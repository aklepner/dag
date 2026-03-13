const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyUSKjPW-DPomMqqXLh5x25LujaNWQRTsDB93kvBIX-PME1vNJpuvBhTpumIx9eLv7S-g/exec"

export async function sendToGoogleSheets(data: Record<string, unknown>) {
  try {
    const payload = {
      ...data,
      submittedAt: data.submittedAt || new Date().toISOString(),
    }

    // Google Apps Script redirects POST 302 -> GET, which drops the body.
    // Sending via GET with the payload as a query param is the most reliable
    // server-side approach for Apps Script web app endpoints.
    const url = `${GOOGLE_SHEETS_URL}?data=${encodeURIComponent(JSON.stringify(payload))}`

    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    })

    if (!response.ok) {
      console.error("[Google Sheets] Response not OK:", response.status, response.statusText)
    }
  } catch (error) {
    console.error("[Google Sheets] Failed to send data:", error)
  }
}
