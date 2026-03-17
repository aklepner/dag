"use client"

import { useState, useRef } from "react"

/* ── Option labels for Q7/Q8 gap notice ─────────────────────── */
const timeLabels: Record<string, string> = {
  A: "Firefighting operational problems",
  B: "Managing individual performance issues",
  C: "Building systems and processes",
  D: "Recruiting and hiring",
  E: "A mix you don't fully control",
}

/* ── Q9 pick-one labels ──────────────────────────────────────── */
const q9Labels: Record<string, string> = {
  A: "My doctors are engaged, growing, and I'm not the one holding it together",
  B: "We have systems that run without me being the bottleneck for every decision",
  C: "Leadership can see the data — and the data shows real growth, not just activity",
  D: "I feel like a clinical leader — not just a problem-solver and fire-putter-outer",
  E: "The new hires we bring on actually succeed — we stop losing people to poor onboarding",
}

/* ── Q10 labels + echo text ──────────────────────────────────── */
const q10Data: Record<string, { label: string; echo: string }> = {
  A: {
    label: "The program has to feel driven by you — not self-directed by us",
    echo: "Noted. Every sprint comes with Abby at the wheel. We bring the agenda. You bring your team.",
  },
  B: {
    label: "The doctors actually have to engage — not just get enrolled",
    echo: "Doctor activation is Emily's primary job from Day 1. She'll be in your corner on this the entire way.",
  },
  C: {
    label: "It has to install into real operations — not stay theoretical",
    echo: "Every Mastery Day ends with something built — not just learned. That's the whole design.",
  },
  D: {
    label: "Leadership has to see the impact in the numbers — not just feel it",
    echo: "Measurement is built into the rhythm. Leadership will have data — not just impressions.",
  },
  E: {
    label: "The knowledge has to stay in the organization after the engagement ends",
    echo: "The whole system gets handed over. By month 12, it runs without us. That's the design.",
  },
}

