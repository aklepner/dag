import type React from "react"
import Link from "next/link"
import { ToolkitCTASecondary } from "@/components/toolkit-cta"

interface SystemCardProps {
  number: string
  icon: React.ReactNode
  title: string
  subtitle: string
  items: string[]
}

function SystemCard({ number, icon, title, subtitle, items }: SystemCardProps) {
  return (
    <div className="bg-slate-50 rounded-[20px] p-12 text-center border border-transparent hover:border-teal hover:shadow-[0_20px_40px_rgba(20,184,166,0.12)] transition-all duration-300 relative">
      <div className="absolute top-6 right-6 w-8 h-8 bg-white text-slate-600 rounded-full flex items-center justify-center font-medium text-sm shadow-sm">
        {number}
      </div>

      <div className="w-[72px] h-[72px] bg-gradient-mixed rounded-[18px] flex items-center justify-center mx-auto mb-7 shadow-lg">
        {icon}
      </div>

      <h3 className="text-2xl font-semibold text-slate-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-600 mb-7 text-[0.95rem]">{subtitle}</p>

      <ul className="text-left space-y-2.5 pt-7 border-t border-slate-200">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center text-slate-600 text-[0.95rem]">
            <span className="w-1 h-1 bg-teal rounded-full mr-3" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FrameworkSection() {
  const cards = [
    {
      number: "1",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      title: "6 Clinical Systems",
      subtitle: "The foundation that enables everything",
      items: [
        "Clear Agreements",
        "KPIs & Metrics",
        "Trust and Accountability",
        "Efficient Training & Onboarding",
        "Always-On Hiring",
        "Clinical Leadership Mastery",
      ],
    },
    {
      number: "2",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
      title: "Associate Playbook",
      subtitle: "The recipe for associate success",
      items: [
        "90-Day Reviews",
        "Mindset Development",
        "Skills Progression",
        "Business Acumen",
        "Owner Mentality",
        "Engagement Scoring",
      ],
    },
    {
      number: "3",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "90-Day Rhythm",
      subtitle: "The system that makes it stick",
      items: [
        "Weekly Touchpoints",
        "Monthly Reviews",
        "Quarterly Optimization",
        "Behavioral Tracking",
        "ROI Measurement",
        "Continuous Improvement",
      ],
    },
  ]

  return (
    <section className="py-[100px] px-6 bg-white" id="framework">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold text-slate-900 mb-5 tracking-tight leading-tight">
            The Complete System for Treatment Acceptance Excellence
          </h2>
          <p className="text-xl text-slate-600">
            Without clinical systems, associate development is impossible.
            <br />
            {"Here\u2019s what we install\u2014and what you keep."}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {cards.map((card, idx) => (
            <SystemCard key={idx} {...card} />
          ))}
        </div>

        <ToolkitCTASecondary variant="dark" className="mt-12" />

        <p className="text-center text-slate-500 text-sm mt-10 max-w-3xl mx-auto italic">
          {"\"These aren\u2019t templates you have to figure out. We build them inside your organization. After 12 months, they\u2019re yours, increasing your enterprise value whether you scale, sell, or stay.\""}
        </p>
      </div>
    </section>
  )
}
