import Link from "next/link"
import { ArrowLeft, ArrowRight, Quote, TrendingUp, Users, DollarSign, Clock, Play } from "lucide-react"
import { ClinicalLeadershipJournal } from "@/components/clinical-leadership-journal"
import { Footer } from "@/components/footer"

const testimonialCategories = [
  {
    stage: "Foundation Building",
    subtitle: "1-4 Locations",
    color: "from-blue-500 to-cyan-500",
    testimonials: [
      {
        quote:
          "We built the 6 Clinical Systems before hiring our first associate. When we finally brought her on, she hit $40K in her second month. No chaos, no surprises, just the playbook working exactly as promised.",
        result: "First associate to $40K/month in 60 days",
        name: "Michael Chen",
        title: "Founder",
        company: "Pacific Dental Group",
        locations: "3 locations",
        initials: "MC",
      },
      {
        quote:
          "I watched my colleagues hire associates and struggle for 18 months. We followed the Foundation Blueprint and our associate was profitable in 90 days. The Recipe + Rhythm framework saved us from the nightmare everyone warned me about.",
        result: "Profitable associate in 90 days",
        name: "Amanda Williams",
        title: "Owner & Clinical Director",
        company: "Riverside Family Dentistry",
        locations: "2 locations",
        initials: "AW",
      },
    ],
  },
  {
    stage: "Systems Design",
    subtitle: "5-15 Locations",
    color: "from-teal-500 to-emerald-500",
    testimonials: [
      {
        quote:
          "We were losing $200K annually to turnover and underperformance. Dr. Eric J. Roman and Josey diagnosed our gaps in week one, installed emergency systems in weeks 2-4, and by month 6 our associate retention went from 58% to 94%. The ROI was undeniable.",
        result: "58% → 94% retention in 6 months",
        name: "Sarah Martinez",
        title: "COO",
        company: "Summit Dental Partners",
        locations: "12 locations",
        initials: "SM",
      },
      {
        quote:
          "I was personally managing 8 underperforming associates while trying to scale. The 10-Step Playbook gave me a system that worked without me being the bottleneck. Now my clinical directors run it, and I'm back to strategic work.",
        result: "From chaos to systematic excellence",
        name: "David Park",
        title: "CEO",
        company: "Urban Smile Collective",
        locations: "9 locations",
        initials: "DP",
      },
    ],
  },
  {
    stage: "Scale + Infrastructure",
    subtitle: "15+ Locations",
    color: "from-purple-500 to-pink-500",
    testimonials: [
      {
        quote:
          "We had systems, but associates were still plateauing at $35K when they should've been at $60K. The diagnostic revealed we had 3 of the 6 Clinical Systems, but the gaps were costing us $2M annually. Six months later, we're systematic across all 23 locations.",
        result: "$2M recovered annually from hidden gaps",
        name: "Jennifer Thompson",
        title: "Chief Clinical Officer",
        company: "Heritage Dental Group",
        locations: "23 locations",
        initials: "JT",
      },
      {
        quote:
          "Scaling from 18 to 35 locations exposed every weakness in our associate development. We brought in Dr. Eric J. Roman and Josey to build enterprise infrastructure. The transformation wasn't just operational, it was cultural. Associates now think like owners.",
        result: "35% production increase, 12% turnover reduction",
        name: "Robert Kim",
        title: "President",
        company: "Cornerstone Dental Partners",
        locations: "35 locations",
        initials: "RK",
      },
    ],
  },
]

