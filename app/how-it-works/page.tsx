"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Users,
  Clock,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  Plus,
} from "lucide-react"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"

/* ─── Data ─── */
const WHO_CARDS = [
  {
    num: "01",
    color: "text-teal-500",
    title: "DSO Executives",
    desc: "You need same-store growth and your associates aren't delivering it. This is the system that installs the infrastructure to change that.",
  },
  {
    num: "02",
    color: "text-purple-500",
    title: "Clinical Directors",
    desc: "You became a leader because you were a great dentist. Nobody taught you how to develop 40 others. Here's the exact recipe.",
  },
  {
    num: "03",
    color: "text-pink-500",
    title: "Growth-Stage Owners",
    desc: "You want to get out of the chair. Build the system now, before growing pains become growth killers.",
  },
]

const MASTERY_DAYS = [
  { day: 1, name: "Clear Agreement System", highlight: false },
  { day: 2, name: "KPI + Performance", highlight: false },
  { day: 3, name: "T.A.P. System", highlight: true },
  { day: 4, name: "Onboarding + Training", highlight: true },
  { day: 5, name: "Recruitment System", highlight: false },
  { day: 6, name: "Clinical Leader System", highlight: false },
]

const TOOLKITS = [
  { num: "01", name: "Mindset" },
  { num: "02", name: "PowerPass" },
  { num: "03", name: "Prep for the Day" },
  { num: "04", name: "Patient-Centered Connection" },
  { num: "05", name: "Prioritizing Exams" },
  { num: "06", name: "Same-Day Treatment" },
  { num: "07", name: "Team Alignment Checkout" },
  { num: "08", name: "Data Must Be Your Friend" },
]

const FAQ_ITEMS = [
  {
    q: "We've tried coaching before and it didn't work. How is this different?",
    a: "Most coaching is accountability without infrastructure. It's like grading homework when there's no textbook. You can't hold people accountable to standards that don't exist. We build the 6 Clinical Systems first — the infrastructure — then the Dentist Growth Playbook gives associates the recipe. That's why it works when coaching alone doesn't.",
  },
  {
    q: "Our associates are different. They won't engage.",
    a: "Every group says that. Then they see associates responding to structure for the first time. The problem isn't your associates — it's that they've never had a system to engage with. When you give people clear agreements, real KPIs, and a development pathway, they engage. The ones who don't? You find out fast. That's information, not failure.",
  },
  {
    q: "I don't have time for another initiative.",
    a: "That's the whole point. We designed this for busy operators. One day per month from your leadership team, then short touchpoints in between. You're already spending hours firefighting associate problems. We're replacing random firefighting with one structured rhythm that prevents those fires.",
  },
  {
    q: "What if my associates leave after I invest in them?",
    a: "Associates don't leave because you invested in them. They leave because you didn't have systems. Our data shows dentists stay longer when they're in an environment with clear expectations, real development, and a leadership rhythm. The investment isn't the risk. The absence of it is.",
  },
  {
    q: "How long before we see results?",
    a: "Most groups see measurable changes within the first 90 days — clearer conversations with associates, improved engagement scores, and early performance data. The full system is installed and self-running by month 12. We build in 90-day checkpoints so you always know where you stand.",
  },
  {
    q: "Does this work with our existing software and PMS?",
    a: "Yes. We're methodology-agnostic on software. The Recipe + Rhythm framework is about human infrastructure — clear agreements, KPIs, training systems, hiring processes — not software features. It works regardless of your tech stack and often helps you evaluate whether your current tools are actually serving you.",
  },
]

