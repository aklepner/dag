"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"

// ═══════════════════════════════════════════════════════════════
// DATA & CONSTANTS
// ═══════════════════════════════════════════════════════════════

const DIAGNOSTIC_QUESTIONS = [
  {
    q: "How many locations does your organization operate?",
    opts: ["1-3", "4-7", "8-15", "16-30", "30+"],
    k: "loc",
  },
  {
    q: "How many associate dentists are in your organization?",
    opts: ["1-5", "6-15", "16-30", "31-50", "50+"],
    k: "assoc",
  },
  {
    q: "Do you currently track treatment acceptance rates by provider?",
    opts: [
      "Yes, by provider and procedure type",
      "Yes, but only practice-wide",
      "We track it but don't act on it",
      "We don't track it",
      "I'm not sure",
    ],
    k: "track",
  },
  {
    q: "What is your average treatment acceptance rate?",
    opts: ["Above 70%", "55-70%", "40-55%", "Below 40%", "We don't know"],
    k: "rate",
  },
  {
    q: "Do you have clear, written agreements with every associate?",
    opts: [
      "Yes, comprehensive and reviewed regularly",
      "Yes, but they're outdated",
      "Partially, some associates, not all",
      "No formal agreements exist",
    ],
    k: "agree",
  },
  {
    q: "What has associate turnover looked like in the last 24 months?",
    opts: [
      "Lost 0-1 associates",
      "Lost 2-3 associates",
      "Lost 4+ associates",
      "It's been a revolving door",
    ],
    k: "churn",
  },
  {
    q: "Is your leadership team willing to commit one focused day per month?",
    opts: [
      "Yes, we're ready to prioritize this",
      "Probably, but I need buy-in from partners",
      "That feels like a lot right now",
      "I'm not sure who would own this internally",
    ],
    k: "commit",
  },
]

const PARTNERSHIP_TIERS = [
  {
    tier: "Foundation",
    profile: "$2M\u2013$7M in revenue",
    price: "$5,000",
    priceLabel: "/month",
    items: [
      "Sprint Onboarding",
      "UNLIMITED associates enrolled in The Dentist Growth Playbook",
      "Dentist Accountability Coach",
      "UNLIMITED Dentist 90-Day Assessments",
      "UNLIMITED New Dentist Onboarding",
      "Clinical Leadership Implementation Coach",
      "6 Clinical System Sprint Installation: You + 1 Team Member",
      "UNLIMITED Quarterly Associate Feedback",
      "Dentist KPI & Engagement Reporting",
    ],
  },
  {
    tier: "Growth",
    profile: "$7M\u2013$20M in revenue",
    price: "Starting at $7,500",
    priceLabel: "/month",
    items: [
      { text: "Everything in Foundation, PLUS:", bold: true },
      "2 Additional Clinical Leadership Team Members (You + 3 total)",
      "Clinical Director Training & Support",
      "Train Your Trainer Sessions",
      "Personalized Onboarding & Sprint Design",
      "Quarterly CEO Circle Meetings",
      "Operational Assessments",
    ],
  },
  {
    tier: "Scale",
    profile: "$20M\u2013$50M+ in revenue",
    price: "Starting at $15,000",
    priceLabel: "/month",
    items: [
      { text: "Everything in Growth, PLUS:", bold: true },
      "UNLIMITED Clinical Leadership Participants",
      "Quarterly Live Event Attendance",
      "Manager + Operator Playbook",
      "Partnership Playbook",
      "Private 1-on-1 Access to Dr. Eric J. Roman & Josey",
      "Operational Coach",
      "Regional Clinical Director Training & Support",
    ],
  },
]

// ═══════════════════════════════════════════════════════════════
// UTILITY HOOKS
// ═══════════════════════════════════════════════════════════════

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

const TURNOVER_COST_LOW = 30000
const TURNOVER_COST_HIGH = 250000
const HIGH_PERFORMER_GROWTH_RATE = 0.15
const PROJECTION_YEARS = 5

const formatShort = (n: number) =>
  n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `$${(n / 1e3).toFixed(0)}K` : `$${n}`

const formatCurrencyFull = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