const caseStudies = [
  {
    id: "summit-dental-partners",
    company: "Summit Dental Partners",
    stage: "Systems Design",
    locations: "12 locations",
    tagline: "From Chaos to Control: Stopping a $200K Annual Bleed",
    color: "from-teal-500 to-emerald-500",
    stats: [
      { icon: <Users />, label: "Retention", before: "58%", after: "94%" },
      { icon: <DollarSign />, label: "Annual Savings", value: "$200K+" },
      { icon: <Clock />, label: "Transformation Time", value: "6 months" },
      { icon: <TrendingUp />, label: "Production Increase", value: "28%" },
    ],
    challenge:
      "Summit was adding 2-3 locations per year but losing associates faster than they could hire them. Turnover was at 58%, costing $200K annually in recruiting, onboarding, and lost production. The COO was drowning in firefighting.",
    solution:
      "We ran the full diagnostic in week 1, identified gaps in 3 of the 6 Clinical Systems, and installed emergency frameworks in weeks 2-4. By month 3, they had Always-On Hiring and systematic onboarding. By month 6, retention hit 94%.",
    results:
      "In 6 months, Summit transformed from reactive chaos to systematic excellence. Turnover dropped from 58% to 94%, saving $200K+ annually. Associate production increased 28% as new hires ramped faster with the 10-Step Playbook.",
    testimonial: {
      quote:
        "We were losing $200K annually to turnover and underperformance. Dr. Eric J. Roman and Josey diagnosed our gaps in week one, installed emergency systems in weeks 2-4, and by month 6 our associate retention went from 58% to 94%. The ROI was undeniable.",
      name: "Sarah Martinez",
      title: "COO, Summit Dental Partners",
      initials: "SM",
    },
  },
  {
    id: "heritage-dental-group",
    company: "Heritage Dental Group",
    stage: "Scale + Infrastructure",
    locations: "23 locations",
    tagline: 'The $2M Gap: Fixing "Good Enough" Systems at Scale',
    color: "from-purple-500 to-pink-500",
    stats: [
      { icon: <DollarSign />, label: "Revenue Recovery", value: "$2M annually" },
      { icon: <TrendingUp />, label: "Avg Production Lift", before: "$35K", after: "$58K" },
      { icon: <Users />, label: "Associates Impacted", value: "47 dentists" },
      { icon: <Clock />, label: "Implementation", value: "9 months" },
    ],
    challenge:
      "Heritage had systems, but associates were plateauing at $35K when industry benchmarks suggested $60K was achievable. The CCO knew something was broken but couldn't identify the gaps. It was costing them millions.",
    solution:
      "The diagnostic revealed they had 3 of the 6 Clinical Systems, but missing Clear Expectations, KPIs, and Clinical Leadership. We installed the missing systems enterprise-wide, trained 8 clinical directors, and implemented the 90-Day Rhythm.",
    results:
      "Within 9 months, average associate production jumped from $35K to $58K across 47 associates. The hidden gaps were costing $2M annually, now recovered. Heritage transformed from 'good enough' to systematic excellence.",
    testimonial: {
      quote:
        "We had systems, but associates were still plateauing at $35K when they should've been at $60K. The diagnostic revealed we had 3 of the 6 Clinical Systems, but the gaps were costing us $2M annually. Six months later, we're systematic across all 23 locations.",
      name: "Jennifer Thompson",
      title: "Chief Clinical Officer, Heritage Dental Group",
      initials: "JT",
    },
  },
  {
    id: "pacific-dental-group",
    company: "Pacific Dental Group",
    stage: "Foundation Building",
    locations: "3 locations",
    tagline: "Building Right From Day One: First Associate to $40K in 60 Days",
    color: "from-blue-500 to-cyan-500",
    stats: [
      { icon: <TrendingUp />, label: "First Month Production", value: "$28K" },
      { icon: <TrendingUp />, label: "Second Month Production", value: "$40K" },
      { icon: <Clock />, label: "Time to Profitability", value: "90 days" },
      { icon: <Users />, label: "Turnover Risk", value: "Eliminated" },
    ],
    challenge:
      "Pacific was preparing to hire their first associate but terrified of the horror stories they'd heard. They wanted to build the infrastructure before chaos hit, not after.",
    solution:
      "We installed all 6 Clinical Systems before they hired. Built Clear Expectations, KPIs, Trust-Building Meetings, Training protocols, Always-On Hiring pipeline, and Clinical Leadership framework. When the associate started, the playbook was ready.",
    results:
      "Their first associate hit $28K in month one, $40K in month two, and was fully profitable by month three. No chaos, no surprises, just systematic excellence from day one. They've since scaled to 5 associates using the same framework.",
    testimonial: {
      quote:
        "We built the 6 Clinical Systems before hiring our first associate. When we finally brought her on, she hit $40K in her second month. No chaos, no surprises, just the playbook working exactly as promised.",
      name: "Michael Chen",
      title: "Founder, Pacific Dental Group",
      initials: "MC",
    },
  },
]

const videoTestimonials = [
  {
    name: "Sarah Martinez",
    title: "COO, Summit Dental Partners",
    duration: "3:42",
    quote: "From 30% turnover to single digits in 6 months",
    initials: "SM",
  },
  {
    name: "Michael Chen",
    title: "Founder, Pacific Dental Group",
    duration: "2:18",
    quote: "First associate to $40K in 60 days",
    initials: "MC",
  },
  {
    name: "Jennifer Thompson",
    title: "CCO, Heritage Dental Group",
    duration: "4:05",
    quote: "$2M in hidden gaps recovered",
    initials: "JT",
  },
]

