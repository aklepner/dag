"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClinicalLeadershipJournal } from "@/components/clinical-leadership-journal"

export default function AboutPage() {
  const [showPlaybook, setShowPlaybook] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlaybook(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* SECTION 1: THE HOOK */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-500/5 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <p className="text-teal-400 font-medium tracking-widest uppercase text-sm mb-8">
            Our Story
          </p>

          <div className="space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              We Learned This the Hard Way.
            </h1>
            <p
              className={`text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 font-semibold transition-all duration-700 ease-out ${
                showPlaybook
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              So We Built the Playbook.
            </p>
          </div>

          <div className="space-y-4 text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mb-12">
            <p>To hire with hope.</p>
            <p>To watch someone walk out the door and wonder what you missed.</p>
            <p>{"To lie awake asking if you're the problem."}</p>
          </div>

          <div className="border-l-4 border-teal-500/50 pl-6 py-2 max-w-3xl">
            <p className="text-lg text-slate-200 leading-relaxed mb-4">
              Dr. Eric J. Roman hired 12 associates in his first three years.
              Nine left within 18 months.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              {"It wasn't a hiring problem. It wasn't a \"millennial problem.\" It wasn't bad luck."}
            </p>
            <p className="text-xl text-white font-medium">
              It was a systems problem. And he had no idea.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 2: THE REFRAME */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              {"For years, Dr. Eric J. Roman did what everyone does: hoped things would work out, reacted when they didn't, and blamed circumstances he couldn't control."}
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              It took building, failing, rebuilding, and finally exiting two dental
              groups to understand the truth the industry keeps ignoring:
            </p>

            <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug my-10">
              {"Associate problems aren't people problems."}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                {"They're systems problems."}
              </span>
            </blockquote>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              {"You can't develop people without infrastructure. You can't hold people accountable to standards that don't exist. You can't scale what you've never systematized."}
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              {"But when you build the right systems? You unlock something most leaders never see: the dormant potential inside every associate. And an empowered associate isn't just a better employee. They're the single greatest value driver in your practice."}
            </p>

            <p className="text-slate-900 text-xl font-medium mt-8">
              {"So we built what didn't exist."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE FOUNDERS */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <p className="text-teal-600 font-medium tracking-widest uppercase text-sm mb-4">
              The Team
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {"We've Been in Your Seat."}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {"We didn't meet in a boardroom. We met in the trenches, building a DSO from scratch, solving problems no one had solved before. That's where Recipe + Rhythm was born."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Dr. Eric J. Roman */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/eric-roman.png"
                alt="Dr. Eric J. Roman"
                className="w-28 h-28 rounded-full object-cover mb-6"
              />

              <h3 className="text-2xl font-bold text-slate-900 mb-1">Dr. Eric J. Roman</h3>
              <p className="text-teal-600 font-medium mb-6">Founder</p>

              <p className="text-slate-600 leading-relaxed mb-6">
                Built and exited two dental groups. Not as a consultant looking in,
                but as an owner in the chair, in the C-suite, and at the exit table.
                Personally hired over 100 associates. Made every mistake in the book,
                then wrote a new one.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  2 exits
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  100+ associates hired
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  $1B+ coached
                </span>
              </div>

              <p className="text-slate-500 italic text-sm">
                {"\"I'm not a consultant who studied dentistry. I'm a dental operator who systematized what works.\""}
              </p>
            </div>

            {/* Josey Sewell */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/josey.png"
                alt="Josey Sewell"
                className="w-28 h-28 rounded-full object-cover mb-6"
              />

              <h3 className="text-2xl font-bold text-slate-900 mb-1">Josey Sewell</h3>
              <p className="text-teal-600 font-medium mb-6">Co-Founder</p>

              <p className="text-slate-600 leading-relaxed mb-6">
                {"Started as a clinical hygienist, became a Director of Hygiene who doubled revenue and added $4.2M to the organization in 12 months, then built the people systems, culture infrastructure, and operational playbooks as COO through a PE-backed exit. Has facilitated over 350 full-day sessions, logged 10,000+ hours coaching dental groups, and worked with 50-75% of the Inc. fastest-growing companies in dental for the last seven years."}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  350+ sessions facilitated
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  10,000+ coaching hours
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  COO through PE exit
                </span>
              </div>

              <p className="text-slate-500 italic text-sm">
                {"\"Systems are what set people free to do their best work. That's where the joy comes from.\""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE VISION */}
      <section className="bg-slate-900 text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-teal-400 font-medium tracking-widest uppercase text-sm mb-6">
            Our Vision
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What If Work Could Be Different?
          </h2>

          <div className="space-y-6 text-xl md:text-2xl text-slate-300 leading-relaxed mb-16">
            <p>
              {"What if associates didn't just survive their first year. What if they "}
              <span className="text-white font-medium">thrived</span>?
            </p>
            <p>
              {"What if clinical leaders weren't drowning. What if they were "}
              <span className="text-white font-medium">equipped</span>?
            </p>
            <p>
              What if the people who chose dentistry could fall in{" "}
              <span className="text-white font-medium">love with it again</span>?
            </p>
          </div>

          <div className="border-l-2 border-teal-500/50 pl-6 mb-16">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              We believe every associate deserves a real chance to succeed. Not sink-or-swim.
              Not figure-it-out-yourself. A real system that meets them where they are and
              shows them where they can go.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {"We believe clinical leaders shouldn't have to burn out to build something great. They deserve infrastructure that multiplies their impact instead of drowning them in firefighting."}
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              {"We believe work can be joyful. Not in spite of the systems. "}
              <span className="text-teal-400 font-medium">Because of them</span>.{" "}
              {"When people know what's expected, when they see a path forward, when they feel invested in. That's when dentistry becomes what it was supposed to be."}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              {"That's what we're building."}
            </p>
            <p className="text-lg text-slate-400">
              Not a consulting engagement. A movement toward{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 font-medium">
                joyful, sustainable excellence
              </span>
              .
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE CONTRAST */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              What Changes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="bg-slate-50 rounded-2xl p-8 lg:p-10">
              <h3 className="text-xl font-bold text-slate-400 mb-8 uppercase tracking-wide">
                The Old Way
              </h3>
              <div className="space-y-5">
                {[
                  "Hope-based development",
                  "Reactive firefighting",
                  "Associates leave before they hit potential",
                  "Management theater",
                  "Accountability without infrastructure",
                ].map((item) => (
                  <p key={item} className="text-slate-600 flex items-start gap-3">
                    <span className="text-slate-400 mt-1">{"•"}</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 lg:p-10">
              <h3 className="text-xl font-bold text-teal-400 mb-8 uppercase tracking-wide">
                The DAG Way
              </h3>
              <div className="space-y-5">
                {[
                  "Recipe + Rhythm methodology",
                  "Systematic clinical infrastructure",
                  "Associates who perform, grow, and stay",
                  "Measurable outcomes in 90 days",
                  "Systems that work when you're not in the room",
                ].map((item) => (
                  <p key={item} className="text-slate-200 flex items-start gap-3">
                    <span className="text-teal-400 mt-1">{"\u2192"}</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: MISSION + VALUES */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-teal-600 font-medium tracking-widest uppercase text-sm mb-4">
              Our Mission
            </p>
            <p className="text-2xl md:text-3xl text-slate-900 font-medium leading-relaxed">
              To create dental workplaces where associates grow into their potential, teams find joy in their work, and patients experience what healthy care feels like.
            </p>
          </div>

          <div>
            <p className="text-teal-600 font-medium tracking-widest uppercase text-sm mb-6">
              What We Stand For
            </p>
            <div className="space-y-6">
              {[
                { title: "Systematic.", desc: "Excellence is systematic, not accidental." },
                { title: "Empowering.", desc: "We teach you to fish. No dependency creation." },
                { title: "Honest.", desc: "What you need to hear, not what you want to hear." },
                { title: "Foundational.", desc: "Clinical systems before associate development. Always." },
                { title: "Measurable.", desc: "If you can't measure it, it's management theater." },
              ].map((value) => (
                <div key={value.title}>
                  <p className="text-lg text-slate-900 font-semibold">{value.title}</p>
                  <p className="text-slate-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: THE MANIFESTO */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="space-y-2 text-lg text-slate-500 mb-10">
            <p>No more hiring and hoping.</p>
            <p>No more reactive firefighting.</p>
            <p>No more management theater.</p>
          </div>

          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 mx-auto mb-10" />

          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug mb-8">
            {"\"The mediocrity hamster wheel ends here."}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
              Excellence is systematic, not accidental.
            </span>
            <br />
            {'The recipe exists. You just need to implement it."'}
          </blockquote>

          <p className="text-slate-500 font-medium">Dr. Eric J. Roman</p>
        </div>
      </section>

      {/* SECTION 8: Clinical Leadership Journal */}
      <ClinicalLeadershipJournal />

      <Footer hideToolkit />
    </div>
  )
}
