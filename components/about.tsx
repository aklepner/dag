import { Button } from "@/components/ui/button"

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[3rem] font-semibold text-[#1e293b] leading-[1.1] tracking-[-0.02em] mb-6">
              Why Choose Dental Excellence Consulting?
            </h2>
            <p className="text-lg text-[#64748b] leading-relaxed mb-6">
              With over 20 years of experience in the dental industry, we've helped hundreds of practices achieve
              unprecedented growth and success.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#14b8a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">Proven Track Record</h3>
                  <p className="text-[#64748b]">Average 40% revenue increase within the first year</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#14b8a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">Tailored Solutions</h3>
                  <p className="text-[#64748b]">Custom strategies designed for your unique practice needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#14b8a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e293b] mb-1">Ongoing Support</h3>
                  <p className="text-[#64748b]">Continuous guidance to ensure long-term success</p>
                </div>
              </div>
            </div>
            <Button className="bg-[#14b8a6] hover:bg-[#0d9488] text-white">Learn About Our Process</Button>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#0d9488] overflow-hidden">
              <img
                src="/professional-dental-office-consultation.jpg"
                alt="Dental consulting"
                className="w-full h-full object-cover mix-blend-overlay opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl font-bold mb-2">500+</div>
                  <div className="text-xl">Practices Transformed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