export default function ProofPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl z-50 border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 text-slate-900 font-semibold text-xl">
            <div className="w-9 h-9 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 90 90" className="text-white">
                <rect x="25" y="45" width="5" height="20" rx="1" fill="currentColor" />
                <rect x="35" y="40" width="5" height="25" rx="1" fill="currentColor" />
                <rect x="45" y="35" width="5" height="30" rx="1" fill="currentColor" />
                <rect x="55" y="30" width="5" height="35" rx="1" fill="currentColor" />
              </svg>
            </div>
            <span>Dental Associate Growth</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />

      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Real Transformations.
            <br />
            <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
              Real Results.
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed">
            Don't take our word for it. See the measurable transformations from dental organizations using the Recipe +
            Rhythm framework.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-12">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">$1B+</div>
              <div className="text-slate-600">Coached Revenue</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">100+</div>
              <div className="text-slate-600">Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">90 Days</div>
              <div className="text-slate-600">Avg. Transformation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-slate-900 mb-4 tracking-tight">Watch Their Stories</h2>
            <p className="text-lg text-slate-600">Hear directly from the leaders who transformed their organizations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative bg-slate-900 rounded-2xl overflow-hidden mb-4 aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-lg text-white text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {video.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">{video.name}</div>
                    <div className="text-sm text-slate-600 mb-2">{video.title}</div>
                    <div className="text-sm text-teal-600 italic">"{video.quote}"</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider - Case Studies */}
      <section className="py-12 px-6 bg-gradient-to-r from-teal-500 to-purple-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">Deep Dive: Case Studies</h2>
          <p className="text-xl text-white/90">
            Detailed breakdowns of real transformations with metrics, timelines, and outcomes
          </p>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((study, idx) => (
        <section key={study.id} className={`py-20 px-6 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`inline-block bg-gradient-to-r ${study.color} text-white px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide`}
                >
                  {study.stage}
                </div>
                <div className="text-slate-600">{study.locations}</div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">{study.company}</h2>
              <p className="text-2xl text-slate-600">{study.tagline}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {study.stats.map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-teal-500 transition-all"
                >
                  <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-sm text-slate-600 mb-2">{stat.label}</div>
                  {stat.before && stat.after ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-slate-400 line-through">{stat.before}</span>
                      <ArrowRight className="w-4 h-4 text-teal-600" />
                      <span className="text-2xl font-bold text-teal-600">{stat.after}</span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Story Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">The Challenge</h3>
                <p className="text-slate-600 leading-relaxed">{study.challenge}</p>
              </div>
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">The Solution</h3>
                <p className="text-slate-600 leading-relaxed">{study.solution}</p>
              </div>
              <div className="bg-white border-2 border-teal-500 rounded-2xl p-8 bg-teal-50/50">
                <h3 className="text-xl font-semibold text-teal-900 mb-4">The Results</h3>
                <p className="text-slate-700 leading-relaxed font-medium">{study.results}</p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 lg:p-12 text-white">
              <Quote className="w-12 h-12 text-white/20 mb-6" />
              <p className="text-xl lg:text-2xl leading-relaxed mb-8 italic">"{study.testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${study.color} rounded-xl flex items-center justify-center text-white font-semibold text-lg`}
                >
                  {study.testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-lg">{study.testimonial.name}</div>
                  <div className="text-white/80">{study.testimonial.title}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Section Divider - More Testimonials */}
      <section className="py-12 px-6 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">More Success Stories</h2>
          <p className="text-xl text-white/90">Organized by stage: see results from organizations like yours</p>
        </div>
      </section>

      {/* Written Testimonials by Stage */}
      {testimonialCategories.map((category, catIdx) => (
        <section key={catIdx} className={`py-20 px-6 ${catIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
          <div className="max-w-7xl mx-auto">
            {/* Category Header */}
            <div className="text-center mb-16">
              <div
                className={`inline-block bg-gradient-to-r ${category.color} text-white px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide mb-4`}
              >
                {category.subtitle}
              </div>
              <h2 className="text-4xl font-semibold text-slate-900 mb-4 tracking-tight">{category.stage}</h2>
            </div>

            {/* Testimonials Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {category.testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-10 border-2 border-slate-200 hover:border-teal-500 hover:shadow-xl transition-all"
                >
                  {/* Quote */}
                  <div className="relative mb-8">
                    <Quote className="absolute -top-2 -left-2 w-12 h-12 text-teal-500/20" />
                    <p className="text-lg text-slate-700 leading-relaxed relative pl-8">{testimonial.quote}</p>
                  </div>

                  {/* Result Badge */}
                  <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-6">
                    <div className="text-sm font-medium text-teal-900">✓ {testimonial.result}</div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-start gap-4 pt-6 border-t border-slate-200">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white font-semibold flex-shrink-0`}
                    >
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-lg">{testimonial.name}</div>
                      <div className="text-slate-600">{testimonial.title}</div>
                      <div className="text-sm text-slate-500">
                        {testimonial.company} • {testimonial.locations}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Clinical Leadership Journal */}
      <ClinicalLeadershipJournal />

      <Footer hideToolkit />
    </main>
  )
}
