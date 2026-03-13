"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 9l5 3-5 3V9z" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
    </svg>
  )
}

export function ClinicalLeadershipJournal() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !firstName || !lastName) return

    setIsLoading(true)
    try {
      await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          source: "clinical-leadership-journal",
          list: "clinical-leadership-journal",
        }),
      })
      router.push(`/thank-you?name=${encodeURIComponent(firstName)}`)
    } catch {
      router.push(`/thank-you?name=${encodeURIComponent(firstName)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-[72px] px-6">
      {/* Ambient glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[600px] mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-teal-500/8 border border-teal-500/15 rounded-full px-4 py-1.5 mb-7">
          <div className="w-[7px] h-[7px] rounded-full bg-teal-500" />
          <span className="text-xs font-semibold text-teal-500 tracking-widest uppercase">
            Free Weekly Newsletter
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[40px] font-bold text-white leading-[1.15] mb-4">
          Clinical Leadership{" "}
          <span className="bg-gradient-to-br from-purple-400 to-teal-500 bg-clip-text text-transparent italic">
            Journal
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-[17px] text-slate-400 leading-relaxed mb-9 max-w-[480px] mx-auto">
          Systems at scale. How to build teams that{" "}
          <strong className="text-slate-200">develop</strong> people,
          not deplete them. Weekly from Dr. Eric J. Roman.
        </p>

        {/* Journal Card */}
        <div className="bg-white/[0.04] border border-teal-500/20 rounded-2xl py-7 px-8 mb-9 text-left">
          <div className="flex items-center justify-between mb-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center">
              <PeopleIcon />
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-500">
              <span>{"📅"}</span>
              <span>Thursdays</span>
              <span className="text-slate-600">{"•"}</span>
              <span className="text-slate-500 font-normal">5-min read</span>
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase mb-1.5">
            For Clinical Leaders
          </p>
          <p className="text-sm text-slate-400 leading-[1.8]">
            <span className="text-slate-200 font-medium">The frameworks</span>{" "}
            behind scaling two dental groups.
            <br />
            <span className="text-slate-200 font-medium">The field notes</span>{" "}
            from building and exiting real practices.
            <br />
            <span className="text-slate-200 font-medium">The hard-won lessons</span>{" "}
            your residency never taught you.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="max-w-[520px] mx-auto mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
              className="w-full px-5 py-[15px] rounded-xl border border-white/8 bg-white/[0.04] text-white text-[15px] outline-none focus:border-teal-500/40 transition-colors placeholder:text-slate-500"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
              className="w-full px-5 py-[15px] rounded-xl border border-white/8 bg-white/[0.04] text-white text-[15px] outline-none focus:border-teal-500/40 transition-colors placeholder:text-slate-500"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-5 py-[15px] rounded-xl border border-white/8 bg-white/[0.04] text-white text-[15px] outline-none focus:border-teal-500/40 transition-colors placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-7 py-[15px] rounded-xl border-none bg-gradient-to-br from-violet-500 to-teal-600 hover:from-purple-400 hover:to-teal-500 text-white text-[15px] font-bold cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? "..." : "Subscribe Free"} <span className="text-lg">{"\u2192"}</span>
          </button>
        </form>

        {/* Trust line */}
        <p className="text-[13px] text-slate-600 mb-10">
          {"Join 2,000+ dental professionals. Free forever. Unsubscribe anytime."}
        </p>

        {/* Every issue includes */}
        <div className="border-t border-white/[0.06] pt-8">
          <p className="text-sm text-slate-500 mb-5">Every issue includes:</p>
          <div className="flex justify-center gap-10 flex-wrap">
            {[
              { icon: <VideoIcon />, title: "Weekly video from Dr. Eric J. Roman", desc: "One story, one insight" },
              { icon: <EyeIcon />, title: "3 things I'm seeing", desc: "Patterns from the field" },
              { icon: <SparkleIcon />, title: "One thing to try", desc: "Actionable challenge" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-2.5">
                <span className="text-slate-500 flex">{item.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-200 leading-tight">{item.title}</p>
                  <p className="text-[13px] text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
