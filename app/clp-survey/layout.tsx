import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CLP Onboarding Baseline | DAG",
  description: "Clinical Leadership Playbook — Pre-program systems inventory",
}

export default function CLPSurveyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
