import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: "📊",
    title: "Practice Growth Strategy",
    description: "Develop comprehensive growth plans tailored to your practice goals and market position.",
  },
  {
    icon: "💼",
    title: "Operations Optimization",
    description: "Streamline workflows, improve efficiency, and reduce operational costs.",
  },
  {
    icon: "👥",
    title: "Team Development",
    description: "Build high-performing teams through training, leadership development, and culture building.",
  },
  {
    icon: "💰",
    title: "Financial Management",
    description: "Maximize profitability with strategic financial planning and revenue optimization.",
  },
  {
    icon: "📱",
    title: "Digital Marketing",
    description: "Attract more patients with proven digital marketing strategies and patient acquisition systems.",
  },
  {
    icon: "⚙️",
    title: "Technology Integration",
    description: "Implement cutting-edge dental technologies and practice management systems.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[3rem] font-semibold text-[#1e293b] leading-[1.1] tracking-[-0.02em] mb-4">
            Comprehensive Consulting Services
          </h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto leading-relaxed">
            Everything you need to build and scale a successful dental practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-[#e2e8f0] hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-2xl font-semibold text-[#1e293b] tracking-[-0.01em]">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#64748b] leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
