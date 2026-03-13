"use client"

import React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Footer({ hideToolkit = false }: { hideToolkit?: boolean } = {}) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !firstName || !lastName) return

    setIsSubmitting(true)
    try {
      await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          source: "dag-footer",
          list: "clinical-leadership-journal",
        }),
      })
      router.push(`/thank-you?name=${encodeURIComponent(firstName)}`)
    } catch {
      router.push(`/thank-you?name=${encodeURIComponent(firstName)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-slate-900 text-white">
      {/* Toolkit CTA Section */}
      {!hideToolkit && <div className="bg-slate-50 py-12 md:py-28 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Top Copy */}
          <div className="text-center mb-8 md:mb-10">
            <p className="text-xs md:text-sm font-semibold tracking-widest text-teal-600 uppercase mb-3">Free Toolkit</p>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 md:mb-3">
              Dental Associate Growth Toolkit
            </h2>
            <p className="text-base md:text-lg text-slate-500 max-w-lg mx-auto">
              The 6 systems behind every high-performing associate program. See exactly where you're leaving $100K+ on the table.
            </p>
          </div>

          {/* What's Inside */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-10 mb-0">
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4 md:mb-6">{"What's inside"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              {[
                { title: "6 Core Systems Scorecard", desc: "Find exactly which systems are broken" },
                { title: "Dr. Eric J. Roman's Video Walkthrough", desc: "How to read your results (10 min)" },
                { title: "Production Benchmarks", desc: "See how your associates compare" },
                { title: "Complete Framework Guide", desc: "The proven methodology" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/diagnostic"
              className="flex items-center justify-center w-full py-3.5 md:py-4 bg-slate-900 text-white font-semibold text-sm md:text-base rounded-xl hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/25 transition-all hover:-translate-y-0.5"
            >
              Get the Free Dental Associate Growth Toolkit
            </Link>
            <p className="text-slate-400 text-[11px] md:text-xs text-center mt-2 md:mt-3">
              Takes 60 seconds. Free forever. No credit card required.
            </p>
          </div>
        </div>
      </div>}

      {/* Footer Links Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

            {/* Logo + Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/optimize-logo-colors.png"
                  alt="Dental Associate Growth"
                  className="w-11 h-11 rounded-xl"
                />
                <span className="text-lg font-semibold text-white">Dental Associate Growth</span>
              </div>
              <p className="text-slate-400 text-sm">
                The complete system for transforming dental associates from mediocrity to systematic excellence. Built by operators who've done it.
              </p>
            </div>

            {/* Framework Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Framework</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#systems" className="text-slate-400 hover:text-white transition-colors text-sm">
                    6 Clinical Systems
                  </Link>
                </li>
                <li>
                  <Link href="#playbook" className="text-slate-400 hover:text-white transition-colors text-sm">
                    10-Step Playbook
                  </Link>
                </li>
                <li>
                  <Link href="#framework" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Recipe + Rhythm
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/pricing#resources" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/diagnostic" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Assessments
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies/areo-dental" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div id="newsletter">
              <h4 className="text-white font-semibold mb-2">Clinical Leadership Journal</h4>
              <p className="text-slate-400 text-sm mb-4">
                Weekly insights from Dr. Eric J. Roman on building systems that work.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium text-sm rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
                <p className="text-slate-500 text-xs">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Dental Associate Growth. All rights reserved.
            </p>
            <a
              href="https://futureofwellness.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-400 text-sm transition-colors"
            >
              FutureOfWellness Design + Innovation Studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