// ═══════════════════════════════════════════════════════════════
// SECTION WRAPPER
// ═══════════════════════════════════════════════════════════════

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"} ${className}`}
    >
      {children}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1: HERO (dark bg)
// ═══════════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section className="bg-slate-900 pt-44 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs tracking-widest uppercase font-semibold text-teal-400 bg-teal-400/10 border border-teal-400/20 px-4 py-1.5 rounded-full inline-block mb-6">
          Partnership
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          {"We Don\u2019t Take Clients."}<br />
          {"We Select Partners."}
        </h1>

        <p className="text-lg text-slate-400 max-w-lg mx-auto mb-10">
          We spent a decade building the system we wish someone had given us. We partner with dental organizations who are done guessing and ready to build.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/book-call"
            className="bg-white text-slate-900 rounded-xl px-8 py-4 font-semibold text-base hover:bg-slate-100 transition-colors"
          >
            Book a Fit Assessment Call
          </Link>
          <Link
            href="/diagnostic"
            className="bg-transparent text-white border border-slate-600 rounded-xl px-8 py-4 font-semibold text-base hover:bg-slate-800 hover:border-slate-500 transition-colors"
          >
            Take the Readiness Diagnostic
          </Link>
        </div>

        <p className="text-sm text-slate-500 mt-4">
          Book your call, then complete the diagnostic. Dr. Eric J. Roman reviews your results before you meet.
        </p>

        {/* Proof strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-xl mx-auto mt-16 pt-10 border-t border-slate-800">
          {[
            { stat: "$1B+", label: "Coached Revenue", color: "text-white" },
            { stat: "100+", label: "Associates Hired", color: "text-teal-400" },
            { stat: "90 Days", label: "To Measurable Results", color: "text-white" },
          ].map((item) => (
            <div key={item.label}>
              <div className={`text-3xl font-extrabold ${item.color}`}>{item.stat}</div>
              <div className="text-xs text-slate-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2: THE PARTNERSHIP (light bg)
// ═══════════════════════════════════════════════════════════════

function PartnershipSection() {
  return (
    <section className="bg-white py-24 px-6">
      <AnimatedSection className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-12">
          What Partnership Actually Means
        </h2>

        {/* Definition Block */}
        <div className="mb-10">
          <div className="border-l-2 border-teal-500 pl-5 mb-5">
            <p className="text-base md:text-lg">
              <strong className="text-slate-900">partner</strong>{" "}
              <span className="italic text-slate-400">{"/\u02C8p\u00E4rt-n\u0259r/ \u2014 two parties engaged together in the same activity"}</span>
            </p>
          </div>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {"Let\u2019s be clear about what this means. This isn\u2019t an equity relationship. We don\u2019t take a portion of your company. Partnership means we both have responsibilities. We can\u2019t do all the work \u2014 and neither can you. That\u2019s why we need each other. That\u2019s why we choose to work together."}
          </p>
        </div>

        {/* Block A */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase font-semibold text-teal-600 mb-3">What We Bring</p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            The Recipe + Rhythm methodology, the same system behind $1B+ in coached revenue. We install six clinical systems inside your organization and deploy a dentist development playbook that gives every associate a clear path from day one to high performance. Dr. Eric J. Roman and Josey, along with our coaching team, work alongside your team building the infrastructure that makes excellence repeatable.
          </p>
        </div>

        {/* Block B */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase font-semibold text-teal-600 mb-3">What You Bring</p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {"Leadership that shows up. This isn\u2019t a program you buy and hand off to HR. It requires your clinical directors, your operators, your executive team to be in the room, doing the work, one day per month. The system we build becomes yours, but only if your leaders own it from the beginning."}
          </p>
        </div>

        {/* Block C */}
        <div>
          <p className="text-xs tracking-widest uppercase font-semibold text-teal-600 mb-3">The Honest Part</p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
            {"Not every organization is ready for this. Part of our job, before we ever start, is making sure you are. Not because we\u2019re gatekeeping. Because if the foundation isn\u2019t there, the system won\u2019t hold. And we\u2019d rather tell you that honestly than take your money and watch it fail."}
          </p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            {"If you\u2019re ready, we\u2019ll know within one conversation. If you\u2019re not ready yet, we\u2019ll tell you exactly what needs to be in place, and we have free tools to help you start building before we ever work together."}
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3: MEDIOCRITY TAX (light bg + calculator)
// ═══════════════════════════════════════════════════════════════

// ── Slider sub-component ──
function CalcSlider({ label, sublabel, value, onChange, min, max, step, format, suffix }: {
  label: string; sublabel?: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; format?: (v: number) => string; suffix?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="mb-8">
      <div className="flex justify-between items-baseline mb-2">
        <div>
          <div className="font-semibold text-[15px] text-slate-900 tracking-tight">{label}</div>
          {sublabel && <div className="text-xs text-slate-400 mt-0.5">{sublabel}</div>}
        </div>
        <div className="font-mono text-xl font-semibold text-slate-900 tracking-tighter">
          {format ? format(value) : value}{suffix || ""}
        </div>
      </div>
      <div className="relative h-1.5 rounded-full bg-slate-200">
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-500 transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full -mt-1.5 relative z-10 appearance-none bg-transparent cursor-pointer h-5
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:border-[3px]
          [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(20,184,166,0.3)]
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-teal-500 [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white
          [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(20,184,166,0.3)] [&::-moz-range-thumb]:cursor-pointer"
      />
      <div className="flex justify-between text-[11px] text-slate-400">
        <span>{format ? format(min) : min}{suffix || ""}</span>
        <span>{format ? format(max) : max}{suffix || ""}</span>
      </div>
    </div>
  )
}

// ── Breakdown range bar ──
function RangeBar({ label, lowValue, highValue, note }: {
  label: string; lowValue: number; highValue: number; note: string;
}) {
  return (
    <div className="bg-teal-500/[0.04] rounded-xl p-5 md:p-6 mb-4 border border-teal-500/10">
      <p className="font-semibold text-sm text-slate-900 tracking-tight mb-3">{label}</p>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-mono text-2xl md:text-[28px] font-bold text-red-500 tracking-tighter">{formatShort(lowValue)}</span>
        <span className="text-sm text-slate-400 font-medium">to</span>
        <span className="font-mono text-2xl md:text-[28px] font-bold text-red-500 tracking-tighter">{formatShort(highValue)}</span>
      </div>
      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{note}</p>
    </div>
  )
}

function MediocityTaxSection() {
  const [totalAssociates, setTotalAssociates] = useState(12)
  const [aboveAvgCount, setAboveAvgCount] = useState(4)
  const [aboveAvgProd, setAboveAvgProd] = useState(140)
  const [belowAvgCount, setBelowAvgCount] = useState(8)
  const [belowAvgProd, setBelowAvgProd] = useState(70)
  const [turnoverRate, setTurnoverRate] = useState(25)
  const [showResults, setShowResults] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setBelowAvgCount(Math.max(0, totalAssociates - aboveAvgCount))
  }, [totalAssociates, aboveAvgCount])

  useEffect(() => {
    if (aboveAvgCount > totalAssociates) setAboveAvgCount(totalAssociates)
  }, [totalAssociates, aboveAvgCount])

  // Turnover
  const annualTurnovers = totalAssociates * (turnoverRate / 100)
  const fiveYearTurnoverLow = annualTurnovers * TURNOVER_COST_LOW * PROJECTION_YEARS
  const fiveYearTurnoverHigh = annualTurnovers * TURNOVER_COST_HIGH * PROJECTION_YEARS

  // Below-average gap
  const belowAvgMonthly = belowAvgCount * belowAvgProd * 1000
  const belowAvgGapAnnual = (belowAvgMonthly * 2 - belowAvgMonthly) * 12
  const belowAvgGap5Year = belowAvgGapAnnual * PROJECTION_YEARS

  // Above-average compound growth gap
  const aboveAvgMonthlyBase = aboveAvgCount * aboveAvgProd * 1000
  let aboveAvgCompoundTotal = 0
  for (let y = 1; y <= PROJECTION_YEARS; y++) {
    aboveAvgCompoundTotal += aboveAvgMonthlyBase * 12 * Math.pow(1 + HIGH_PERFORMER_GROWTH_RATE, y)
  }
  const aboveAvgGap5Year = aboveAvgCompoundTotal - aboveAvgMonthlyBase * 12 * PROJECTION_YEARS

  // Conservative vs aggressive
  const underperformanceLow = belowAvgGap5Year * 0.3 + aboveAvgGap5Year * 0.5
  const underperformanceHigh = belowAvgGap5Year + aboveAvgGap5Year
  const totalLow = fiveYearTurnoverLow + underperformanceLow
  const totalHigh = fiveYearTurnoverHigh + underperformanceHigh

  const scrollToCalculator = () => calculatorRef.current?.scrollIntoView({ behavior: "smooth" })

  function handleCalculate() {
    setShowResults(true)
    setAnimateIn(false)
    setTimeout(() => {
      setAnimateIn(true)
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  return (
    <section id="mediocrity-tax" className="bg-slate-50 py-24 px-6">
      <AnimatedSection className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Math on Staying Where You Are
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-4">
            Before you look at what this costs, look at what doing nothing costs.
          </p>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {"Every dental group pays a Mediocrity Tax: the silent, compounding cost of associates who underperform, patients who leave undiagnosed, and turnover that never stops. Most owners don\u2019t calculate it. They just feel it. Below is what it actually looks like when you put in your numbers."}
          </p>
        </div>

        {/* Tax Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              name: "The Case Acceptance Tax",
              stat: "$720K",
              unit: "per associate / year",
              desc: "More than half of diagnosed treatment walks out the door. Not because patients don\u2019t need care, because your associates lack the systems, confidence, and coaching to present it.",
              statSize: "text-4xl",
            },
            {
              name: "The Turnover Tax",
              stat: "Up to $250K",
              unit: "per associate lost",
              desc: "Recruitment. Downtime. Lost patient confidence. Lost momentum. The true cost of losing one associate is far more than their salary, and most groups lose 25%+ annually.",
              statSize: "text-4xl",
            },
            {
              name: "The Invisible Tax",
              stat: "Incalculable",
              unit: "",
              desc: "The costs nobody tracks. Patients who leave because of inconsistent care. Team members who burn out from the chaos. Referral networks that quietly dry up. Reputation erosion that compounds every month you wait.",
              statSize: "text-3xl",
            },
          ].map((card) => (
            <div
              key={card.name}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm"
            >
              <p className="text-sm font-bold text-slate-900 mb-2">{card.name}</p>
              <div className={`${card.statSize} font-extrabold text-slate-900 mb-1`}>{card.stat}</div>
              {card.unit && <p className="text-sm text-slate-500 mb-4">{card.unit}</p>}
              {!card.unit && <div className="mb-4" />}
              <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA to scroll to calculator */}
        <div className="text-center mb-10">
          <button
            onClick={scrollToCalculator}
            className="bg-slate-900 text-white rounded-xl px-8 py-4 font-semibold text-base hover:bg-slate-800 transition-colors"
          >
            Calculate Your Mediocrity Tax
          </button>
          <p className="text-sm text-slate-500 mt-3">
            Put in your numbers. See what this is actually costing your organization.
          </p>
        </div>

        {/* Calculator */}
        <div ref={calculatorRef} className="bg-white rounded-2xl p-7 md:p-10 border border-slate-200 shadow-sm">
          {/* Section: Your Team */}
          <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-6 pb-3 border-b border-slate-100">
            Your Team
          </p>

          <CalcSlider
            label="Total Number of Associates"
            value={totalAssociates}
            onChange={setTotalAssociates}
            min={1} max={80} step={1}
          />
          <CalcSlider
            label="Above-Average Producers"
            sublabel="Associates performing above your expectations"
            value={aboveAvgCount}
            onChange={(v) => setAboveAvgCount(Math.min(v, totalAssociates))}
            min={0} max={totalAssociates} step={1}
          />
          <CalcSlider
            label="Their Avg Monthly Production"
            value={aboveAvgProd}
            onChange={setAboveAvgProd}
            min={80} max={300} step={5}
            format={(v) => `$${v}K`}
          />

          {/* Below-average info chip */}
          <div className="bg-slate-50 rounded-xl px-5 py-3.5 mb-6 flex items-center gap-3">
            <span className="text-sm text-slate-500">
              <strong className="text-slate-900">{belowAvgCount} average-to-below-average</strong> producers remaining
            </span>
          </div>

          <CalcSlider
            label="Below-Average Avg Monthly Production"
            sublabel="What your average-to-below-average producers are doing"
            value={belowAvgProd}
            onChange={setBelowAvgProd}
            min={20} max={120} step={5}
            format={(v) => `$${v}K`}
          />

          {/* Section: Retention */}
          <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-6 mt-4 pb-3 border-b border-slate-100">
            Retention
          </p>

          <CalcSlider
            label="Annual Turnover Rate"
            value={turnoverRate}
            onChange={setTurnoverRate}
            min={0} max={60} step={5}
            suffix="%"
          />

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-teal-500 text-white font-semibold text-base rounded-xl hover:bg-teal-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25 transition-all mt-2"
          >
            {"Show Me What I\u2019m Losing \u2192"}
          </button>
        </div>

        {/* RESULTS */}
        {showResults && (
          <div
            ref={resultsRef}
            className="mt-8 transition-all duration-600 ease-out"
            style={{
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? "translateY(0)" : "translateY(24px)",
            }}
          >
            {/* Total 5-Year Cost */}
            <div className="bg-slate-900 rounded-2xl p-8 md:p-10 text-center mb-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-teal-400 mb-4">
                Your Estimated 5-Year Mediocrity Tax
              </p>
              <div className="flex items-baseline justify-center gap-4 flex-wrap">
                <span className="text-4xl md:text-5xl font-extrabold text-red-400 tracking-tight">
                  {formatShort(totalLow)}
                </span>
                <span className="text-lg text-slate-500 font-medium">to</span>
                <span className="text-4xl md:text-5xl font-extrabold text-red-400 tracking-tight">
                  {formatShort(totalHigh)}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                The total cost of not having systems over the next five years
              </p>
            </div>

            {/* Breakdown Cards */}
            <RangeBar
              label="5-Year Turnover Tax"
              lowValue={fiveYearTurnoverLow}
              highValue={fiveYearTurnoverHigh}
              note={`${annualTurnovers.toFixed(1)} associates lost per year \u00D7 $30K\u2013$250K per turnover event \u00D7 5 years. Includes recruitment, downtime, lost patient confidence, and momentum loss.`}
            />
            <RangeBar
              label={`5-Year Underperformance Tax \u2014 Below Average`}
              lowValue={belowAvgGap5Year * 0.3}
              highValue={belowAvgGap5Year}
              note={`${belowAvgCount} associates producing ${formatShort(belowAvgProd * 1000)}/mo could potentially double production with the right systems. Conservative estimate captures 30% of that gap.`}
            />
            <RangeBar
              label={`5-Year Growth Tax \u2014 Above Average`}
              lowValue={aboveAvgGap5Year * 0.5}
              highValue={aboveAvgGap5Year}
              note={`${aboveAvgCount} high performers at ${formatShort(aboveAvgProd * 1000)}/mo can add 15% production year over year with proper infrastructure. That compounds.`}
            />

            {/* How We Calculated This */}
            <div className="bg-white rounded-2xl p-7 mt-5 border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-4">
                How We Calculated This
              </p>
              <div className="text-sm text-slate-500 leading-relaxed space-y-3">
                <p>
                  <strong className="text-slate-900">Turnover costs</strong> range from $30K-$250K per associate depending on circumstances: recruitment fees, chair downtime, lost patient confidence, and team disruption.
                </p>
                <p>
                  <strong className="text-slate-900">Below-average producers</strong> can double their production in as little as two months using the right clinical systems and development infrastructure.
                </p>
                <p>
                  <strong className="text-slate-900">Above-average producers</strong> typically add 15% production year over year when supported by proper systems. That growth compounds, and without it, you're leaving significant production on the table every year.
                </p>
              </div>
            </div>

            {/* ROI Comparison */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 mt-5 text-center">
              <p className="text-sm text-white/60 mb-2">Compare that to the cost of solving it:</p>
              <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">$60K-$180K/year</p>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                Full Recipe + Rhythm installation. After 12 months, the system is yours forever.
              </p>
              <Link
                href="/book-call"
                className="inline-block bg-white text-slate-900 rounded-xl px-8 py-3.5 font-semibold text-sm hover:bg-slate-100 transition-colors shadow-lg"
              >
                Book a Fit Assessment Call
              </Link>
            </div>

            {/* Eric Quote */}
            <div className="mt-5 p-6 bg-white rounded-2xl border-l-[3px] border-teal-500 shadow-sm">
              <p className="text-base italic text-slate-900 leading-relaxed mb-3">
                {"\"This isn\u2019t a people problem. It\u2019s a systems problem. And the math on solving it is simple \u2014 it costs less than losing one associate.\""}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {"— Dr. Eric J. Roman, Founder"}
              </p>
            </div>
          </div>
        )}
      </AnimatedSection>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4: PRICING (dark bg)
// ═══════════════════════════════════════════════════════════════

function PricingSection() {
  return (
    <section className="bg-slate-900 py-24 px-6">
      <AnimatedSection className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            The Investment
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Three partnership levels. Every tier includes the full Recipe + Rhythm methodology: the Dentist Playbook, the 6 Clinical Systems, and the 90-Day Rhythm. What changes is scope, scale, and depth of support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNERSHIP_TIERS.map((t) => (
            <div
              key={t.tier}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-8"
            >
              <p className="text-lg font-bold text-white mb-1">{t.tier}</p>
              <p className="text-sm text-slate-400 mb-4">{t.profile}</p>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">{t.price}</span>
                <span className="text-base font-normal text-slate-500">{t.priceLabel}</span>
              </div>

              <div className="border-t border-slate-700 pt-6">
                {t.items.map((item) => {
                  const text = typeof item === "string" ? item : item.text
                  const isBold = typeof item !== "string" && item.bold
                  return (
                    <div key={text} className="flex items-start gap-3 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                      <span className={`text-sm ${isBold ? "font-bold text-white" : "text-slate-300"}`}>
                        {text}
                      </span>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/book-call"
                className="block w-full mt-6 bg-teal-500 text-white text-center rounded-xl py-3 font-semibold text-sm hover:bg-teal-600 transition-colors"
              >
                Book a Fit Assessment Call
              </Link>
            </div>
          ))}
        </div>

        {/* Shared note */}
        <p className="text-sm text-slate-500 text-center mt-8">
          All tiers: 12-month commitment, then month-to-month. 10% discount available for annual pay-in-full.
        </p>

        {/* Quote block */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mt-12 max-w-2xl mx-auto">
          <p className="text-lg italic text-slate-300 leading-relaxed mb-4">
            {"\"At $60k for an emerging group, Dental Associate Growth is less than what most practices lose in 1 or 2 months with a single underperforming associate. For our largest groups, the $180k investment is less than what I\u2019ve seen it occasionally cost just to replace ONE dentist. These systems are yours, installed inside your company forever. This isn\u2019t a subscription to dependency. It\u2019s an infrastructure investment with an immeasurable yield.\""}
          </p>
          <p className="text-sm font-semibold text-teal-400">{"— Dr. Eric J. Roman"}</p>
        </div>
      </AnimatedSection>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5: THE INVITATION (light bg)
// ═══════════════════════════════════════════════════════════════

function InvitationSection() {
  return (
    <section className="bg-white py-24 px-6">
      <AnimatedSection className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
          {"Let\u2019s Find Out Together"}
        </h2>

        <div className="space-y-6 text-base md:text-lg text-slate-600 leading-relaxed text-left">
          <p>
            We take on a limited number of partnerships because the work requires real attention. A fit call is how we figure out, together, whether this is the right time for your organization.
          </p>
          <p>
            {"If it is, we\u2019ll show you exactly what the first 90 days look like. If it isn\u2019t, we\u2019ll tell you what needs to be in place first, and point you to the tools that can help you get there."}
          </p>
          <p>
            {"Either way, you\u2019ll leave the conversation with clarity."}
          </p>
        </div>

        {/* Not ready section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Not ready for a conversation yet?
          </h3>
          <p className="text-base text-slate-500 mb-6">
            {"Start with the Readiness Diagnostic, see where your systems stand in 60 seconds. Then grab the free toolkit to start building on your own timeline."}
          </p>
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/diagnostic"
              className="text-teal-600 font-semibold hover:text-teal-700 underline-offset-4"
            >
              {"Take the Readiness Diagnostic \u2192"}
            </Link>
            <Link
              href="/diagnostic"
              className="text-slate-500 font-medium hover:text-slate-700 underline-offset-4"
            >
              {"Get the Free Toolkit \u2192"}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// DIAGNOSTIC MODAL (preserved)
// ═══════════════════════════════════════════════════════════════

function DiagnosticModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [contact, setContact] = useState({ name: "", email: "", org: "", role: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleClose = () => {
    onClose()
    setStep(0)
    setAnswers({})
    setContact({ name: "", email: "", org: "", role: "" })
    setIsComplete(false)
  }

  const handleSelect = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value })
    setTimeout(() => setStep(step + 1), 250)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await fetch("/api/diagnostic-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contact.name.split(" ")[0],
          lastName: contact.name.split(" ").slice(1).join(" "),
          email: contact.email,
          organization: contact.org,
          role: contact.role,
          ...answers,
          source: "partnership_readiness_diagnostic",
        }),
      })
      setIsComplete(true)
    } catch (error) {
      console.error("Submission failed:", error)
      setIsComplete(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-6 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-10 sm:p-11 max-w-[560px] w-full max-h-[85vh] overflow-y-auto relative">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-xl transition-colors bg-transparent border-none cursor-pointer"
        >
          {"\u2715"}
        </button>

        <div className="flex gap-1 mb-9">
          {DIAGNOSTIC_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-0.5 rounded-full transition-colors ${i <= step ? "bg-teal-500" : "bg-slate-200"}`}
            />
          ))}
        </div>

        {isComplete ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-5 text-2xl text-teal-500">
              {"\u2713"}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Diagnostic Complete</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
              {"We\u2019ll prepare a personalized readiness assessment and partnership recommendation. You\u2019ll receive it within 24 hours."}
            </p>
          </div>
        ) : step < DIAGNOSTIC_QUESTIONS.length ? (
          <>
            <p className="text-xs font-semibold tracking-widest uppercase text-teal-500 mb-4">
              Question {step + 1} of {DIAGNOSTIC_QUESTIONS.length}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-7 leading-snug">
              {DIAGNOSTIC_QUESTIONS[step].q}
            </h3>
            <div className="flex flex-col gap-2.5">
              {DIAGNOSTIC_QUESTIONS[step].opts.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(DIAGNOSTIC_QUESTIONS[step].k, opt)}
                  className={`w-full text-left px-5 py-4 rounded-xl text-[15px] border-2 transition-all cursor-pointer ${
                    answers[DIAGNOSTIC_QUESTIONS[step].k] === opt
                      ? "border-teal-500 bg-teal-50 text-teal-700 font-medium"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-400 hover:bg-teal-50/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-5 text-2xl text-teal-500">
              {"\u2713"}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Diagnostic Complete</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto mb-7">
              {"We\u2019ll prepare a personalized readiness assessment and partnership recommendation."}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 mb-7 text-left">
              <p className="text-xs font-semibold tracking-widest uppercase text-teal-500 mb-4">
                Where should we send your results?
              </p>
              <input
                type="text"
                placeholder="Full Name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 mb-2.5 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 mb-2.5 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              />
              <input
                type="text"
                placeholder="Organization Name"
                value={contact.org}
                onChange={(e) => setContact({ ...contact, org: e.target.value })}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 mb-2.5 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              />
              <input
                type="text"
                placeholder="Your Role / Title"
                value={contact.role}
                onChange={(e) => setContact({ ...contact, role: e.target.value })}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !contact.name || !contact.email}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-12 py-4 rounded-xl font-medium hover:bg-teal-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Get My Readiness Score \u2192"}
            </button>
            <p className="text-xs text-slate-400 mt-3">{"You\u2019ll receive your assessment within 24 hours."}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function PricingPage() {
  const [showDiag, setShowDiag] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navigation />
      <HeroSection />
      <PartnershipSection />
      <MediocityTaxSection />
      <PricingSection />
      <InvitationSection />
      <Footer hideToolkit />
      <DiagnosticModal open={showDiag} onClose={() => setShowDiag(false)} />
    </div>
  )
}
