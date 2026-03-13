export function WhyWeBuiltThis() {
  return (
    <section className="py-24 lg:py-32 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <div className="text-center mb-8">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
            The Backstory
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl lg:text-5xl font-semibold text-white text-center mb-16 tracking-tight">
          We Built This Because We Needed It
        </h2>

        {/* Quote Block */}
        <blockquote className="relative mb-16">
          <div className="text-xl lg:text-2xl text-white/90 leading-relaxed italic space-y-6">
            <p>
              "I hired 12 associates in my first 3 years. 9 of them left within 18 months.
            </p>
            <p>
              I didn't have a hiring problem. I didn't have a 'millennial problem.' I had a systems problem, and I had no idea.
            </p>
            <p>
              So we spent the next decade figuring it out. Building it. Refining it across hundreds of practices. Now we install it in organizations like yours, so you don't have to make the same mistakes we did."
            </p>
          </div>
          <footer className="mt-8 text-teal-400 font-medium">
            — Dr. Eric J. Roman, after building & exiting two dental groups
          </footer>
        </blockquote>

        {/* Case Study Card */}
        <a
          href="/case-studies/areo-dental"
          className="block mb-16 group"
        >
          <div className="bg-slate-700/50 border border-slate-600/50 rounded-2xl p-10 text-center hover:bg-slate-700/70 transition-colors">
            <p className="text-teal-400 font-semibold tracking-widest uppercase text-xs mb-4">
              Case Study
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {"Areo Dental Group: $39K \u2192 $77K Monthly Production"}
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {"New grad dentists saw a "}
              <span className="font-bold text-teal-400">{"35-40% productivity spike"}</span>
              {" within 30 days of installing the system."}
            </p>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-500 group-hover:bg-teal-400 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </a>

        {/* Learn More */}
        <div className="pt-12 border-t border-slate-700 text-center">
          <a
            href="/about"
            className="inline-block px-8 py-4 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-400 hover:-translate-y-0.5 transition-all"
          >
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  )
}
