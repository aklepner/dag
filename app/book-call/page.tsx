"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Layers, Clock, Building2, ChevronRight, Calendar, CheckCircle2, Phone, Mail, User } from "lucide-react"

/* ───────── types ───────── */
type Screen =
  | "welcome"
  | "stage"
  | "ericStage"
  | "role"
  | "associates"
  | "ericAssociates"
  | "challenge"
  | "ericChallenge"
  | "contact"
  | "booking"

interface Answers {
  stage: string
  role: string
  associates: string
  challenge: string
}

interface Contact {
  firstName: string
  lastName: string
  email: string
  phone: string
}

/* ───────── constants ───────── */
const screenOrder: Screen[] = [
  "welcome",
  "stage",
  "ericStage",
  "role",
  "associates",
  "ericAssociates",
  "challenge",
  "ericChallenge",
  "contact",
  "booking",
]

const stages = [
  {
    value: "foundation",
    label: "Foundation Building",
    badge: "1-4 Locations",
    icon: <Layers className="w-6 h-6" />,
    desc: "Building systems before growth",
  },
  {
    value: "systems",
    label: "Systems Design",
    badge: "5-15 Locations",
    icon: <Clock className="w-6 h-6" />,
    desc: "Installing frameworks to control the chaos",
  },
  {
    value: "scale",
    label: "Scale + Infrastructure",
    badge: "15+ Locations",
    icon: <Building2 className="w-6 h-6" />,
    desc: "Optimizing systems for enterprise performance",
  },
]

const roles = [
  { value: "owner", label: "Practice Owner / Solo Dentist" },
  { value: "dso-executive", label: "DSO Executive / VP" },
  { value: "regional-manager", label: "Regional / Operations Manager" },
  { value: "clinical-director", label: "Clinical Director" },
  { value: "other", label: "Other" },
]

const associateOptions = [
  { value: "1-3", label: "1-3 Associates" },
  { value: "4-10", label: "4-10 Associates" },
  { value: "11-25", label: "11-25 Associates" },
  { value: "25+", label: "25+ Associates" },
]

const challenges = [
  { value: "underperformance", label: "Associate underperformance" },
  { value: "turnover", label: "High turnover / retention issues" },
  { value: "scaling", label: "Scaling without losing quality" },
  { value: "systems", label: "No clinical systems in place" },
  { value: "accountability", label: "Lack of accountability" },
  { value: "profitability", label: "Declining profitability" },
]

const ericResponseMap: Record<string, Record<string, { headline: string; body: string }>> = {
  stage: {
    foundation: {
      headline: "Smart. Building systems before chaos hits is the highest-leverage move you can make.",
      body: "Most owners wait until they're drowning. You're getting ahead of it. Let me ask you a couple more questions so we can make the most of our time together.",
    },
    systems: {
      headline: "I've been exactly where you are. Growing faster than your systems can keep up is the most dangerous phase.",
      body: "The good news? This is solvable. A few more questions and I'll know exactly how to prepare for our call.",
    },
    scale: {
      headline: "At your scale, the problems are different. You need systems that show you what's actually happening.",
      body: "Most enterprise groups have systems that create the illusion of control. Let me ask a few more questions so we can get specific.",
    },
  },
  associates: {
    "1-3": {
      headline: "Perfect size to get this right from the start.",
      body: "With a smaller team, every system you install has outsized impact. We can move fast.",
    },
    "4-10": {
      headline: "This is where most groups start feeling the pain.",
      body: "You're past the point where you can manage everything personally, but not yet at the scale where systems run themselves. This is exactly what we solve.",
    },
    "11-25": {
      headline: "At this size, small improvements multiply fast.",
      body: "If each associate improves even 10%, the revenue impact across your group is massive. Let's talk about how to make that happen.",
    },
    "25+": {
      headline: "Enterprise-level associate management requires enterprise-level systems.",
      body: "At your scale, we're talking about building institutional infrastructure. The ROI conversation gets very interesting.",
    },
  },
  challenge: {
    underperformance: {
      headline: "This is the #1 problem we solve, and it's almost never a talent issue.",
      body: "I'm going to come to our call prepared with specific frameworks for your situation.",
    },
    turnover: {
      headline: "Turnover is a symptom. The root cause is almost always a systems gap.",
      body: "We've helped groups cut associate turnover by 60%+. I'll share exactly how on our call.",
    },
    scaling: {
      headline: "Growth without systems is just organized chaos.",
      body: "I'll bring our scaling framework to our conversation. It's the same one we used across $1B+ in coached revenue.",
    },
    systems: {
      headline: "Starting from scratch is actually an advantage. No bad habits to unlearn.",
      body: "We'll map out exactly which systems to install first for maximum impact. Let's get the details for our call.",
    },
    accountability: {
      headline: "You can't hold people accountable to standards that don't exist.",
      body: "Clear agreements + data + trust-building meetings = accountability that actually works. We'll cover the specifics.",
    },
    profitability: {
      headline: "Associate underperformance is usually the single biggest hidden profit drain.",
      body: "Most groups are leaving $40K-$100K/month on the table without realizing it. Let's dig into your numbers.",
    },
  },
}

