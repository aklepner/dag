"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const firstName = searchParams.get("name") || "friend"

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-[480px] text-center animate-fade-in">
        {/* Gradient circle with heart */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-violet-500 flex items-center justify-center mx-auto mb-7 animate-glow shadow-[0_8px_32px_rgba(139,92,246,0.25),0_4px_16px_rgba(6,182,212,0.15)]">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white leading-tight mb-3">
          {"You\u2019re in, "}{firstName}.
        </h1>

        <p className="text-[17px] text-slate-400 leading-relaxed mb-9 max-w-[380px] mx-auto">
          Thank you for joining the{" "}
          <span className="text-white font-semibold italic">Clinical Leadership Journal</span>.
          <br /><br />
          {"We\u2019re launching in March, and what\u2019s coming is going to change how this industry thinks about associate development."}
        </p>

        {/* Divider */}
        <div className="h-0.5 w-12 bg-gradient-to-r from-teal-500 to-violet-500 rounded-full mx-auto mb-9" />

        {/* What's Coming */}
        <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl px-6 py-7 text-left mb-8">
          <p className="text-xs font-semibold tracking-[2px] uppercase mb-5 bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
            {"What\u2019s coming"}
          </p>

          {[
            { icon: "M", text: "Weekly insights from Dr. Eric J. Roman on building systems that actually work" },
            { icon: "T", text: "Frameworks, tools, and the Recipe + Rhythm methodology" },
            { icon: "A", text: "First access to everything we're building this year" },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex gap-3.5 items-start py-2.5 ${i < 2 ? "border-b border-white/[0.04]" : ""}`}
            >
              <span className="text-lg shrink-0 mt-0.5">
                {i === 0 ? "\uD83D\uDCEC" : i === 1 ? "\uD83E\uDDF0" : "\uD83C\uDFAF"}
              </span>
              <p className="text-sm text-white/65 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Back to site */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25 transition-all"
          >
            {"Back to Homepage \u2192"}
          </Link>
          <Link
            href="/about"
            className="inline-block border border-slate-600 text-slate-300 px-6 py-3 rounded-xl font-medium text-sm hover:border-slate-400 hover:text-white transition-all"
          >
            Learn About Us
          </Link>
        </div>

        {/* Branding */}
        <div className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/optimize-logo-colors.png"
            alt="Dental Associate Growth"
            className="h-10 w-10 mx-auto opacity-60"
          />
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