const GLOSSARY = [
  {
    term: "Mastery Day",
    color: "text-teal-500",
    def: "A full-day working session, once per month. One clinical system built live. You leave with a finished tool.",
  },
  {
    term: "Mighty Networks",
    color: "text-purple-500",
    def: "Where your associate dentists access toolkit videos and community. Separate from your leadership community by design.",
  },
  {
    term: "The Choice",
    color: "text-pink-500",
    def: "Every 90 days, each doctor decides: Growth Track or Maintain Track. Neither is failure.",
  },
  {
    term: "Sprint",
    color: "text-amber-500",
    def: "A focused 30-day window between Mastery Days. One thing installed completely.",
  },
  {
    term: "Trust Score",
    color: "text-teal-500",
    def: "An anonymous quarterly metric from your doctors. A leading indicator of culture health, not a report card.",
  },
  {
    term: "IGP",
    color: "text-cyan-500",
    def: "Individual Growth Plan. The personalized 90-day plan each doctor builds at their quarterly check-in.",
  },
  {
    term: "T.A.P.",
    color: "text-purple-500",
    def: "Trust, Accountability, Performance. The framework behind meaningful coaching conversations. Built in Mastery Day 3.",
  },
  {
    term: "Foundation Sprint",
    color: "text-pink-500",
    def: "The first 8–13 weeks of the associate program. All 8 toolkits, self-paced, coach-supported.",
  },
]

/* ─── FAQ Accordion ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-4 p-5 font-semibold text-slate-900 hover:bg-slate-100/50 transition-colors"
      >
        <span className="text-sm leading-snug">{q}</span>
        <span
          className={`w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center flex-shrink-0 transition-transform ${open ? "rotate-45" : ""}`}
        >
          <Plus className="w-3.5 h-3.5 text-white" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[300px] pb-5 px-5" : "max-h-0"}`}
      >
        <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

/* ─── Animated Counter ─── */
function AnimatedCounter({
  target,
  suffix,
}: {
  target: number
  suffix: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let n = 0
          const step = target / 20
          const iv = setInterval(() => {
            n = Math.min(n + step, target)
            setCount(Math.round(n))
            if (n >= target) clearInterval(iv)
          }, 55)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div
      ref={ref}
      className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent"
    >
      {count}
      {suffix}
    </div>
  )
}

/* ─── Animated Phase Card ─── */
function AnimatedPhaseCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  )
}

