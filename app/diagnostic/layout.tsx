import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Readiness Diagnostic \u2014 Where Does Your Organization Stand?",
  description:
    "Take the free diagnostic to assess your associate development systems across the 6 Clinical Systems.",
}

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
