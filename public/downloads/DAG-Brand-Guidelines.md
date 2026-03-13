# DAG Brand Guidelines

## Brand Identity

- **Full Name:** Dental Associate Growth
- **Abbreviation:** DAG
- **Tagline:** The Associate Operating System

---

## Logo Assets

| Asset | File | Usage |
|-------|------|-------|
| Primary Logo (Horizontal) | `dental-associate-growth-logo.png` | Navigation, headers, documents |
| Icon Only | `optimize-logo-colors.png` | Favicon, social avatars, small spaces |

**Icon Description:** Rounded square with purple-to-teal diagonal gradient, containing 5 ascending white rounded bars (representing growth).

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Navy | `#0f172a` | `15, 23, 42` | Primary buttons, dark backgrounds, headings |
| Teal | `#14b8a6` | `20, 184, 166` | Primary accent, CTAs, links, success states |
| Purple | `#8b5cf6` | `139, 92, 246` | Secondary accent, gradients |

### Neutral Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| White | `#ffffff` | `255, 255, 255` | Card backgrounds, text on dark |
| Light Gray | `#f8fafc` | `248, 250, 252` | Page backgrounds, alternating sections |
| Border Gray | `#e2e8f0` | `226, 232, 240` | Card borders, dividers |
| Body Text | `#475569` | `71, 85, 105` | Paragraph text |
| Muted Text | `#64748b` | `100, 116, 139` | Secondary text, captions |
| Dark Text | `#1e293b` | `30, 41, 59` | Headings on light backgrounds |

### Semantic Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Danger/Urgency | `#ef4444` | `239, 68, 68` | Warnings, cost/loss figures |
| Warning | `#f97316` | `249, 115, 22` | Alerts, attention states |

---

## Gradients

### Brand Gradient (Icon/Featured)
- **CSS:** `linear-gradient(135deg, #14b8a6, #8b5cf6)`
- **Direction:** Top-left to bottom-right
- **Colors:** Teal (#14b8a6) to Purple (#8b5cf6)

### Teal CTA Gradient
- **CSS:** `linear-gradient(135deg, #14b8a6, #0d9488)`
- **Direction:** Left to right
- **Colors:** Teal 500 (#14b8a6) to Teal 600 (#0d9488)

### Dark Section Gradient
- **CSS:** `linear-gradient(135deg, #0f172a, #1e293b)`
- **Direction:** Top-left to bottom-right
- **Colors:** Slate 900 (#0f172a) to Slate 800 (#1e293b)

---

## Typography

### Font Stack
```
-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Segoe UI", sans-serif
```

### Type Scale

| Element | Size (Mobile) | Size (Desktop) | Weight | Letter Spacing |
|---------|---------------|----------------|--------|----------------|
| H1 (Hero) | 36px | 48-60px | Bold (700) | Tight (-0.025em) |
| H2 (Section) | 30px | 36-48px | Extra Bold (800) | Tight (-0.025em) |
| H3 (Card) | 24px | 24px | Bold (700) | Normal |
| H4 (Small) | 18px | 18px | Semi Bold (600) | Normal |
| Body | 16px | 18px | Normal (400) | Normal |
| Small | 14px | 14px | Normal (400) | Normal |
| Label | 12px | 12px | Semi Bold (600) | Wide (0.1em), Uppercase |

---

## Spacing System

### Section Spacing
- **Vertical padding:** 80px (mobile), 112px (desktop)
- **Horizontal padding:** 24px

### Card Spacing
- **Padding:** 20px (mobile), 32px (desktop)
- **Gap between cards:** 24px or 32px

### Button Spacing
- **Large:** 32px horizontal, 16px vertical
- **Small:** 20px horizontal, 10px vertical

---

## Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 12px |
| Cards/Sections | 16px |
| Pills/Tags | 9999px (full) |
| Inputs | 12px |

---

## Shadows

### Card Shadow (Light)
```css
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
```

### Hover Shadow (Teal Glow)
```css
box-shadow: 0 20px 25px -5px rgb(20 184 166 / 0.25);
```

---

## Component Patterns

### Primary CTA Button
- **Background:** Navy (#0f172a)
- **Text:** White
- **Hover:** Teal (#14b8a6) + lift effect (-2px translateY)
- **Border Radius:** 12px
- **Padding:** 32px horizontal, 16px vertical
- **Font Weight:** Medium (500)

### Secondary CTA Button
- **Background:** Teal (#14b8a6)
- **Text:** White
- **Hover:** Teal 600 (#0d9488) + teal shadow
- **Border Radius:** 12px
- **Padding:** 32px horizontal, 16px vertical
- **Font Weight:** Semi Bold (600)

### Gradient Button
- **Background:** Gradient (Teal to Purple)
- **Text:** White
- **Hover:** Shadow effect
- **Border Radius:** 12px
- **Padding:** 32px horizontal, 16px vertical
- **Font Weight:** Medium (500)

### Card (Light Background)
- **Background:** White
- **Border:** 1px solid #e2e8f0
- **Shadow:** Subtle (see above)
- **Border Radius:** 16px
- **Padding:** 32px

### Card (Dark Background)
- **Background:** rgba(30, 41, 59, 0.5)
- **Border:** 1px solid #334155
- **Border Radius:** 16px
- **Padding:** 32px

### Section Label
- **Font Size:** 12px
- **Font Weight:** Semi Bold (600)
- **Letter Spacing:** 0.1em
- **Text Transform:** Uppercase
- **Color:** Teal (#14b8a6) on light, Teal 400 (#2dd4bf) on dark

---

## Dark vs. Light Sections

### Light Sections
- **Background:** White (#ffffff) or Light Gray (#f8fafc)
- **Headings:** Dark Text (#1e293b)
- **Body:** Body Text (#475569)
- **Accents:** Teal 600 (#0d9488)

### Dark Sections
- **Background:** Navy (#0f172a)
- **Headings:** White (#ffffff)
- **Body:** Slate 400 (#94a3b8)
- **Accents:** Teal 400 (#2dd4bf)

---

## Animation

### Fade In
- **Duration:** 600ms
- **Easing:** ease-out
- **From:** opacity 0
- **To:** opacity 1

### Fade In Up
- **Duration:** 600ms
- **Easing:** ease-out
- **From:** opacity 0, translateY(16px)
- **To:** opacity 1, translateY(0)

### Hover Lift
- **Transform:** translateY(-2px)
- **Transition:** all 200ms ease

### Stagger Delays
- 200ms, 300ms, 500ms (for sequential element reveals)

---

## Voice & Tone

### Principles
1. **Confident, not corporate** - Direct language, short sentences, no jargon
2. **Operator credibility** - "Built by operators, not consultants"
3. **Numbers-driven** - Always show concrete metrics ($39K to $77K, 35-40% spike)
4. **Challenge the status quo** - "Stop tolerating mediocrity", "The Mediocrity Tax"

### Quote Format
```
"Quote text here."
— Dr. Eric J. Roman
```

---

## File Downloads

- Brand Guidelines: `/downloads/DAG-Brand-Guidelines.md`
- Primary Logo: `/images/dental-associate-growth-logo.png`
- Icon Logo: `/images/optimize-logo-colors.png`
