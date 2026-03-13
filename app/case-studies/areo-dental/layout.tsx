import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Areo Dental \u2014 35-40% Productivity Spike in 90 Days",
  description:
    "How an 8-location, 15-associate dental group achieved a 35-40% productivity spike within 90 days of installing the Recipe + Rhythm methodology.",
}

export default function AreoDentalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
