import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#14b8a6] to-[#0d9488]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[3rem] font-semibold text-white leading-[1.1] tracking-[-0.02em] mb-6">
          Ready to Transform Your Practice?
        </h2>
        <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
          Book a Fit Assessment Call today and discover how we can help you achieve your practice goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-[#14b8a6] hover:bg-white/90 text-base px-8 h-12">
            Book a Fit Assessment Call
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 text-base px-8 h-12 bg-transparent"
          >
            Download Free Guide
          </Button>
        </div>
      </div>
    </section>
  )
}