/* ── Questions data ──────────────────────────────────────────── */
const questions = [
  {
    num: 1,
    section: "Section 1 — Systems Inventory",
    badge: "Training + Onboarding",
    stem: "When a new dentist joins your team — how would you describe the onboarding experience they get?",
    options: [
      { id: "A", text: "We have a structured onboarding process and it works consistently across locations" },
      { id: "B", text: "We have something in place but it's inconsistent — depends on the location or the person running it" },
      { id: "C", text: "We're mostly figuring it out as we go — there's no formal process yet" },
    ],
  },
  {
    num: 2,
    section: "Section 1 — Systems Inventory",
    badge: "Clear Agreements",
    stem: "How would you describe the expectations your dentists are working toward?",
    options: [
      { id: "A", text: "We have clear written expectations that every dentist understands and has agreed to" },
      { id: "B", text: "We have expectations but they're communicated inconsistently — some dentists know them, some don't" },
      { id: "C", text: "Expectations exist in conversation or in my head but we haven't formalized them yet" },
    ],
  },
  {
    num: 3,
    section: "Section 1 — Systems Inventory",
    badge: "KPIs + Metrics",
    stem: "How do your dentists know if they're performing well?",
    options: [
      { id: "A", text: "They have a defined scorecard — specific numbers they track regularly and own" },
      { id: "B", text: "They receive some data but it's not structured into a regular rhythm they own" },
      { id: "C", text: "Performance conversations happen reactively — usually when something's wrong" },
    ],
  },
  {
    num: 4,
    section: "Section 1 — Systems Inventory",
    badge: "Trust + Accountability",
    stem: "When you need to have a hard conversation with a dentist — how does that typically go?",
    options: [
      { id: "A", text: "We have a structure for it — I know when and how to approach it and the dentist expects it" },
      { id: "B", text: "I have the conversations but they're inconsistent — sometimes they land well, sometimes they don't" },
      { id: "C", text: "I avoid them longer than I should or they happen in a way I'm not proud of" },
    ],
  },
  {
    num: 5,
    section: "Section 1 — Systems Inventory",
    badge: "Always-On Hiring",
    stem: "How would you describe your current approach to finding and bringing in new dentists?",
    options: [
      { id: "A", text: "We have an active process running regardless of whether we have an open position" },
      { id: "B", text: "We recruit when we need someone — reactive but it works most of the time" },
      { id: "C", text: "We're usually behind — recruiting from a position of desperation more than we'd like" },
    ],
  },
  {
    num: 6,
    section: "Section 1 — Systems Inventory",
    badge: "Clinical Leadership Mastery",
    stem: "How prepared do you feel to develop and lead your clinical team?",
    options: [
      { id: "A", text: "I have a framework I work from — I know what good clinical leadership looks like and how to build toward it" },
      { id: "B", text: "I'm learning as I go — I have instincts but not a system" },
      { id: "C", text: "I was promoted or hired into this role and honestly nobody taught me how to do this part" },
    ],
  },
  {
    num: 7,
    section: "Section 2 — Where My Time Is Going",
    badge: null,
    stem: "In a typical week — where does most of your actual time go?",
    context: "Be honest about where the hours actually go — not where the calendar says they should.",
    options: [
      { id: "A", text: "Firefighting operational problems that shouldn't require my attention" },
      { id: "B", text: "Managing individual doctor performance issues one at a time" },
      { id: "C", text: "Building systems and processes that prevent problems from recurring" },
      { id: "D", text: "Recruiting and hiring — always trying to stay ahead of the next gap" },
      { id: "E", text: "A mix I don't fully control — I go where the urgency takes me" },
    ],
  },
  {
    num: 8,
    section: "Section 2 — Where My Time Is Going",
    badge: null,
    stem: "Where do you wish your time was going instead?",
    options: [
      { id: "A", text: "Firefighting operational problems that shouldn't require my attention" },
      { id: "B", text: "Managing individual doctor performance issues one at a time" },
      { id: "C", text: "Building systems and processes that prevent problems from recurring" },
      { id: "D", text: "Recruiting and hiring — always trying to stay ahead of the next gap" },
      { id: "E", text: "A mix I don't fully control — I go where the urgency takes me" },
    ],
  },
  {
    num: 9,
    section: "Section 3 — What Needs to Be True",
    badge: null,
    stem: "Twelve months from now — what would make this feel like it completely worked?",
    hint: "Pick one that fits — or write it in your own words. Either way, Josey reads it before Call 2.",
    options: [
      { id: "A", text: "My doctors are engaged, growing, and I'm not the one holding it together" },
      { id: "B", text: "We have systems that run without me being the bottleneck for every decision" },
      { id: "C", text: "Leadership can see the data — and the data shows real growth, not just activity" },
      { id: "D", text: "I feel like a clinical leader — not just a problem-solver and fire-putter-outer" },
      { id: "E", text: "The new hires we bring on actually succeed — we stop losing people to poor onboarding" },
    ],
  },
  {
    num: 10,
    section: "Section 3 — What Needs to Be True",
    badge: null,
    stem: "For this to feel completely worth it — what's the one thing we'd need to nail?",
    hint: "Be honest here. This is exactly the kind of thing we need to know.",
    options: [
      { id: "A", text: "The program has to feel driven by you — not self-directed by us" },
      { id: "B", text: "The doctors actually have to engage — not just get enrolled" },
      { id: "C", text: "It has to install into real operations — not stay theoretical" },
      { id: "D", text: "Leadership has to see the impact in the numbers — not just feel it" },
      { id: "E", text: "The knowledge has to stay in the organization after the engagement ends" },
    ],
  },
]

