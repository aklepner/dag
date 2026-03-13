"use client"

import type React from "react"
import Link from "next/link"
import { ToolkitCTASecondary } from "@/components/toolkit-cta"

import { useState, useRef } from "react"
import { Layers, Clock, Building2, CheckCircle2, ArrowRight } from "lucide-react"

interface Avatar {
  id: string
  badge: string
  icon: React.ReactNode
  title: string
  subtitle: string
  painQuote: string
  needs: string[]
  contrast: string
  diagnosticTitle: string
  diagnosticDescription: string
}

const avatars: Avatar[] = [
  {
    id: "foundation",
    badge: "1-4 Locations",
    icon: <Layers className="w-10 h-10" />,
    title: "Foundation Building",
    subtitle: "Laying the groundwork before growth",
    painQuote: '"I want to scale, but I\'m terrified of the associate nightmare everyone talks about."',
    needs: ["Build systems before chaos hits", "Hire your first associates right", "Scale with confidence, not fear"],
    contrast: "Without this: 10 years of expensive trial-and-error and associates who leave before you figure it out.",
    diagnosticTitle: "Your Foundation Building Toolkit",
    diagnosticDescription:
      "Get the exact systems, frameworks, and tools used to build associate programs from scratch. Stop guessing and start building the clinical infrastructure that scales.",
  },
  {
    id: "systems",
    badge: "5-15 Locations",
    icon: <Clock className="w-10 h-10" />,
    title: "Systems Design",
    subtitle: "Installing frameworks to control the chaos",
    painQuote: "\"We're adding locations faster than we can build systems. It's unsustainable associate hell.\"",
    needs: ["Stop the bleeding right now", "Install emergency systems fast", "Turn chaos into predictability"],
    contrast: "Without this: Firefighting forever while your best associates quietly plan their exit.",
    diagnosticTitle: "Your Systems Design Toolkit",
    diagnosticDescription:
      "Get the frameworks that turn chaos into predictability. Built from turning around dozens of multi-location practices bleeding cash and talent.",
  },
  {
    id: "scale",
    badge: "15+ Locations",
    icon: <Building2 className="w-10 h-10" />,
    title: "Scale + Infrastructure",
    subtitle: "Optimizing systems for enterprise performance",
    painQuote:
      '"We have systems, but associates still underperform and leave. At scale, you need systems that show you what\'s actually happening, not filtered reports that hide the truth."',
    needs: ["Diagnose what's actually broken", "Fix systemic inefficiencies", "Install systematic excellence"],
    contrast: "Without this: Capital partner pressure mounts while same-store sales stagnate.",
    diagnosticTitle: "Your Scale + Infrastructure Toolkit",
    diagnosticDescription:
      "Get the enterprise-grade systems that reveal what\'s actually happening across your organization. Move from filtered reports to systematic excellence.",
  },
]

export function AvatarSelection() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const diagnosticRef = useRef<HTMLDivElement>(null)

  const handleSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId)
    setTimeout(() => {
      diagnosticRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  const selected = avatars.find((a) => a.id === selectedAvatar)

  return (
    <section className="py-[100px] px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-semibold text-slate-900 mb-5 tracking-tight leading-tight">
            We've Seen Every Stage. We Know What Breaks.
          </h2>
          <p className="text-xl text-slate-600 max-w-[900px] mx-auto">
            What works at 3 locations breaks at 15. What works at 15 never worked at 3. Select your stage below and get the toolkit calibrated to the challenges of your growth phase.
          </p>
        </div>

        {/* Avatar Grid */}
        <div className="grid lg:grid-cols-3 gap-6 my-12">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => handleSelect(avatar.id)}
              className={`bg-white border-2 rounded-[20px] p-10 text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)] ${
                selectedAvatar === avatar.id ? "border-teal border-[3px] bg-teal/[0.02]" : "border-slate-200"
              }`}
            >
              <div className="inline-block bg-gradient-mixed text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-5">
                {avatar.badge}
              </div>

              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all ${
                  selectedAvatar === avatar.id ? "bg-gradient-mixed text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {avatar.icon}
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3 tracking-tight">{avatar.title}</h3>
              <p className="text-sm text-slate-600 font-medium mb-5">{avatar.subtitle}</p>
              <p className="text-slate-900 italic mb-6 min-h-[72px] leading-relaxed">{avatar.painQuote}</p>

              <ul className="text-left space-y-2 pt-6 border-t border-slate-200 mb-4">
                {avatar.needs.map((need, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-slate-600 text-[0.9rem]">
                    <span className="w-1.5 h-1.5 bg-teal rounded-full flex-shrink-0" />
                    {need}
                  </li>
                ))}
              </ul>

              <p className="text-red-600/80 text-sm italic text-left">{avatar.contrast}</p>
            </button>
          ))}
        </div>

        {/* Toolkit Preview */}
        {selected && (
          <div
            ref={diagnosticRef}
            className="max-w-[800px] mx-auto bg-white border-2 border-slate-200 rounded-3xl p-16 text-center mt-16"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dental-associate-growth-logo.png"
              alt="Dental Associate Growth"
              className="h-auto w-auto max-h-[100px] mx-auto mb-8"
            />

            <h3 className="text-[2rem] font-semibold text-slate-900 mb-5 tracking-tight">{selected.diagnosticTitle}</h3>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed">{selected.diagnosticDescription}</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                "The 6 Core Clinical Systems Framework",
                "Associate Performance Playbook",
                "EBITDA Recovery Calculator",
                "Stage-Specific Implementation Guide",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-left">
                  <div className="min-w-6 h-6 bg-teal/10 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                  </div>
                  <span className="text-slate-600 text-[0.95rem]">{item}</span>
                </div>
              ))}
            </div>

            <ToolkitCTASecondary variant="dark" />
          </div>
        )}

        <div className="text-center mt-20 pt-16 border-t border-slate-200">
          <p className="text-slate-600 mb-6">Not sure which stage fits? Want to talk it through first?</p>
          <a
            href="/book-call"
            className="inline-block bg-transparent border-[1.5px] border-slate-300 text-slate-900 px-7 py-4 rounded-xl font-medium hover:border-slate-900 hover:bg-slate-50 transition-all"
          >
            Book a Fit Assessment Call
          </a>
        </div>
      </div>
    </section>
  )
}
