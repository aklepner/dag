import Link from "next/link"

/**
 * Toolkit CTA System — 3 tiers
 *
 * PRIMARY:   Hero, final CTA, footer card — full button + value subtext + trust line
 * SECONDARY: After content sections — button + short value line
 * TERTIARY:  Resource cards, nav links — just the name as a link
 */

const TOOLKIT_HREF = "/diagnostic"
const TOOLKIT_NAME = "Dental Associate Growth Toolkit"
const BUTTON_TEXT = `Get the Free ${TOOLKIT_NAME}`

const VALUE_LINE = "The 6 systems behind every high-performing associate program. See exactly where you're leaving $100K+ on the table."
const VALUE_SHORT = "Find where your associate systems are broken. Free scorecard, benchmarks, and framework."
const TRUST_LINE = "Takes 60 seconds. Free forever. No credit card required."

// ─── PRIMARY ────────────────────────────────────────────────────────────────
// Use on: Hero, Final CTA, Footer toolkit card
// Full button + value subtext + trust line

export function ToolkitCTAPrimary({
  variant = "dark",
  className = "",
  showTrustLine = true,
}: {
  variant?: "dark" | "light" | "gradient"
  className?: string
  showTrustLine?: boolean
}) {
  const buttonStyles = {
    dark: "bg-slate-900 text-white hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/25",
    light: "bg-white text-slate-900 hover:bg-slate-50 hover:shadow-xl hover:shadow-white/20",
    gradient: "bg-white text-slate-900 hover:bg-slate-50 hover:shadow-2xl",
  }

  const subtextStyles = {
    dark: "text-slate-500",
    light: "text-white/70",
    gradient: "text-white/80",
  }

  const trustStyles = {
    dark: "text-slate-400",
    light: "text-white/60",
    gradient: "text-white/60",
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <Link
        href={TOOLKIT_HREF}
        className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg hover:-translate-y-0.5 transition-all text-center ${buttonStyles[variant]}`}
      >
        {BUTTON_TEXT}
      </Link>
      <p className={`text-sm leading-relaxed text-center max-w-md ${subtextStyles[variant]}`}>
        {VALUE_LINE}
      </p>
      {showTrustLine && (
        <p className={`text-xs tracking-wide text-center ${trustStyles[variant]}`}>
          {TRUST_LINE}
        </p>
      )}
    </div>
  )
}

// ─── SECONDARY ──────────────────────────────────────────────────────────────
// Use on: After content sections (problem, framework, avatar selection)
// Button + short value line

export function ToolkitCTASecondary({
  variant = "dark",
  className = "",
  showArrow = true,
}: {
  variant?: "dark" | "light"
  className?: string
  showArrow?: boolean
}) {
  const buttonStyles = {
    dark: "bg-slate-900 text-white hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/25",
    light: "bg-white text-slate-900 hover:bg-slate-50 hover:shadow-xl",
  }

  const subtextStyles = {
    dark: "text-slate-400",
    light: "text-white/70",
  }

  return (
    <div className={`flex flex-col items-center gap-2.5 ${className}`}>
      <Link
        href={TOOLKIT_HREF}
        className={`inline-flex items-center justify-center px-7 py-4 rounded-xl font-medium hover:-translate-y-0.5 transition-all text-center ${buttonStyles[variant]}`}
      >
        {BUTTON_TEXT}{showArrow ? " \u2192" : ""}
      </Link>
      <p className={`text-sm text-center max-w-sm ${subtextStyles[variant]}`}>
        {VALUE_SHORT}
      </p>
    </div>
  )
}

// ─── SECONDARY INLINE ───────────────────────────────────────────────────────
// Use on: Inline text link after paragraphs
// Just a styled text link with arrow

export function ToolkitCTAInline({ className = "" }: { className?: string }) {
  return (
    <Link
      href={TOOLKIT_HREF}
      className={`text-teal-600 font-semibold hover:text-teal-700 transition-colors inline-flex items-center gap-1 ${className}`}
    >
      {BUTTON_TEXT} {"\u2192"}
    </Link>
  )
}

// ─── TERTIARY ───────────────────────────────────────────────────────────────
// Use on: Resource cards, small references
// Exports constants for use in data arrays

export const TOOLKIT_CONSTANTS = {
  name: TOOLKIT_NAME,
  fullName: `Free ${TOOLKIT_NAME}`,
  buttonText: BUTTON_TEXT,
  href: TOOLKIT_HREF,
  valueLine: VALUE_LINE,
  valueShort: VALUE_SHORT,
  trustLine: TRUST_LINE,
}