/* ── Section break data ──────────────────────────────────────── */
const sectionBreaks: Record<string, { eyebrow: string; title: string; desc: string; nextLabel: string }> = {
  s1: {
    eyebrow: "Section 1 of 3",
    title: "Systems Inventory",
    desc: "Six questions. One per Clinical System. Your answers help us understand where to focus and how to show up for you. Answer based on where things actually are, not where you want them to be.",
    nextLabel: "Start Section 1 →",
  },
  s2: {
    eyebrow: "Section 2 of 3",
    title: "Where My Time Is Going",
    desc: "Two questions. Same options. The gap between your answers is what Josey names out loud on Call 2. Be specific — this is not an aspirational exercise.",
    nextLabel: "Start Section 2 →",
  },
  s3: {
    eyebrow: "Section 3 of 3",
    title: "What Needs to Be True",
    desc: "Two final questions. These become the engagement's north star. Josey references your answer to Q9 on Mastery Day 6. Your answer to Q10 is the one thing Abby can't let fail.",
    nextLabel: "Last two questions →",
  },
}

/* ── Screen flow ─────────────────────────────────────────────── */
type Screen = "intro" | "demo" | "s1" | "s2" | "s3" | "done" | number

const screenFlow: Screen[] = ["intro", "demo", "s1", 1, 2, 3, 4, 5, 6, "s2", 7, 8, "s3", 9, 10, "done"]

