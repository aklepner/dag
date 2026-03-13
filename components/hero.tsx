import Link from "next/link"
import { ToolkitCTAPrimary } from "@/components/toolkit-cta"
import { Play } from "path/to/Play" // Declare the Play variable here

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Spacer for fixed nav */}
      <div className="h-20" />

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-3/5 h-full opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#14b8a6_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-tight tracking-tight">
              Your Associates Aren't Broken.
              <br />
              <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
                Your Systems Are.
              </span>
            </h1>

            <p className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4">
              We Have the Playbook.
            </p>

            <p className="text-lg sm:text-xl lg:text-[1.375rem] text-slate-600 leading-relaxed">
              Stop tolerating $40K-$100K monthly losses from associate underperformance. You don't have to figure this out alone, we already did. Install the clinical system built from scaling two dental groups.
            </p>

            {/* CTAs */}
            <ToolkitCTAPrimary variant="dark" className="items-center sm:items-start" showTrustLine={false} />

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 lg:gap-12 pt-4">
              <div>
                <div className="text-3xl font-semibold text-slate-900 tracking-tight">$1B+</div>
                <div className="text-sm text-slate-600">Coached Revenue</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-slate-900 tracking-tight">100+</div>
                <div className="text-sm text-slate-600">Associates Hired</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-slate-900 tracking-tight">90 Days</div>
                <div className="text-sm text-slate-600">To Excellence</div>
              </div>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.loom.com/embed/a815c11e788645dab75f90ef34ee7e7b"
                frameBorder="0"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
