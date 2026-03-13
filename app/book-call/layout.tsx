import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Fit Assessment Call: See If We're the Right Fit",
  description:
    "Schedule a Fit Assessment Call. We'll assess your current systems and build a custom implementation roadmap.",
}

export default function BookCallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