/* ─── Main Page ─── */
export default function HowItWorksPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [spineProgress, setSpineProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      setScrollProgress((scrollTop / docHeight) * 100)

      // Calculate spine progress based on timeline section
      const timeline = timelineRef.current
      if (timeline) {
        const rect = timeline.getBoundingClientRect()
        const timelineStart = rect.top + window.scrollY - window.innerHeight * 0.5
        const timelineEnd = rect.bottom + window.scrollY - window.innerHeight * 0.8
        const progress = Math.max(0, Math.min(100, ((scrollTop - timelineStart) / (timelineEnd - timelineStart)) * 100))
        setSpineProgress(progress)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-[3px] z-50 bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative text-center pt-44 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-purple-500/5 to-transparent pointer-events-none" />

        <p className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent mb-6 animate-fade-in-up">
          Dental Associate Growth
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8 animate-fade-in-up animation-delay-200">
          Two tracks.
          <br />
          One{" "}
          <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
            shared destination.
          </span>
        </h1>

        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-5 py-2.5 text-sm font-semibold text-teal-600 mb-6 animate-fade-in-up animation-delay-300">
          <Clock className="w-4 h-4" />
          One day per month from your leadership team
        </div>

        <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed animate-fade-in-up animation-delay-500">
          A 12-month program running in parallel for your clinical leaders and
          your associate dentists. Each track makes the other work.
        </p>

        <div className="w-12 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500 mx-auto mt-10 rounded-full" />
      </section>

      {/* ═══ WHO THIS IS FOR ═══ */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Who this is for
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {WHO_CARDS.map((card) => (
            <div
              key={card.num}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <p className={`text-xs font-bold tracking-widest mb-2 ${card.color}`}>
                {card.num}
              </p>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                {card.title}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROGRAM TIMELINE ═══ */}
      <section ref={timelineRef} className="max-w-5xl mx-auto px-6 pb-20">
        {/* Track Headers */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 mb-6">
          <div className="bg-teal-50 border border-teal-200 rounded-xl md:rounded-t-xl md:rounded-b-none md:border-b-0 p-4 flex items-center gap-3 md:mr-10">
            <div className="w-2 h-2 rounded-full bg-teal-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Clinical Leadership Playbook
            </h3>
          </div>
          <div className="hidden md:flex items-center justify-center relative">
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-500" />
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl md:rounded-t-xl md:rounded-b-none md:border-b-0 p-4 flex items-center gap-3 md:ml-10">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Dentist Growth Playbook
            </h3>
          </div>
        </div>

        {/* Touchpoints */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0 mb-10">
          <div className="bg-teal-50 border border-teal-200 rounded-xl md:rounded-t-none md:rounded-b-xl md:border-t-0 p-4 md:mr-10">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-teal-500 mb-3">
              Monthly Touchpoints
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  Clinical Director Mastermind
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  Office Hours with Eric + Josey
                </span>
              </div>
            </div>
          </div>
          <div />
          <div className="bg-purple-50 border border-purple-200 rounded-xl md:rounded-t-none md:rounded-b-xl md:border-t-0 p-4 md:ml-10">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-purple-500 mb-3">
              Monthly Touchpoints
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  Group Coaching Call with Eric + Josey
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  Mighty Networks Community
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Phases */}
        <div className="relative">
          {/* Spine Background */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
          {/* Spine Progress Fill */}
          <div 
            className="hidden md:block absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-teal-500 via-purple-500 to-pink-500 -translate-x-1/2 transition-all duration-150 ease-out"
            style={{ height: `${spineProgress}%` }}
          />

          {/* PHASE 1: Onboarding */}
          <AnimatedPhaseCard delay={0}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-6 md:gap-0 mb-12">
            <div className="md:pr-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="h-0.5 w-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-4" />
                <p className="text-[10px] font-semibold tracking-widest uppercase text-teal-500 mb-1">
                  Clinical Leaders — Weeks 1–2
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Onboarding and Assessment
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Your clinical systems assessment maps exactly where you are so
                  we can design your custom sprint sequence instead of starting
                  from scratch.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                    Systems assessment completed before Call 2
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                    Custom roadmap presented on Call 2
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                    Mastery Day 1 date locked
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 text-[8px] font-bold text-white flex items-center justify-center">
                      IG
                    </span>
                    Implementation Guide — Sprint Owner
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center pt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
                NOW
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-2 text-center">
                Onboarding
              </p>
              <div className="flex-1 w-0.5 bg-slate-200 mt-2" />
            </div>

            <div className="md:pl-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4" />
                <p className="text-[10px] font-semibold tracking-widest uppercase text-purple-500 mb-1">
                  Associate Dentists — Weeks 1–2
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Associate Kickoff Call
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Eric and Josey introduce the program directly to your doctors.
                  Your introduction with conviction sets the tone for everything
                  that follows.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    Associate kickoff date confirmed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    Each doctor individually welcomed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    Doctors gain access to Mighty Networks
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] font-bold text-white flex items-center justify-center">
                      ER
                    </span>
                    Eric
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] font-bold text-white flex items-center justify-center">
                      JS
                    </span>
                    Josey
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] font-bold text-white flex items-center justify-center">
                      AC
                    </span>
                    Associate Coach
                  </span>
                </div>
              </div>
            </div>
          </div>
          </AnimatedPhaseCard>

          {/* Divider */}
          <div className="hidden md:block h-px bg-slate-200 my-4" />

          {/* PHASE 2: Mastery Days + Foundation Sprint */}
          <AnimatedPhaseCard delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-6 md:gap-0 mb-12">
            <div className="md:pr-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="h-0.5 w-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-4" />
                <p className="text-[10px] font-semibold tracking-widest uppercase text-teal-500 mb-1">
                  Clinical Leadership — Months 1–6
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  6 Mastery Days
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  One full-day workshop per month. One clinical system built and
                  installed per session.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {MASTERY_DAYS.map((day) => (
                    <div
                      key={day.day}
                      className={`rounded-xl p-2.5 border ${day.highlight ? "bg-teal-50 border-teal-200" : "bg-white border-slate-200"}`}
                    >
                      <p
                        className={`text-[9px] font-semibold tracking-widest uppercase mb-0.5 ${day.highlight ? "text-teal-500" : "text-slate-400"}`}
                      >
                        Day {day.day}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-900 leading-tight">
                        {day.name}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 text-[8px] font-bold text-white flex items-center justify-center">
                      IG
                    </span>
                    Implementation Guide — Sprint Owner
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center pt-6">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                1–6
                <br />
                MO
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-2 text-center">
                Parallel
                <br />
                Tracks
              </p>
              <div className="flex-1 w-0.5 bg-slate-200 mt-2" />
            </div>

            <div className="md:pl-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4" />
                <p className="text-[10px] font-semibold tracking-widest uppercase text-purple-500 mb-1">
                  Associate Dentists — Months 1–3
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Foundation Sprint — 8 Toolkits
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  All 8 toolkits available from Day 1. Self-paced, individually
                  coached. Targeted completion in 8–13 weeks.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TOOLKITS.map((toolkit) => (
                    <div
                      key={toolkit.num}
                      className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-start gap-2"
                    >
                      <span className="text-[10px] font-bold text-purple-500">
                        {toolkit.num}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-900 leading-tight">
                        {toolkit.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[8px] font-bold text-white flex items-center justify-center">
                      AC
                    </span>
                    Associate Coach
                  </span>
                </div>
              </div>
            </div>
          </div>
          </AnimatedPhaseCard>

          {/* Divider */}
          <div className="hidden md:block h-px bg-slate-200 my-4" />

          {/* PHASE 3: The Choice */}
          <AnimatedPhaseCard delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-6 md:gap-0 mb-12">
            <div className="md:pr-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4" />
                <p className="text-[10px] font-semibold tracking-widest uppercase text-pink-500 mb-1">
                  What you see — Around Month 3
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Completion Data + Reporting
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  You see who is growing, who is stuck, and who needs a direct
                  conversation. Before it becomes a departure.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                    Anonymous trust score from your doctors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                    Individual engagement reports
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                    Performance data tied to toolkit completion
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center pt-6">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                ~90
                <br />
                DAYS
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-2 text-center">
                The
                <br />
                Choice
              </p>
              <div className="flex-1 w-0.5 bg-slate-200 mt-2" />
            </div>

            <div className="md:pl-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4" />
                <p className="text-[10px] font-semibold tracking-widest uppercase text-pink-500 mb-1">
                  Every 90 Days
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Growth Track or Maintain Track?
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Each doctor decides for themselves. Neither path is wrong.
                  Both give you data about your team.
                </p>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-stretch">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <p className="text-[9px] font-semibold tracking-widest uppercase text-teal-600 mb-1">
                      Growth Track
                    </p>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {"I'm ready for more."}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Advanced content. Practice leadership, case acceptance,
                      clinical performance.
                    </p>
                  </div>
                  <div className="flex items-center justify-center px-2">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                      or
                    </span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-[9px] font-semibold tracking-widest uppercase text-amber-600 mb-1">
                      Maintain Track
                    </p>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      I need to consolidate.
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      A pause, not a stop. Every 90 days, the choice is made
                      again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </AnimatedPhaseCard>

          {/* Divider */}
          <div className="hidden md:block h-px bg-slate-200 my-4" />

          {/* PHASE 4: Audit + Refinement */}
          <AnimatedPhaseCard delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-6 md:gap-0 mb-12">
            <div className="md:pr-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="h-0.5 w-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mb-4" />
                <p className="text-[10px] font-semibold tracking-widest uppercase text-teal-500 mb-1">
                  Clinical Leaders — Months 7–12
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Audit and Refinement
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Months 7 through 12 test what was built in the first six.
                  Every system audited in real conditions. By month 12, it runs
                  without us.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-600">
                    Quarterly planning
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-600">
                    Systems audit
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
                    Trust Score
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
                    Career pathway
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center pt-6">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                7–12
                <br />
                MO
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-2 text-center">
                Quarterly
                <br />
                Rhythm
              </p>
              <div className="flex-1 w-0.5 bg-slate-200 mt-2" />
            </div>

            <div className="md:pl-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4" />
                <p className="text-[10px] font-semibold tracking-widest uppercase text-purple-500 mb-1">
                  Associates — Ongoing
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  90-Day Check-In Cycle
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Every 90 days: reflection on performance, The Choice made
                  again, individual growth plans updated.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-600">
                    IGP Growth Plans
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-600">
                    Quarterly reviews
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
                    4Ps framework
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 text-pink-600">
                    Trust Score
                  </span>
                </div>
              </div>
            </div>
          </div>
          </AnimatedPhaseCard>

          {/* Divider */}
          <div className="hidden md:block h-px bg-slate-200 my-4" />

          {/* PHASE 5: Destination */}
          <AnimatedPhaseCard delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-6 md:gap-0">
            <div className="md:pr-8">
              <div className="relative bg-slate-900 rounded-2xl p-8 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 opacity-50" />
                <div className="absolute inset-[2px] rounded-2xl bg-slate-900" />
                <div className="relative">
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 mb-2">
                    Month 12
                  </p>
                  <AnimatedCounter target={6} suffix=" systems" />
                  <h3 className="text-lg font-bold text-white mt-2 mb-2">
                    Systems that run without you.
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Built with you. Owned by you. Not dependent on us to
                    maintain.
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center pt-8">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                DONE
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-2 text-center">
                Yours
                <br />
                Forever
              </p>
            </div>

            <div className="md:pl-8">
              <div className="relative bg-slate-900 rounded-2xl p-8 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-50" />
                <div className="absolute inset-[2px] rounded-2xl bg-slate-900" />
                <div className="relative">
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 mb-2">
                    Always On
                  </p>
                  <AnimatedCounter target={8} suffix=" toolkits" />
                  <h3 className="text-lg font-bold text-white mt-2 mb-2">
                    A self-renewing associate culture.
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    New doctors enter the same system. The environment does the
                    development.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </AnimatedPhaseCard>
        </div>

        {/* Cost Callout */}
        <div className="text-center py-10">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-7 py-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
              1 day
            </span>
            <span className="text-sm font-semibold text-slate-900">
              per month from your leadership team.
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-3">
            Everything else runs through your Implementation Guide, Associate
            Coach, and the system itself.
          </p>
        </div>

        {/* Bridge */}
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 flex gap-5">
          <div className="w-1 bg-gradient-to-b from-teal-500 via-purple-500 to-pink-500 rounded-full flex-shrink-0" />
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 mb-2">
              Why they connect
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              The Clinical Leadership Playbook builds the environment that makes
              the Dentist Growth Playbook work. Clear agreements, real KPIs, and
              a trust cadence from your clinical leaders are what turn passive
              associates into active ones. One track without the other is half a
              system.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="max-w-5xl mx-auto px-6 pb-16 border-t border-slate-200 pt-12">
        <p className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent mb-6">
          Common Questions
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ═══ GLOSSARY ═══ */}
      <section className="max-w-5xl mx-auto px-6 pb-16 border-t border-slate-200 pt-12">
        <p className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent mb-6">
          Quick Reference
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {GLOSSARY.map((item, i) => (
            <div key={i}>
              <p className={`text-sm font-bold ${item.color} mb-1`}>
                {item.term}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.def}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CLOSING CTA ═══ */}
      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <p className="text-base italic text-slate-400 mb-8 leading-relaxed">
          {
            '"Associate problems aren\'t people problems. They\'re systems problems. This is what implementation actually looks like."'
          }
        </p>
        <Link
          href="/book-call"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all"
        >
          Talk to Our Team
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <Footer hideToolkit />
    </main>
  )
}
