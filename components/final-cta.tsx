import { ToolkitCTAPrimary } from "@/components/toolkit-cta"

export function FinalCTA() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-r from-teal-500 to-purple-500 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
          Exit the Mediocrity Hamster Wheel
        </h2>

        <p className="text-xl lg:text-[1.375rem] text-white/95 mb-4 leading-relaxed max-w-3xl mx-auto">
          You can choose excellence or you can choose mediocrity. The recipe exists. The frameworks are proven. The
          transformation is systematic.
        </p>

        <p className="text-lg lg:text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
          But first, you need to know where you are, and where the gaps are costing you the most.
        </p>

        <ToolkitCTAPrimary variant="gradient" />
      </div>
    </section>
  )
}
