import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Story: Built by Operators, Not Consultants",
  description:
    "Dr. Eric J. Roman built and exited two dental groups. Josey Sewell spent 20+ years building operational systems. Together they created the Associate Operating System.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
