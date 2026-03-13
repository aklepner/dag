import { ToolkitCTAInline, ToolkitCTASecondary } from "@/components/toolkit-cta"

const stats = [
  {
    number: "$73K",
    label: "The Financial Drain",
    description: "Average monthly loss per underperforming associate",
    subtitle: "Missed treatment opportunities cost more than empty chairs",
  },
  {
    number: "49%",
    label: "The Hidden Cost",
    description: "of dental visits end without comprehensive treatment plans",
    subtitle: "Your associates don't know how to diagnose, and they're too scared to admit it",
  },
  {
    number: "67%",
    label: "The Confidence Crisis",
    description: 'of associates report "imposter syndrome" in complex cases',
    subtitle: "Without clinical systems, even great dentists can't perform",
  },
  {
    number: "12-Month",
    label: "The Turnover Trigger",
    description: "Average tenure before associates leave underperforming practices",
    subtitle: 'Poor systems cause turnover, not "bad" dentists',
  },
]

export function ProblemSection() {
  return (
    <section className="py-20 lg:py-32 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold text-slate-900 mb-3 tracking-tight leading-tight">
            While You're Fighting Turnover, You're Missing the Real Problem...
          </h2>
          <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Associate Underperformance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl text-center border border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <div className="text-3xl lg:text-4xl font-semibold mb-3 tracking-tight">
                <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
                  {stat.number}
                </span>
              </div>
              <div className="text-slate-900 text-base font-semibold mb-2">{stat.label}</div>
              <div className="text-slate-600 text-sm leading-relaxed mb-3">{stat.description}</div>
              <div className="text-slate-500 text-xs leading-relaxed italic">{stat.subtitle}</div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-slate-700 text-lg leading-relaxed">
            Most practices focus on hiring better associates or improving retention programs. But here's what the data
            reveals:{" "}
            <span className="font-semibold">
              Associate underperformance is a systems failure, not a talent failure.
            </span>{" "}
            Without clinical infrastructure, even world-class dentists will underperform. The recipe exists, you just
            need to implement it.
          </p>
        </div>

        {/* What This Actually Costs You Callout */}
        <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 rounded-3xl p-10 lg:p-12 border border-cyan-200/30">
          <h3 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-4 text-center">What This Actually Costs You</h3>
          <p className="text-slate-700 text-lg leading-relaxed text-center mb-6">
            If you have 5 associates underperforming by just 20%, you're losing approximately $365K per year. Our engagement costs a fraction of what you'll recover in the first 90 days.
          </p>
          <div className="text-center">
            <ToolkitCTAInline />
          </div>
        </div>

        {/* Hidden Profit Drain Video */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm text-slate-500">Watch Dr. Eric J. Roman reveal</p>
            <p className="text-xl font-semibold text-slate-900">The Problem Nobody's Talking About</p>
            <p className="text-sm text-slate-500">(And the System That Fixes It)</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src="https://www.loom.com/embed/a815c11e788645dab75f90ef34ee7e7b"
              frameBorder="0"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* CTA */}
        <ToolkitCTASecondary variant="dark" className="mt-12" />
      </div>
    </section>
  )
}
