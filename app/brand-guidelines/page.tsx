"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Check, Download } from "lucide-react"

const brandGuidelines = `# DAG Brand Guidelines

## Brand Identity
- **Full Name:** Dental Associate Growth
- **Abbreviation:** DAG
- **Tagline:** The Associate Operating System

---

## Logo Assets

| Asset | File | Usage |
|-------|------|-------|
| Primary Logo (Horizontal) | \`/images/dental-associate-growth-logo.png\` | Navigation, headers, documents |
| Icon Only | \`/images/optimize-logo-colors.png\` | Favicon, social avatars, small spaces |

**Icon Description:** Rounded square with purple-to-teal diagonal gradient, containing 5 ascending white rounded bars (representing growth). Corner radius: 80px on 512px canvas.

---

## Color Palette

### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Navy | \`#0f172a\` | rgb(15, 23, 42) | Primary buttons, dark backgrounds, headings |
| Teal | \`#14b8a6\` | rgb(20, 184, 166) | Primary accent, CTAs, links, success states |
| Purple | \`#8b5cf6\` | rgb(139, 92, 246) | Secondary accent, gradients |

### Neutral Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| White | \`#ffffff\` | rgb(255, 255, 255) | Card backgrounds, text on dark |
| Light Gray | \`#f8fafc\` | rgb(248, 250, 252) | Page backgrounds, alternating sections |
| Border Gray | \`#e2e8f0\` | rgb(226, 232, 240) | Card borders, dividers |
| Body Text | \`#475569\` | rgb(71, 85, 105) | Paragraph text |
| Muted Text | \`#64748b\` | rgb(100, 116, 139) | Secondary text, captions |
| Dark Text | \`#1e293b\` | rgb(30, 41, 59) | Headings on light backgrounds |

### Semantic Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Danger | \`#ef4444\` | rgb(239, 68, 68) | Warnings, cost/loss figures |
| Warning | \`#f97316\` | rgb(249, 115, 22) | Alerts, attention states |

---

## Gradients

### Brand Gradient (Icon/Featured)
\`\`\`css
background: linear-gradient(135deg, #14b8a6, #8b5cf6);
/* Tailwind: bg-gradient-to-br from-teal-500 to-purple-500 */
\`\`\`

### Teal CTA Gradient
\`\`\`css
background: linear-gradient(135deg, #14b8a6, #0d9488);
/* Tailwind: bg-gradient-to-r from-teal-500 to-teal-600 */
\`\`\`

### Dark Section Gradient
\`\`\`css
background: linear-gradient(135deg, #0f172a, #1e293b);
/* Tailwind: bg-gradient-to-br from-slate-900 to-slate-800 */
\`\`\`

---

## Typography

### Font Stack
\`\`\`css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Segoe UI", sans-serif;
\`\`\`

### Type Scale
| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| H1 (Hero) | 36px / 48px / 60px | Bold (700) | -0.025em |
| H2 (Section) | 30px / 36px | Extra Bold (800) | -0.025em |
| H3 (Card) | 24px | Bold (700) | normal |
| H4 (Small) | 18px | Semi Bold (600) | normal |
| Body | 16px / 18px | Normal (400) | normal, line-height 1.625 |
| Small | 14px | Medium (500) | normal |
| Label | 12px | Semi Bold (600) | 0.1em, uppercase |

---

## Spacing System

| Name | Value | Usage |
|------|-------|-------|
| Section Padding | 80px / 112px vertical, 24px horizontal | Page sections |
| Card Padding | 20px mobile, 32px desktop | Card content |
| Grid Gap | 24px or 32px | Between grid items |
| Button Padding | 32px horizontal, 16px vertical (large) | CTA buttons |
| Button Padding | 20px horizontal, 10px vertical (small) | Secondary buttons |

### Corner Radius
| Element | Radius |
|---------|--------|
| Buttons | 12px (rounded-xl) |
| Cards/Sections | 16px (rounded-2xl) |
| Pills/Tags | 9999px (rounded-full) |
| Inputs | 12px (rounded-xl) |

---

## Component Patterns

### Primary CTA Button
\`\`\`css
background: #0f172a;
color: white;
padding: 16px 32px;
border-radius: 12px;
font-weight: 500;
/* Hover: background #14b8a6, transform translateY(-2px) */
\`\`\`

### Secondary CTA Button
\`\`\`css
background: #14b8a6;
color: white;
padding: 16px 32px;
border-radius: 12px;
font-weight: 600;
/* Hover: background #0d9488, box-shadow 0 10px 25px rgba(20,184,166,0.25) */
\`\`\`

### Card (Light)
\`\`\`css
background: white;
border-radius: 16px;
border: 1px solid #e2e8f0;
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
padding: 32px;
\`\`\`

### Card (Dark)
\`\`\`css
background: rgba(30, 41, 59, 0.5);
border: 1px solid #334155;
border-radius: 16px;
padding: 32px;
\`\`\`

### Section Label
\`\`\`css
font-size: 12px;
font-weight: 600;
letter-spacing: 0.1em;
text-transform: uppercase;
color: #14b8a6; /* or #2dd4bf on dark backgrounds */
\`\`\`

---

## Dark vs. Light Sections

### Light Sections
- Background: \`#ffffff\` or \`#f8fafc\`
- Headings: \`#0f172a\`
- Body text: \`#475569\`
- Accent text: \`#14b8a6\`

### Dark Sections
- Background: \`#0f172a\`
- Headings: \`#ffffff\`
- Body text: \`#94a3b8\`
- Accent text: \`#2dd4bf\`

---

## Animation

### Fade In
\`\`\`css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Duration: 0.6s, Easing: ease-out */
\`\`\`

### Fade In Up
\`\`\`css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Duration: 0.6s, Easing: ease-out */
\`\`\`

### Hover Lift
\`\`\`css
transform: translateY(-2px);
transition: all 0.2s ease;
\`\`\`

### Stagger Delays
- 200ms, 300ms, 500ms for sequential element animations

---

## Voice & Tone

- **Confident, not corporate** — Direct language, short sentences, no jargon
- **Operator credibility** — "Built by operators, not consultants"
- **Numbers-driven** — Always show concrete metrics ($39K to $77K, 35-40% spike)
- **Challenge the status quo** — "Stop tolerating mediocrity", "The Mediocrity Tax"
- **Quote format:** "Quote text." — Dr. Eric J. Roman
`

export default function BrandGuidelinesPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(brandGuidelines)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([brandGuidelines], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "DAG-Brand-Guidelines.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy All"}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-teal-500 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download .md
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12">
          <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 leading-relaxed overflow-x-auto">
            {brandGuidelines}
          </pre>
        </div>
      </div>
    </div>
  )
}
