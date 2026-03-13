import { ArrowRight } from "lucide-react"
import Link from "next/link"

const badItems = [
  { behavior: "Reactive problem-solving", example: '"Why didn\'t this case go well?"' },
  { behavior: "Personality-based coaching", example: '"You need to be more confident"' },
  { behavior: "Hope-based outcomes", example: '"Let\'s see if this improves"' },
  { behavior: "Result", example: "Missed treatment opportunities, low patient trust, high associate turnover" },
]

const goodItems = [
  { behavior: "Recipe-driven protocols", example: "Every complex case has a playbook" },
  { behavior: "Skills-based development", example: "6 core systems + 10-step mastery" },
  { behavior: "Rhythm-based accountability", example: "90-day cycles with measurable progress" },
  { behavior: "Result", example: "Predictable performance, confident associates, sustainable growth" },
]

export function ComparisonSection() {
  return (
    <section className="py-20 lg:py-32 px-6 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
            Stop Blaming Your Associates. Fix Your Systems.
          </h2>
          <p className="text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Most dental groups are stuck in what we call 'Management Theater': activities that look like leadership but
            don't move the needle. Here's the difference between theater and systematic excellence:
          </p>
        </div>

        {/* Comparison Cards with Arrow */}
        <div className="relative grid lg:grid-cols-2 gap-8 mt-16">
          {/* Bad Card */}
          <div className="relative bg-white/[0.06] backdrop-blur-sm border border-red-400/40 rounded-3xl p-8 lg:p-12 min-h-[400px] flex flex-col">
            <h3 className="text-2xl lg:text-[1.5rem] font-semibold text-red-300 mb-8 tracking-tight">
              Your Current "Process"
            </h3>
            <ul className="space-y-5 flex-1">
              {badItems.map((item, idx) => (
                <li key={idx} className="flex items-start text-white/90 text-base lg:text-lg leading-relaxed">
                  <span className="text-red-300 mr-4 text-xl flex-shrink-0">✕</span>
                  <div>
                    <div className="font-bold">{item.behavior}</div>
                    <div className="italic text-white/70">{item.example}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow Element - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative flex items-center justify-center">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full blur-xl opacity-50" />

              {/* Arrow circle */}
              <div className="relative w-20 h-20 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                <ArrowRight className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Mobile Arrow - Centered between cards */}
          <div className="lg:hidden flex justify-center -my-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full blur-lg opacity-50" />
              <div className="relative w-16 h-16 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center rotate-90 shadow-xl">
                <ArrowRight className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Good Card */}
          <div className="relative bg-white/[0.06] backdrop-blur-sm border border-teal-400/40 rounded-3xl p-8 lg:p-12 min-h-[400px] flex flex-col">
            <h3 className="text-2xl lg:text-[1.5rem] font-semibold text-cyan-300 mb-8 tracking-tight">
              Systematic Excellence
            </h3>
            <ul className="space-y-5 flex-1">
              {goodItems.map((item, idx) => (
                <li key={idx} className="flex items-start text-white/90 text-base lg:text-lg leading-relaxed">
                  <span className="text-cyan-300 mr-4 text-xl flex-shrink-0">✓</span>
                  <div>
                    <div className="font-bold">{item.behavior}</div>
                    <div className="italic text-white/70">{item.example}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* New Copy Block */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h3 className="text-3xl lg:text-4xl font-semibold text-white mb-6 tracking-tight">
            You Didn't Have the Playbook. Now You Do.
          </h3>
          <p className="text-xl text-white/90 leading-relaxed mb-4">
            This isn't coaching. This isn't consulting. This is installation.
          </p>
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            We've lived it, built and exited two dental groups, hired over 100 associates, made every mistake in the book. Now we install the system we wish someone had given us 15 years ago.
          </p>
          <p className="text-lg text-white/90 font-medium mb-10">
            You bring the team. We bring the playbook. It stays with you forever.
          </p>
          <Link
            href="#framework"
            className="inline-block bg-white text-slate-900 px-7 py-4 rounded-xl font-medium hover:bg-slate-100 transition-all"
          >
            See How It Works →
          </Link>
        </div>
      </div>
    </section>
  )
}