function nextScreen(current: Screen): Screen {
  const idx = screenFlow.indexOf(current)
  return idx < screenFlow.length - 1 ? screenFlow[idx + 1] : current
}
function prevScreen(current: Screen): Screen {
  const idx = screenFlow.indexOf(current)
  return idx > 0 ? screenFlow[idx - 1] : current
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════ */

export default function CLPSurvey() {
  const [screen, setScreen] = useState<Screen>("intro")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [demo, setDemo] = useState({ name: "", email: "", role: "", tenure: "" })
  const [q9Mode, setQ9Mode] = useState<"pick" | "write">("pick")
  const [q9Open, setQ9Open] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const shellRef = useRef<HTMLDivElement>(null)

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  const goTo = (s: Screen) => { setScreen(s); scrollTop() }

  const demoValid = demo.name.trim() && demo.email.trim() && demo.role.trim() && demo.tenure

  const selectAnswer = (q: number, id: string) => {
    setAnswers((prev) => ({ ...prev, [`q${q}`]: id }))
  }

  const isQ9Answered = q9Mode === "pick" ? !!answers.q9 : q9Open.trim().length > 0

  /* ── Submit handler ───────────────────────────────── */
  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError("")
    try {
      const payload = {
        leaderName: demo.name.trim(),
        email: demo.email.trim(),
        role: demo.role.trim(),
        tenure: demo.tenure,
        q1: answers.q1 || "",
        q2: answers.q2 || "",
        q3: answers.q3 || "",
        q4: answers.q4 || "",
        q5: answers.q5 || "",
        q6: answers.q6 || "",
        q7: answers.q7 || "",
        q8: answers.q8 || "",
        q9: answers.q9 || "",
        q10: answers.q10 || "",
        q7_label: timeLabels[answers.q7] || "",
        q8_label: timeLabels[answers.q8] || "",
        q9_text: answers.q9 ? q9Labels[answers.q9] || "" : "",
        q9_open: q9Open.trim(),
        q10_label: answers.q10 ? q10Data[answers.q10]?.label || "" : "",
      }

      const res = await fetch("/api/clp-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Submission failed")
      }

      goTo("done")
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ── Render helpers ───────────────────────────────── */
  const showProgress = typeof screen === "number"
  const progressPct = typeof screen === "number" ? Math.round(((screen - 1) / 10) * 100) : 0

  return (
    <>
      <style>{clpStyles}</style>

      {/* ── BAND ── */}
      <div className="survey-band">
        <div className="band-inner">
          <div className="dag-mark">
            <div className="dag-dot" />
            <span className="dag-wordmark">Dental Associate Growth &middot; V4.0</span>
          </div>
          <div className="survey-eyebrow">Onboarding Baseline</div>
          <div className="survey-title">Your systems. <span>Honestly.</span></div>
          <div className="survey-sub">Clinical Leadership Playbook &middot; Pre-program systems inventory</div>
          <div className="track-pill">CLP &middot; Clinical Leader Track</div>
        </div>
      </div>

      {/* ── PROGRESS ── */}
      {showProgress && (
        <div className="progress-strip">
          <div className="progress-inner">
            <div className="progress-meta">
              <span>Question {screen} of 10</span>
              <span>{progressPct}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* ── SHELL ── */}
      <div className="shell" ref={shellRef}>
        {/* INTRO */}
        {screen === "intro" && (
          <div className="screen active">
            <div className="intro-card">
              <div className="intro-eyebrow">From Abby — before we begin</div>
              <div className="intro-body">
                <strong>This is not a test and it&apos;s not a formality.</strong><br /><br />
                Josey is going to use your answers directly on Call 2. Not as background context — as the agenda. She&apos;ll walk through exactly where your systems are, what the sequence looks like, and why we&apos;re starting where we&apos;re starting.<br /><br />
                That means the more honest you are here, the more useful that call becomes. There are no right answers. There are no grades. The only thing that matters is accuracy.
              </div>
              <div className="how-works">
                <div className="how-label">What Josey does with your answers</div>
                <div className="how-row"><div className="how-num">1</div><div className="how-text">Questions 1–6 help us understand where your systems are and where to focus when we show up.</div></div>
                <div className="how-row"><div className="how-num">2</div><div className="how-text">Questions 7 and 8 show Josey exactly where your time is going versus where you want it to go. She names that gap out loud on Call 2.</div></div>
                <div className="how-row"><div className="how-num">3</div><div className="how-text">Questions 9 and 10 become the engagement&apos;s north star — referenced every 90 days from here forward.</div></div>
              </div>
              <div className="intro-stats">
                <div className="intro-stat"><div className="intro-stat-num">10–12</div><div className="intro-stat-label">Minutes</div></div>
                <div className="intro-stat"><div className="intro-stat-num">10</div><div className="intro-stat-label">Questions</div></div>
                <div className="intro-stat"><div className="intro-stat-num">Josey</div><div className="intro-stat-label">Reviews before Call 2</div></div>
              </div>
            </div>
            <button className="btn-start" onClick={() => goTo("demo")}>Let&apos;s be honest about where things are →</button>
          </div>
        )}

        {/* DEMOGRAPHICS */}
        {screen === "demo" && (
          <div className="screen active">
            <div className="demo-card">
              <div className="demo-eyebrow">Before we dive in</div>
              <div className="demo-title">A few quick details about you.</div>
              <div className="demo-sub">This helps Josey and the team show up knowing who they&apos;re working with. Takes 60 seconds.</div>
              <div className="field-group">
                <div className="field-wrap">
                  <label className="field-label">Full Name <span className="field-required">*</span></label>
                  <input className="field-input" type="text" placeholder="First and last name" value={demo.name} onChange={(e) => setDemo({ ...demo, name: e.target.value })} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Email Address <span className="field-required">*</span></label>
                  <input className="field-input" type="email" placeholder="your@email.com" value={demo.email} onChange={(e) => setDemo({ ...demo, email: e.target.value })} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Your Role / Title <span className="field-required">*</span></label>
                  <input className="field-input" type="text" placeholder="e.g. Director of Operations, Clinical Director" value={demo.role} onChange={(e) => setDemo({ ...demo, role: e.target.value })} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">How long have you been with the company? <span className="field-required">*</span></label>
                  <select className={`field-select${!demo.tenure ? " placeholder" : ""}`} value={demo.tenure} onChange={(e) => setDemo({ ...demo, tenure: e.target.value })}>
                    <option value="" disabled>Select one</option>
                    <option value="Less than 6 months">Less than 6 months</option>
                    <option value="6–12 months">6–12 months</option>
                    <option value="1–2 years">1–2 years</option>
                    <option value="2–4 years">2–4 years</option>
                    <option value="4+ years">4+ years</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="nav-row">
              <button className="btn-back" onClick={() => goTo("intro")}>← Back</button>
              <button className="btn-next" disabled={!demoValid} onClick={() => goTo("s1")}>Continue →</button>
            </div>
          </div>
        )}

        {/* SECTION BREAKS */}
        {(screen === "s1" || screen === "s2" || screen === "s3") && (
          <div className="screen active">
            <div className="section-break">
              <div className="sb-eyebrow">{sectionBreaks[screen].eyebrow}</div>
              <div className="sb-title">{sectionBreaks[screen].title}</div>
              <div className="sb-desc">{sectionBreaks[screen].desc}</div>
            </div>
            <div className="nav-row">
              <button className="btn-back" onClick={() => goTo(prevScreen(screen))}>← Back</button>
              <button className="btn-next" onClick={() => goTo(nextScreen(screen))}>{sectionBreaks[screen].nextLabel}</button>
            </div>
          </div>
        )}

        {/* QUESTIONS 1-10 */}
        {typeof screen === "number" && (() => {
          const q = questions[screen - 1]
          const isQ9 = screen === 9
          const isQ10 = screen === 10
          const isQ8 = screen === 8
          const selected = answers[`q${screen}`]
          const canContinue = screen === 9 ? isQ9Answered : !!selected

          return (
            <div className="screen active">
              <div className="q-section-pill">{q.section}{q.badge && <span className="system-badge">{q.badge}</span>}</div>
              <div className="grad-bar" />
              <div className="q-num">Question {q.num} of 10</div>
              <div className="q-stem">{q.stem}</div>
              {q.context && <div className="q-context">{q.context}</div>}
              {q.hint && <div className="q-hint">{q.hint}</div>}

              {/* Q8 gap notice */}
              {isQ8 && answers.q7 && (
                <div className="gap-notice"><strong>You said your time is currently going to:</strong> {timeLabels[answers.q7]}</div>
              )}

              {/* Q9 tabs */}
              {isQ9 && (
                <div className="q9-tabs">
                  <button className={`q9-tab${q9Mode === "pick" ? " active" : ""}`} onClick={() => setQ9Mode("pick")}>Pick one</button>
                  <button className={`q9-tab${q9Mode === "write" ? " active" : ""}`} onClick={() => setQ9Mode("write")}>Write it yourself</button>
                </div>
              )}

              {/* Pick options (hide for Q9 write mode) */}
              {!(isQ9 && q9Mode === "write") && (
                <div className="options">
                  {q.options.map((opt) => (
                    <div key={opt.id} className={`opt${selected === opt.id ? " selected" : ""}`} onClick={() => selectAnswer(screen, opt.id)}>
                      <div className="opt-id">{opt.id}</div>
                      <div className="opt-content">
                        <div className="opt-text">{opt.text}</div>
                        {/* Q10 echo */}
                        {isQ10 && (
                          <div className={`echo-wrap${selected === opt.id ? " visible" : ""}`}>
                            <div className="echo">
                              <div className="echo-label">Abby&apos;s commitment</div>
                              <div className="echo-text">{q10Data[opt.id]?.echo}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="opt-check" />
                    </div>
                  ))}
                </div>
              )}

              {/* Q9 open text */}
              {isQ9 && q9Mode === "write" && (
                <div>
                  <textarea
                    className="open-ta"
                    placeholder="In your own words, what does success look like twelve months from now?"
                    rows={5}
                    value={q9Open}
                    onChange={(e) => setQ9Open(e.target.value)}
                  />
                  <div className="open-note">Josey reads this before Call 2. Be as specific as you want.</div>
                </div>
              )}

              {submitError && screen === 10 && (
                <div className="gap-notice" style={{ borderColor: "#ef4444", background: "rgba(239,68,68,.05)" }}>
                  <strong>Error:</strong> {submitError}
                </div>
              )}

              <div className="nav-row" style={isQ9 ? { marginTop: 20 } : undefined}>
                <button className="btn-back" onClick={() => goTo(prevScreen(screen))}>← Back</button>
                {screen === 10 ? (
                  <button className="btn-next" disabled={!canContinue || isSubmitting} onClick={handleSubmit}>
                    {isSubmitting ? "Submitting..." : "Submit →"}
                  </button>
                ) : (
                  <button className="btn-next" disabled={!canContinue} onClick={() => goTo(nextScreen(screen))}>Continue →</button>
                )}
              </div>
            </div>
          )
        })()}

        {/* DONE */}
        {screen === "done" && (
          <div className="screen active">
            <div className="ty-wrap">
              <div className="ty-icon">
                <svg viewBox="0 0 32 32" fill="none"><path d="M6 16l7 7L26 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="ty-title">Josey has <span>what she needs.</span></div>
              <div className="ty-bar" />
              <div className="ty-body">
                Abby will review your answers today and prepare for Call 2. Josey will walk you through exactly where we focus and why — using your own answers as the starting point.<br /><br />
                The recipe exists. Now we build it.
              </div>
              <div className="ty-next">Expect Josey&apos;s Call 2 prep summary within 24 hours</div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════════
   CSS — ported from the static HTML (scoped via class names)
   ════════════════════════════════════════════════════════════════ */
const clpStyles = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --navy:#0f172a;--navy-light:#1e293b;--slate:#334155;--mid:#64748b;--muted:#94a3b8;
  --cyan:#06b6d4;--purple:#8b5cf6;--pink:#ec4899;--white:#ffffff;--off-white:#f8fafc;
  --border:#e2e8f0;--grad-clp:linear-gradient(135deg,#8b5cf6,#ec4899);--grad-dag:linear-gradient(135deg,#06b6d4,#8b5cf6);
}
html,body{min-height:100%;background:var(--off-white);font-family:'Inter',system-ui,sans-serif;color:var(--slate);-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.7}
.survey-band{background:var(--navy);position:relative;overflow:hidden}
.survey-band::before{content:'';position:absolute;top:-60px;right:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(236,72,153,.12),transparent 70%);pointer-events:none}
.survey-band::after{content:'';position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.08),transparent 70%);pointer-events:none}
.band-inner{max-width:660px;margin:0 auto;padding:36px 28px 32px;position:relative;z-index:1}
.dag-mark{display:flex;align-items:center;gap:10px;margin-bottom:20px}
.dag-dot{width:24px;height:24px;border-radius:6px;background:var(--grad-clp);flex-shrink:0}
.dag-wordmark{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.14em;color:var(--purple)}
.survey-eyebrow{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--purple);margin-bottom:8px}
.survey-title{font-size:34px;font-weight:700;line-height:1.1;letter-spacing:-.025em;color:#fff;margin-bottom:6px}
.survey-title span{background:var(--grad-clp);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.survey-sub{font-size:13px;color:rgba(255,255,255,.45);font-weight:400}
.track-pill{display:inline-flex;align-items:center;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--purple);background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.2);padding:4px 12px;border-radius:20px;margin-top:12px}
.progress-strip{background:var(--navy);border-top:1px solid rgba(255,255,255,.06)}
.progress-inner{max-width:660px;margin:0 auto;padding:12px 28px 16px}
.progress-meta{display:flex;justify-content:space-between;font-size:11px;font-weight:600;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px}
.progress-bar{height:2px;background:rgba(255,255,255,.08);border-radius:1px;overflow:hidden}
.progress-fill{height:100%;background:var(--grad-clp);border-radius:1px;transition:width .5s cubic-bezier(.4,0,.2,1)}
.shell{max-width:660px;margin:0 auto;padding:36px 28px 80px}
.screen{animation:fadeUp .35s ease forwards}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.intro-card{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:36px 32px;margin-bottom:16px}
.intro-eyebrow{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--purple);margin-bottom:14px}
.intro-body{font-size:15px;line-height:1.85;color:var(--slate)}
.intro-body strong{color:var(--navy);font-weight:600}
.how-works{margin-top:24px;border-top:1px solid var(--border);padding-top:20px}
.how-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:14px}
.how-row{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px}
.how-num{width:22px;height:22px;border-radius:6px;background:var(--grad-clp);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0;margin-top:1px}
.how-text{font-size:13px;color:var(--mid);line-height:1.6}
.intro-stats{display:flex;gap:10px;margin-top:20px}
.intro-stat{background:var(--off-white);border:1px solid var(--border);border-radius:10px;padding:14px 18px;flex:1}
.intro-stat-num{font-size:18px;font-weight:700;color:var(--navy);line-height:1}
.intro-stat-label{font-size:11px;color:var(--mid);margin-top:3px}
.section-break{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:28px 28px 24px;margin-bottom:16px}
.sb-eyebrow{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--purple);margin-bottom:8px}
.sb-title{font-size:18px;font-weight:700;color:var(--navy);letter-spacing:-.01em;margin-bottom:6px}
.sb-desc{font-size:13px;color:var(--mid);line-height:1.65}
.q-section-pill{display:inline-flex;align-items:center;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--mid);background:var(--white);border:1px solid var(--border);padding:4px 12px;border-radius:20px;margin-bottom:14px}
.system-badge{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--purple);background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.18);padding:2px 8px;border-radius:4px;margin-left:8px;vertical-align:middle}
.grad-bar{height:2px;width:48px;background:var(--grad-clp);border-radius:1px;margin-bottom:20px}
.q-num{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--purple);margin-bottom:8px}
.q-stem{font-size:21px;font-weight:700;line-height:1.3;letter-spacing:-.02em;color:var(--navy);margin-bottom:6px}
.q-hint{font-size:12px;color:var(--mid);margin-bottom:22px;font-style:italic}
.q-context{font-size:12px;color:var(--mid);margin-bottom:16px;line-height:1.6}
.options{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.opt{background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:14px 16px;cursor:pointer;transition:all .18s;display:flex;gap:12px;align-items:flex-start}
.opt:hover{border-color:rgba(139,92,246,.5);background:#faf5ff}
.opt.selected{border-color:var(--purple);background:#faf5ff}
.opt-id{font-size:10px;font-weight:700;color:var(--muted);flex-shrink:0;width:18px;padding-top:2px;letter-spacing:.04em}
.opt.selected .opt-id{color:var(--purple)}
.opt-content{flex:1}
.opt-text{font-size:14px;line-height:1.6;color:var(--slate)}
.opt.selected .opt-text{color:var(--navy)}
.opt-check{width:18px;height:18px;border-radius:50%;border:1.5px solid var(--border);flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center;transition:all .18s}
.opt.selected .opt-check{background:var(--purple);border-color:var(--purple)}
.opt-check::after{content:'';width:6px;height:6px;border-radius:50%;background:#fff;opacity:0;transition:.18s}
.opt.selected .opt-check::after{opacity:1}
.echo-wrap{max-height:0;overflow:hidden;transition:max-height .45s cubic-bezier(.4,0,.2,1),opacity .35s ease;opacity:0}
.echo-wrap.visible{max-height:140px;opacity:1}
.echo{background:var(--off-white);border-left:2px solid var(--purple);border-radius:0 8px 8px 0;padding:10px 14px;margin-top:10px}
.echo-label{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--purple);margin-bottom:4px}
.echo-text{font-size:12px;color:var(--mid);line-height:1.65;font-style:italic}
.gap-notice{background:rgba(139,92,246,.05);border:1px solid rgba(139,92,246,.15);border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:var(--mid);line-height:1.6}
.gap-notice strong{color:var(--navy)}
.q9-tabs{display:flex;gap:8px;margin-bottom:18px}
.q9-tab{flex:1;padding:10px 16px;background:var(--white);border:1.5px solid var(--border);border-radius:10px;cursor:pointer;font-size:12px;font-weight:600;color:var(--mid);font-family:'Inter',sans-serif;text-align:center;transition:all .18s}
.q9-tab:hover{border-color:rgba(139,92,246,.4);color:var(--purple)}
.q9-tab.active{border-color:var(--purple);color:var(--purple);background:rgba(139,92,246,.05)}
.open-ta{width:100%;min-height:110px;background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:14px 16px;color:var(--navy);font-size:14px;font-family:'Inter',sans-serif;line-height:1.7;resize:vertical;outline:none;transition:border-color .18s;margin-bottom:8px}
.open-ta::placeholder{color:var(--muted)}
.open-ta:focus{border-color:var(--purple)}
.open-note{font-size:11px;color:var(--muted)}
.nav-row{display:flex;gap:10px;align-items:center;margin-top:8px}
.btn-back{background:var(--white);border:1.5px solid var(--border);border-radius:10px;padding:12px 18px;color:var(--mid);font-size:13px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;transition:all .18s;flex-shrink:0}
.btn-back:hover{border-color:var(--navy);color:var(--navy)}
.btn-next{flex:1;padding:14px 20px;background:var(--grad-clp);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;transition:opacity .18s;letter-spacing:.01em}
.btn-next:disabled{opacity:.35;cursor:not-allowed}
.btn-next:not(:disabled):hover{opacity:.88}
.btn-start{width:100%;padding:15px 20px;background:var(--grad-clp);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:600;font-family:'Inter',sans-serif;cursor:pointer;transition:opacity .18s;letter-spacing:.01em}
.btn-start:hover{opacity:.88}
.ty-wrap{text-align:center;padding:52px 20px}
.ty-icon{width:60px;height:60px;border-radius:16px;background:var(--grad-clp);margin:0 auto 24px;display:flex;align-items:center;justify-content:center}
.ty-icon svg{width:28px;height:28px}
.ty-title{font-size:26px;font-weight:700;letter-spacing:-.02em;color:var(--navy);margin-bottom:12px}
.ty-title span{background:var(--grad-clp);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.ty-bar{height:2px;width:48px;background:var(--grad-clp);border-radius:1px;margin:0 auto 20px}
.ty-body{font-size:14px;line-height:1.85;color:var(--mid);max-width:420px;margin:0 auto 24px}
.ty-next{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--purple);background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.18);padding:10px 20px;border-radius:20px}
.demo-card{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:32px 28px;margin-bottom:16px}
.demo-eyebrow{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--purple);margin-bottom:6px}
.demo-title{font-size:20px;font-weight:700;color:var(--navy);letter-spacing:-.015em;margin-bottom:6px}
.demo-sub{font-size:13px;color:var(--mid);margin-bottom:24px;line-height:1.6}
.field-group{display:flex;flex-direction:column;gap:16px}
.field-wrap{display:flex;flex-direction:column;gap:6px}
.field-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--mid)}
.field-required{color:var(--purple);margin-left:2px}
.field-input{width:100%;background:var(--white);border:1.5px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--navy);font-size:14px;font-family:'Inter',sans-serif;font-weight:400;outline:none;transition:border-color .18s}
.field-input::placeholder{color:var(--muted)}
.field-input:focus{border-color:var(--purple)}
.field-select{width:100%;background:var(--white);border:1.5px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--navy);font-size:14px;font-family:'Inter',sans-serif;font-weight:400;outline:none;transition:border-color .18s;appearance:none;cursor:pointer}
.field-select:focus{border-color:var(--purple)}
.field-select.placeholder{color:var(--muted)}
@media(max-width:500px){
  .band-inner,.progress-inner,.shell{padding-left:20px;padding-right:20px}
  .survey-title{font-size:27px}
  .q-stem{font-size:18px}
  .intro-card,.section-break,.demo-card{padding:24px 20px}
  .intro-stats{flex-wrap:wrap}
}
`
