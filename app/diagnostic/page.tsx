"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Check, Loader2, Lock, Mail, ChevronRight, Download, Play, Calculator, FileText } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen =
  | "stage"
  | "stage-response"
  | "role"
  | "role-response"
  | "associates"
  | "associates-response"
  | "challenge"
  | "challenge-response"
  | "contact"
  | "results"

interface Answers {
  stage?: string
  role?: string
  associates?: string
  challenge?: string
}

interface Contact {
  firstName: string
  lastName: string
  email: string
}

// ─── Response Content ────────────────────────────────────────────────────────

const stageResponses: Record<string, { headline: string; body: string }> = {
  foundation: {
    headline: "Smart move thinking about this now.",
    body: "Most wait until it's painful. You're building the foundation before the chaos hits, that's rare. Let's make sure you're building it right.",
  },
  systems: {
    headline: "You're in the danger zone.",
    body: "Growing faster than your infrastructure can support. We see this pattern constantly, it's exactly why we built the 6 Core Systems. Let's find what's breaking.",
  },
  scale: {
    headline: "At your scale, small gaps create massive losses.",
    body: "You don't need another band-aid. You need to find what's actually broken and fix it systematically. The scorecard will surface the truth.",
  },
}

const roleResponses: Record<string, { headline: string; body: string }> = {
  dso_executive: {
    headline: "You set the strategy.",
    body: "But without systems, your team can't execute. The gap between your vision and their reality? That's a systems problem. Let's find it.",
  },
  clinical_director: {
    headline: "You're the linchpin.",
    body: "When you don't have systems, you become the bottleneck. Every fire comes to you. Every question lands on your desk. Let's find what's missing.",
  },
  practice_owner: {
    headline: "You wear every hat.",
    body: "Which means you need systems that work without you. If it breaks when you're not looking, it's not a system, it's just you. Let's fix that.",
  },
  other: {
    headline: "Your title doesn't matter.",
    body: "The systems do. Whether you're building them, running them, or living with them, the scorecard will show you what's working and what isn't.",
  },
}

const associatesResponses: Record<string, { headline: string; body: string }> = {
  "1-5": {
    headline: "Small team. Big opportunity.",
    body: "You're small enough to know everyone, big enough to need systems. This is where you build the foundation right, before the cracks become canyons.",
  },
  "6-15": {
    headline: "The messy middle.",
    body: "Too many to manage personally. Not enough to justify dedicated infrastructure. This is where systems matter most, and where most groups are flying blind.",
  },
  "16-30": {
    headline: "This is where heroics stop working.",
    body: "Most groups your size are held together by a few key people working too hard. That's not sustainable. Let's see if that's you.",
  },
  "31-50": {
    headline: "Every gap multiplies.",
    body: "At your scale, a small system failure costs 30x what it would at 5 associates. The upside? Small fixes create massive impact. Let's find them.",
  },
  "50+": {
    headline: "You need systems that surface truth.",
    body: "Not systems that hide problems. At your scale, by the time you see an issue, it's been festering for months. The scorecard shows you what's actually happening.",
  },
}

const challengeResponses: Record<string, { headline: string; body: string }> = {
  turnover: {
    headline: "Turnover is the symptom. Not the cause.",
    body: "People don't leave because they're 'not a fit.' They leave because something in the system failed them, usually long before they decided to go. Let's find it.",
  },
  underperforming: {
    headline: "It's almost never a talent problem.",
    body: "When capable people underperform, it's because the system around them isn't working. Different inputs, same outputs. Let's find which system is failing them.",
  },
  no_system: {
    headline: "Acknowledging it is the first step.",
    body: "Most groups have 'a way they do things,' but not a system. There's a big difference. One scales. One breaks. The scorecard will show you exactly what you need to build.",
  },
  inconsistent: {
    headline: "That inconsistency is a fingerprint.",
    body: "When some associates thrive and others struggle in the same environment, that tells us exactly where to look. The system is working for some and failing others. Let's find why.",
  },
  scaling: {
    headline: "Growth breaks everything.",
    body: "Everything that wasn't built to scale, anyway. What got you here won't get you there. The scorecard will show you what needs to be rebuilt, before it breaks completely.",
  },
}

