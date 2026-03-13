import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    practice: "Bright Smile Dental",
    quote:
      "Working with Dental Excellence transformed our practice completely. Revenue increased by 45% in just 8 months.",
    rating: 5,
  },
  {
    name: "Dr. James Chen",
    practice: "Metro Dental Group",
    quote:
      "The team development strategies helped us build a culture that attracts top talent and delivers exceptional patient care.",
    rating: 5,
  },
  {
    name: "Dr. Emily Rodriguez",
    practice: "Family Dental Care",
    quote:
      "Their financial management guidance helped us optimize our operations and significantly improve our bottom line.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#14b8a6] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[3rem] font-semibold text-white leading-[1.1] tracking-[-0.02em] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
            Join hundreds of successful dental practices who have transformed their business with our help
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#14b8a6]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white leading-relaxed mb-6">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-[#cbd5e1]">{testimonial.practice}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