/* ───────── progress ───────── */
function getProgress(screen: Screen): number {
  const idx = screenOrder.indexOf(screen)
  return Math.round(((idx + 1) / screenOrder.length) * 100)
}

/* ───────── sub-components ───────── */
function EricResponse({
  headline,
  body,
  onContinue,
}: {
  headline: string
  body: string
  onContinue: () => void
}) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
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
        <h2
          className={`text-2xl lg:text-3xl font-semibold text-white mb-6 leading-snug transition-all duration-500 delay-300 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {headline}
        </h2>

        {/* Body */}
        <p
          className={`text-lg text-slate-300 mb-10 leading-relaxed transition-all duration-500 delay-500 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {body}
        </p>

        {/* Continue */}
        <button
          onClick={onContinue}
          className={`inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-medium hover:bg-slate-100 transition-all duration-500 delay-700 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/* ───────── main ───────── */
export default function BookCallPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [answers, setAnswers] = useState<Answers>({ stage: "", role: "", associates: "", challenge: "" })
  const [contact, setContact] = useState<Contact>({ firstName: "", lastName: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const goToScreen = useCallback((screen: Screen) => {
    setCurrentScreen(screen)
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await fetch("/api/book-call-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          stage: answers.stage,
          role: answers.role,
          associates: answers.associates,
          challenge: answers.challenge,
        }),
      })
      goToScreen("booking")
    } catch (error) {
      console.error("Submission failed:", error)
      goToScreen("booking")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = getProgress(currentScreen)
  const currentIndex = screenOrder.indexOf(currentScreen)

  const canGoBack = currentIndex > 0 && currentScreen !== "booking"

  const goBack = () => {
    if (currentIndex > 0) {
      goToScreen(screenOrder[currentIndex - 1])
    }
  }

  /* ─── Welcome ─── */
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          {/* Logo */}
          <div className="mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dental-associate-growth-logo.png"
              alt="Dental Associate Growth"
              className="h-auto w-auto max-h-[60px] mx-auto"
            />
          </div>

          {/* Icon */}
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center mb-8">
            <Calendar className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
            Book Your Fit Assessment Call
          </h1>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            A few quick questions so Dr. Eric J. Roman can come prepared with specific recommendations for your situation.
          </p>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-10 text-left">
            <h3 className="font-semibold text-slate-900 mb-4">What to expect on your call:</h3>
            <ul className="space-y-3">
              {[
                "A personalized assessment of your associate performance gaps",
                "Specific recommendations based on your stage and challenges",
                "ROI projection for implementing clinical systems",
                "Clear next steps if we're a fit to work together",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => goToScreen("stage")}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-teal-500 hover:-translate-y-0.5 transition-all"
          >
            {"Let\u2019s Get Started"}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="mt-6 text-slate-500 text-sm">Takes about 60 seconds</p>
        </div>
      </div>
    )
  }

  /* ─── Eric Responses ─── */
  if (currentScreen === "ericStage") {
    const resp = ericResponseMap.stage[answers.stage] || ericResponseMap.stage.foundation
    return <EricResponse headline={resp.headline} body={resp.body} onContinue={() => goToScreen("role")} />
  }

  if (currentScreen === "ericAssociates") {
    const resp = ericResponseMap.associates[answers.associates] || ericResponseMap.associates["1-3"]
    return <EricResponse headline={resp.headline} body={resp.body} onContinue={() => goToScreen("challenge")} />
  }

  if (currentScreen === "ericChallenge") {
    const resp = ericResponseMap.challenge[answers.challenge] || ericResponseMap.challenge.underperformance
    return <EricResponse headline={resp.headline} body={resp.body} onContinue={() => goToScreen("contact")} />
  }

  /* ─── Confirmation Screen ─── */
  if (currentScreen === "booking") {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dental-associate-growth-logo.png"
              alt="Dental Associate Growth"
              className="h-auto w-auto max-h-[50px] mx-auto mb-8"
            />

            <div className="w-16 h-16 mx-auto rounded-full bg-teal-500/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-teal-500" />
            </div>

            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-3 tracking-tight">
              {"Thank You, "}{contact.firstName || "there"}!
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto">
              {"We\u2019ve received your information. A member of our team will reach out within 1-2 business days to schedule your Fit Assessment Call with Dr. Eric J. Roman."}
            </p>
          </div>

          {/* Summary Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Your Submission Summary</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {answers.stage && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Stage</p>
                    <p className="text-sm font-medium text-slate-900 capitalize">{answers.stage.replace("-", " ")}</p>
                  </div>
                </div>
              )}
              {answers.role && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Role</p>
                    <p className="text-sm font-medium text-slate-900">{roles.find(r => r.value === answers.role)?.label || answers.role}</p>
                  </div>
                </div>
              )}
              {answers.associates && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Associates</p>
                    <p className="text-sm font-medium text-slate-900">{answers.associates}</p>
                  </div>
                </div>
              )}
              {answers.challenge && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Top Challenge</p>
                    <p className="text-sm font-medium text-slate-900">{challenges.find(c => c.value === answers.challenge)?.label || answers.challenge}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-slate-900 rounded-2xl p-8 mb-8">
            <h3 className="text-lg font-semibold text-white mb-5 text-center">What Happens Next</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "1", title: "We Reach Out", desc: "Our team contacts you within 1-2 business days to find a time" },
                { step: "2", title: "We Prepare", desc: "Dr. Eric J. Roman reviews your answers and comes with specific insights" },
                { step: "3", title: "We Meet", desc: "A focused conversation about your gaps, your numbers, and your path forward" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-semibold text-sm mb-3">
                    {item.step}
                  </div>
                  <h4 className="text-white font-medium mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Take the Diagnostic CTA */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">While You Wait</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed max-w-md mx-auto">
              Take the free Dental Associate Growth Toolkit diagnostic. Dr. Eric J. Roman will review your scorecard before your call so he can come even more prepared.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-teal-500 hover:-translate-y-0.5 transition-all"
            >
              Get the Free Dental Associate Growth Toolkit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Back to home */}
          <div className="text-center mt-10">
            <Link href="/" className="text-slate-500 text-sm hover:text-slate-700 transition-colors">
              {"Back to Home"}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Question Screens ─── */
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Bar */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {canGoBack && (
              <button onClick={goBack} className="text-slate-400 hover:text-slate-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dental-associate-growth-logo.png"
              alt="Dental Associate Growth"
              className="h-auto w-auto max-h-[60px]"
            />
          </div>
          <span className="text-sm text-slate-500">{progress}%</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Stage Screen */}
        {currentScreen === "stage" && (
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-3 tracking-tight">
              Where are you in your growth journey?
            </h2>
            <p className="text-lg text-slate-600 mb-10">This helps Dr. Eric J. Roman prepare the right frameworks for your call.</p>
            <div className="space-y-4">
              {stages.map((stage) => (
                <button
                  key={stage.value}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, stage: stage.value }))
                    goToScreen("ericStage")
                  }}
                  className="w-full text-left p-6 bg-white border-2 border-slate-200 rounded-2xl hover:border-teal-500 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-teal-500/10 group-hover:text-teal-600 transition-colors">
                      {stage.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-slate-900">{stage.label}</span>
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{stage.badge}</span>
                      </div>
                      <p className="text-sm text-slate-500">{stage.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors mt-2" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Role Screen */}
        {currentScreen === "role" && (
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-3 tracking-tight">
              {"What\u2019s your role?"}
            </h2>
            <p className="text-lg text-slate-600 mb-10">So we know who we're speaking with.</p>
            <div className="space-y-3">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, role: role.value }))
                    goToScreen("associates")
                  }}
                  className="w-full text-left px-6 py-4 bg-white border-2 border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-lg transition-all flex items-center justify-between group"
                >
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">{role.label}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Associates Screen */}
        {currentScreen === "associates" && (
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-3 tracking-tight">
              How many associates are in your organization?
            </h2>
            <p className="text-lg text-slate-600 mb-10">This helps us understand the scale of opportunity.</p>
            <div className="grid grid-cols-2 gap-4">
              {associateOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, associates: opt.value }))
                    goToScreen("ericAssociates")
                  }}
                  className="p-6 bg-white border-2 border-slate-200 rounded-2xl hover:border-teal-500 hover:shadow-lg transition-all text-center group"
                >
                  <span className="text-xl font-semibold text-slate-900 block mb-1">{opt.value}</span>
                  <span className="text-sm text-slate-500">{opt.label.replace(opt.value + " ", "")}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Challenge Screen */}
        {currentScreen === "challenge" && (
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-3 tracking-tight">
              {"What\u2019s your biggest challenge right now?"}
            </h2>
            <p className="text-lg text-slate-600 mb-10">{"So Dr. Eric J. Roman can prepare specific recommendations."}</p>
            <div className="space-y-3">
              {challenges.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, challenge: c.value }))
                    goToScreen("ericChallenge")
                  }}
                  className="w-full text-left px-6 py-4 bg-white border-2 border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-lg transition-all flex items-center justify-between group"
                >
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">{c.label}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contact Screen */}
        {currentScreen === "contact" && (
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-3 tracking-tight">
              Last step - your contact details
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              {"So we can send you a calendar invite and call prep materials."}
            </p>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="firstName"
                      type="text"
                      value={contact.firstName}
                      onChange={(e) => setContact((c) => ({ ...c, firstName: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={contact.lastName}
                    onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="you@practice.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone <span className="text-slate-400">(optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="phone"
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!contact.firstName || !contact.email || isSubmitting}
              className="w-full mt-8 bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-teal-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Preparing your call..." : "Book My Fit Assessment Call"}
            </button>

            <p className="mt-4 text-slate-500 text-sm text-center">
              No spam. Your info is used only to prepare your call.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