// ─── Label Helpers ───────────────────────────────────────────────────────────

const stageLabels: Record<string, string> = {
  foundation: "Foundation Building (1-4 locations)",
  systems: "Systems Design (5-15 locations)",
  scale: "Scale + Infrastructure (15+ locations)",
}

const roleLabels: Record<string, string> = {
  dso_executive: "DSO Executive / CEO, COO, VP Ops",
  clinical_director: "Clinical Director / Chief Clinical Officer",
  practice_owner: "Practice Owner / Managing Partner",
  other: "Other",
}

const challengeLabels: Record<string, string> = {
  turnover: "High associate turnover",
  underperforming: "Underperforming associates",
  no_system: "No clinical development system",
  inconsistent: "Inconsistent production",
  scaling: "Scaling without losing quality",
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function DiagnosticPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("stage")
  const [answers, setAnswers] = useState<Answers>({})
  const [contact, setContact] = useState<Contact>({ firstName: "", lastName: "", email: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const screenOrder: Screen[] = [
    "stage", "stage-response",
    "role", "role-response",
    "associates", "associates-response",
    "challenge", "challenge-response",
    "contact", "results",
  ]

  const questionScreens: Screen[] = ["stage", "role", "associates", "challenge", "contact"]
  const currentQuestionIndex = questionScreens.indexOf(currentScreen)
  const progress = currentScreen === "results" ? 100 : Math.max(
    ((screenOrder.indexOf(currentScreen) + 1) / (screenOrder.length - 1)) * 100,
    10
  )

  const goToScreen = (screen: Screen) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentScreen(screen)
      setIsAnimating(false)
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: "instant" })
      }
      window.scrollTo({ top: 0, behavior: "instant" })
    }, 300)
  }

  const handleStageSelect = (stage: string) => {
    setAnswers({ ...answers, stage })
    setTimeout(() => goToScreen("stage-response"), 200)
  }

  const handleRoleSelect = (role: string) => {
    setAnswers({ ...answers, role })
    setTimeout(() => goToScreen("role-response"), 200)
  }

  const handleAssociatesSelect = (associates: string) => {
    setAnswers({ ...answers, associates })
    setTimeout(() => goToScreen("associates-response"), 200)
  }

  const handleChallengeSelect = (challenge: string) => {
    setAnswers({ ...answers, challenge })
    setTimeout(() => goToScreen("challenge-response"), 200)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await fetch("/api/diagnostic-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          stage: answers.stage,
          role: answers.role,
          associates: answers.associates,
          challenge: answers.challenge,
        }),
      })
      goToScreen("results")
    } catch (error) {
      console.error("Submission failed:", error)
      goToScreen("results")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isContactValid = contact.firstName.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)

  if (currentScreen === "results") {
    return <ResultsScreen answers={answers} contact={contact} />
  }

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Content */}
      <div className={`flex-1 transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
        {currentScreen === "stage" && <StageScreen onSelect={handleStageSelect} selected={answers.stage} />}
        {currentScreen === "stage-response" && (
          <ResponseScreen
            response={stageResponses[answers.stage || "foundation"]}
            onContinue={() => goToScreen("role")}
          />
        )}
        {currentScreen === "role" && <RoleScreen onSelect={handleRoleSelect} selected={answers.role} />}
        {currentScreen === "role-response" && (
          <ResponseScreen
            response={roleResponses[answers.role || "other"]}
            onContinue={() => goToScreen("associates")}
          />
        )}
        {currentScreen === "associates" && (
          <AssociatesScreen onSelect={handleAssociatesSelect} selected={answers.associates} />
        )}
        {currentScreen === "associates-response" && (
          <ResponseScreen
            response={associatesResponses[answers.associates || "1-5"]}
            onContinue={() => goToScreen("challenge")}
          />
        )}
        {currentScreen === "challenge" && (
          <ChallengeScreen onSelect={handleChallengeSelect} selected={answers.challenge} />
        )}
        {currentScreen === "challenge-response" && (
          <ResponseScreen
            response={challengeResponses[answers.challenge || "turnover"]}
            onContinue={() => goToScreen("contact")}
          />
        )}
        {currentScreen === "contact" && (
          <ContactScreen
            contact={contact}
            onUpdate={(field, value) => setContact({ ...contact, [field]: value })}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isValid={isContactValid}
          />
        )}
      </div>
    </div>
  )
}

// ─── Stage Selection Screen ──────────────────────────────────────────────────

function StageScreen({ onSelect, selected }: { onSelect: (s: string) => void; selected?: string }) {
  const stages = [
    {
      id: "foundation",
      badge: "1-4",
      badgeColor: "bg-teal-100 text-teal-600",
      title: "Foundation Building",
      locations: "(1-4 locations)",
      quote: "I want to scale, but I'm terrified of the associate nightmare everyone talks about.",
      bullets: ["Build systems before chaos hits", "Hire your first associates right", "Scale with confidence, not fear"],
    },
    {
      id: "systems",
      badge: "5-15",
      badgeColor: "bg-purple-100 text-purple-600",
      title: "Systems Design",
      locations: "(5-15 locations)",
      quote: "We're adding locations faster than we can build systems. It's unsustainable associate hell.",
      bullets: ["Stop the bleeding right now", "Install emergency systems fast", "Turn chaos into predictability"],
    },
    {
      id: "scale",
      badge: "15+",
      badgeColor: "bg-orange-100 text-orange-600",
      title: "Scale + Infrastructure",
      locations: "(15+ locations)",
      quote: "We have systems, but associates still underperform and leave. Something's fundamentally broken.",
      bullets: ["Diagnose what's actually broken", "Fix systemic inefficiencies", "Install systematic excellence"],
    },
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dental-associate-growth-logo.png"
            alt="Dental Associate Growth"
            className="h-auto w-auto max-h-[86px]"
          />
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
          {"What works at 3 locations breaks at 15."}
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
            {"What works at 15 never worked at 3."}
          </span>
        </h2>
        <p className="text-lg text-slate-500 mb-10">
          {"Select your stage to get a diagnostic calibrated to your challenges."}
        </p>

        {/* Cards */}
        <div className="space-y-4">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => onSelect(stage.id)}
              className={`relative w-full text-left p-6 rounded-xl border-2 transition-all hover:border-teal-500 hover:shadow-lg group ${
                selected === stage.id ? "border-teal-500 bg-teal-50/30" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${stage.badgeColor} flex items-center justify-center font-bold text-lg`}>
                  {stage.badge}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-slate-900">{stage.title}</h3>
                    <span className="text-sm text-slate-400">{stage.locations}</span>
                  </div>
                  <p className="text-sm italic text-slate-500 mb-3">{`"${stage.quote}"`}</p>
                  <ul className="space-y-1">
                    {stage.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 transition-colors flex-shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-400 text-center mt-8">
          {"Not sure? Pick the one that feels closest, the scorecard will help you confirm."}
        </p>
      </div>
    </div>
  )
}

// ─── Response Screen (Eric's Moment) ─────────────────────────────────────────

function ResponseScreen({ response, onContinue }: { response: { headline: string; body: string }; onContinue: () => void }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
      <div className={`max-w-2xl w-full text-center transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {/* Eric's Photo */}
        <div className={`mx-auto mb-6 transition-all duration-500 delay-100 ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-purple-500 p-[3px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/eric-roman.png"
              alt="Dr. Eric J. Roman"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <p className="text-slate-400 text-sm mt-3">Dr. Eric J. Roman</p>
        </div>

        {/* Headline */}
        <h2 className={`text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight transition-all duration-500 delay-200 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {response.headline}
        </h2>

        {/* Body */}
        <p className={`text-xl text-slate-300 leading-relaxed mb-10 transition-all duration-500 delay-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {response.body}
        </p>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 hover:-translate-y-0.5 transition-all duration-500 delay-[400ms] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Role Screen ─────────────────────────────────────────────────────────────

function RoleScreen({ onSelect, selected }: { onSelect: (r: string) => void; selected?: string }) {
  const roles = [
    { id: "dso_executive", label: "DSO Executive / CEO, COO, VP Ops" },
    { id: "clinical_director", label: "Clinical Director / Chief Clinical Officer" },
    { id: "practice_owner", label: "Practice Owner / Managing Partner" },
    { id: "other", label: "Other" },
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full">
        {/* Eric's Insight */}
        <div className="mb-10">
          <p className="text-slate-500 italic text-lg leading-relaxed">
            {"\"Clinical Directors are the linchpin. CEOs set the vision. Owners wear every hat.\""}
          </p>
          <p className="text-slate-400 text-sm mt-2">{"— Dr. Eric J. Roman"}</p>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">{"What's your role?"}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelect(role.id)}
              className={`text-left p-5 rounded-xl border-2 transition-all hover:border-teal-500 hover:shadow-lg ${
                selected === role.id ? "border-teal-500 bg-teal-50/30" : "border-slate-200 bg-white"
              }`}
            >
              <span className="text-slate-900 font-semibold text-sm">{role.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Associates Screen ───────────────────────────────────────────────────────

function AssociatesScreen({ onSelect, selected }: { onSelect: (a: string) => void; selected?: string }) {
  const options = ["1-5", "6-15", "16-30", "31-50", "50+"]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full">
        <div className="mb-10">
          <p className="text-slate-500 italic text-lg leading-relaxed">
            {"\"The number changes everything. What works for 5 associates breaks completely at 20.\""}
          </p>
          <p className="text-slate-400 text-sm mt-2">{"— Dr. Eric J. Roman"}</p>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          {"How many associates are you responsible for?"}
        </h2>

        <div className="flex flex-wrap gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`px-8 py-4 rounded-full border-2 font-semibold transition-all hover:border-teal-500 ${
                selected === opt
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-slate-200 text-slate-700 bg-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Challenge Screen ────────────────────────────────────────────────────────

function ChallengeScreen({ onSelect, selected }: { onSelect: (c: string) => void; selected?: string }) {
  const challenges = [
    { id: "turnover", label: "High associate turnover", sub: "\"We keep losing good people\"" },
    { id: "underperforming", label: "Underperforming associates", sub: "\"They're not hitting their numbers\"" },
    { id: "no_system", label: "No clinical development system", sub: "\"We don't have a structured approach\"" },
    { id: "inconsistent", label: "Inconsistent production", sub: "\"Some are great, others are struggling\"" },
    { id: "scaling", label: "Scaling without losing quality", sub: "\"Growth is breaking what used to work\"" },
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full">
        <div className="mb-10">
          <p className="text-slate-500 italic text-lg leading-relaxed">
            {"\"Everyone thinks they know their problem. Usually, it's a symptom.\""}
          </p>
          <p className="text-slate-400 text-sm mt-2">{"— Dr. Eric J. Roman"}</p>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          {"What's the #1 challenge keeping you up at night?"}
        </h2>

        <div className="space-y-3">
          {challenges.map((ch) => (
            <button
              key={ch.id}
              onClick={() => onSelect(ch.id)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all hover:border-teal-500 hover:shadow-lg ${
                selected === ch.id ? "border-teal-500 bg-teal-50/30" : "border-slate-200 bg-white"
              }`}
            >
              <div className="font-semibold text-slate-900 mb-1">{ch.label}</div>
              <div className="text-sm text-slate-500 italic">{ch.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Contact Screen ──────────────────────────────────────────────────────────

function ContactScreen({
  contact,
  onUpdate,
  onSubmit,
  isSubmitting,
  isValid,
}: {
  contact: Contact
  onUpdate: (field: string, value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
  isValid: boolean
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full">
        {/* Completion Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-semibold mb-8">
          <Check className="w-4 h-4" />
          Your toolkit is ready
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          Where should we send it?
        </h2>
        <p className="text-slate-500 text-lg mb-8">
          Get instant access to the 6 Core Systems Toolkit.
        </p>

        <div className="space-y-5">
          <div>
            <input
              type="text"
              value={contact.firstName}
              onChange={(e) => onUpdate("firstName", e.target.value)}
              placeholder="First Name"
              className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-slate-900 placeholder:text-slate-400"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={contact.lastName}
              onChange={(e) => onUpdate("lastName", e.target.value)}
              placeholder="Last Name"
              className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => onUpdate("email", e.target.value)}
              placeholder="Work Email"
              className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-slate-900 placeholder:text-slate-400"
              required
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </span>
            ) : (
              "Get the Free Dental Associate Growth Toolkit \u2192"
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            No spam, ever
          </span>
          <span className="inline-flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            Instant access
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Results Screen ──────────────────────────────────────────────────────────

function ResultsScreen({ answers, contact }: { answers: Answers; contact: Contact }) {
  return (
    <div className="min-h-screen">
      {/* Dark Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold mb-6">
            <Check className="w-4 h-4" />
            {"You're in"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            {contact.firstName}, your toolkit is ready.
          </h1>
          <p className="text-lg text-slate-300">
            Everything you need to diagnose your system gaps.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        {/* Summary Card */}
        <div className="bg-white rounded-xl border-2 border-slate-200 border-l-4 border-l-teal-500 p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-5">Based on what you shared:</h3>
          <div className="space-y-3 text-slate-700">
            <div className="flex items-center gap-3">
              <span className="text-lg">{"📍"}</span>
              <span><span className="font-medium">Stage:</span> {stageLabels[answers.stage || ""] || answers.stage}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">{"👤"}</span>
              <span><span className="font-medium">Role:</span> {roleLabels[answers.role || ""] || answers.role}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">{"👥"}</span>
              <span><span className="font-medium">Team:</span> {answers.associates} associates</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">{"🎯"}</span>
              <span><span className="font-medium">Challenge:</span> {challengeLabels[answers.challenge || ""] || answers.challenge}</span>
            </div>
          </div>
          <p className="mt-6 text-sm italic text-slate-500">
            {"Organizations at your stage typically score 26-40 on the 6 Core Systems Scorecard. Let's see where you land."}
          </p>
        </div>

        {/* Toolkit */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Toolkit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-teal-500 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-teal-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">6 Core Systems Scorecard</h4>
              <p className="text-sm text-slate-500 mb-4">Rate your systems and find the gaps</p>
              <a
                href="/downloads/DAG_6_Core_Systems_Assessment_v2.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 opacity-75">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Framework Guide</h4>
              <p className="text-sm text-slate-500 mb-4">The complete system overview</p>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-200 text-slate-600 rounded-lg text-sm font-medium cursor-default">
                <Mail className="w-4 h-4" />
                Check Your Inbox - Launching in March
              </span>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 opacity-75">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <Play className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">{"Dr. Eric J. Roman's Video Walkthrough"}</h4>
              <p className="text-sm text-slate-500 mb-4">10-min deep dive into the framework</p>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-200 text-slate-600 rounded-lg text-sm font-medium cursor-default">
                <Mail className="w-4 h-4" />
                Check Your Inbox - Launching in March
              </span>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 opacity-75">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                <Calculator className="w-5 h-5 text-teal-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Production Benchmarks</h4>
              <p className="text-sm text-slate-500 mb-4">See where you stand against top performers</p>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-200 text-slate-600 rounded-lg text-sm font-medium cursor-default">
                <Mail className="w-4 h-4" />
                Check Your Inbox - Launching in March
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-slate-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">{"Here's what to do next:"}</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Download & Complete the Scorecard</h4>
                <p className="text-slate-600 text-sm">Rate each of your 6 core systems honestly. Takes about 15 minutes.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">{"Watch Dr. Eric J. Roman's Walkthrough"}</h4>
                <p className="text-slate-600 text-sm">{"He'll explain what each score means and where the biggest ROI opportunities are."}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Bring Your Scorecard to a Fit Assessment Call</h4>
                <p className="text-slate-600 text-sm">{"We'll review your results together and map out your 90-day action plan."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Want to walk through your results?</h3>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Bring your completed scorecard to a Fit Assessment Call. {"We'll"} review your scores, identify the highest-impact fixes, and map your 90-day plan together.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Book a Fit Assessment Call
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-400">
            <span>15 minutes</span>
            <span>Bring your scorecard</span>
            <span>No pitch</span>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-slate-400 pb-8">
          {"We've also sent everything to "}{contact.email}
        </p>
      </div>
    </div>
  )
}
