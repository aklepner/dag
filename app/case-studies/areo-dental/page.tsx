"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, ChevronDown, Users, Target, Lightbulb, Rocket, Sparkles, CheckCircle2, ArrowRight, Quote, X } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/footer"

const chapters = [
  { id: "partnership", label: "The Partnership", number: "01" },
  { id: "challenge", label: "The Challenge", number: "02" },
  { id: "playbook", label: "The Playbook", number: "03" },
  { id: "results", label: "The Results", number: "04" },
  { id: "whats-next", label: "What's Next", number: "05" },
]

export default function AreoCaseStudy() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [activeChapter, setActiveChapter] = useState<string | null>(null)
  const [showChapterNav, setShowChapterNav] = useState(false)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setScrollProgress(progress)

      // Show chapter nav after scrolling past hero
      setShowChapterNav(scrolled > windowHeight * 0.8)

      // Determine active chapter
      for (let i = chapters.length - 1; i >= 0; i--) {
        const element = document.getElementById(chapters[i].id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveChapter(chapters[i].id)
            break
          }
        }
      }

      const newVisibleSections = new Set<number>()
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top < windowHeight * 0.8) {
            newVisibleSections.add(index)
          }
        }
      })
      setVisibleSections(newVisibleSections)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const Section = ({ children, index, className = "" }: { children: React.ReactNode; index: number; className?: string }) => (
    <div
      ref={(el) => { sectionsRef.current[index] = el }}
      className={`transition-all duration-700 ${
        visibleSections.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )

  return (
    <div className="bg-white text-slate-900 font-sans">
      <Navigation />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-purple-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Chapter Sub-Navigation */}
      <div 
        className={`fixed top-[92px] left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 transition-all duration-300 ${
          showChapterNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
            {chapters.map((chapter, idx) => (
              <button
                key={chapter.id}
                onClick={() => {
                  const element = document.getElementById(chapter.id)
                  if (element) {
                    const offset = 150
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY
                    window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeChapter === chapter.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className={`text-xs ${activeChapter === chapter.id ? "text-teal-400" : "text-slate-400"}`}>
                  {chapter.number}
                </span>
                {chapter.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section with Video */}
      <section className="min-h-screen relative overflow-hidden bg-slate-900 pt-24">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/proof" className="hover:text-teal-400 transition-colors">Case Studies</Link>
            <span>/</span>
            <span className="text-teal-400">Areo Dental Group</span>
          </div>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-medium mb-6">
                <Sparkles size={14} />
                Success Story
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                How do you turn <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">associates</span> into <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">leaders?</span>
              </h1>
              
              <p className="text-xl text-slate-400 leading-relaxed mb-8">
                This is the story of Areo Dental Group, a growing DSO that discovered the secret to unlocking associate potential: systematic excellence meets proven methodology. It&apos;s about what happens when you stop telling associates what to do, and start showing them why it matters.
              </p>

              {/* Key Stats Row */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">8</div>
                  <div className="text-sm text-slate-500">Locations</div>
                </div>
                <div className="w-px bg-slate-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">15</div>
                  <div className="text-sm text-slate-500">Associates</div>
                </div>
                <div className="w-px bg-slate-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">35-40%</div>
                  <div className="text-sm text-slate-500">Productivity Spike</div>
                </div>
                <div className="w-px bg-slate-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">90</div>
                  <div className="text-sm text-slate-500">Day Transformation</div>
                </div>
              </div>

              <a href="#story" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium group">
                Read the full story
                <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Video Player */}
            <div className="relative">
              <div 
                className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-teal-500/10 cursor-pointer group"
                onClick={() => setVideoPlaying(true)}
              >
                {/* Video Thumbnail/Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-slate-800" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-teal-500/30">
                    <Play size={32} className="text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Video Label */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="text-xs text-slate-400 mb-1">WATCH THE INTERVIEW</div>
                  <div className="text-white font-semibold">Dr. Nagaraj & Dr. Guglani share their transformation story</div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoPlaying && (
        <div 
          className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setVideoPlaying(false)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setVideoPlaying(false)}
            >
              <X size={20} />
            </button>
            <iframe
              src="https://player.vimeo.com/video/1149352520?h=9386b0798a&autoplay=1&title=0&byline=0&portrait=0"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Story Section - White Background */}
      <section id="story" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Chapter 1: The Partnership */}
          <div id="partnership" />
          <Section index={0} className="mb-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white">
                <Users size={22} />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wider text-teal-600 uppercase">Chapter 01</div>
                <h2 className="text-3xl font-bold text-slate-900">The Partnership</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p className="text-2xl text-slate-800 font-light">
                Every great transformation begins with a chance encounter. This one began at a conference.
              </p>

              <p>
                Dr. Abhishek Nagaraj and Dr. Anoushka Guglani, co-founders and co-CEOs of Areo Dental Group, had been building something special in Illinois and Indiana. Seven locations. Nearly fifteen associates. A culture so strong that their Glassdoor ratings would make most DSOs envious.
              </p>

              <p>
                But they knew something was missing. Despite their success, they watched their associates struggle with the same challenges: understanding metrics, driving productivity, taking ownership of patient outcomes. They could tell them what to do. But telling wasn&apos;t teaching.
              </p>

              {/* Quote Card */}
              <div className="my-10 p-8 bg-slate-50 border-l-4 border-teal-500 rounded-r-xl relative">
                <Quote size={32} className="text-slate-200 absolute top-4 right-4" />
                <p className="text-xl italic text-slate-700 mb-4 relative z-10">
                  &ldquo;We&apos;ve known Dr. Eric J. Roman and Josie for a few years now. We met them at a conference, they were the speakers, and they kind of changed the way we view things. It was absolutely incredible.&rdquo;
                </p>
                <div className="text-teal-600 font-semibold">— Dr. Anoushka Guglani, Co-CEO</div>
              </div>

              <p>
                That conference changed everything. Dr. Eric J. Roman and Josey Sewell weren&apos;t just speakers, they were systems people. People who understood that associate development isn&apos;t about motivation. It&apos;s about methodology.
              </p>
            </div>
          </Section>

          {/* Chapter 2: The Challenge */}
          <div id="challenge" />
          <Section index={1} className="mb-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white">
                <Target size={22} />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wider text-teal-600 uppercase">Chapter 02</div>
                <h2 className="text-3xl font-bold text-slate-900">The Challenge</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p className="text-2xl text-slate-800 font-light">
                The hardest part of leading associates isn&apos;t the clinical side. It&apos;s the leadership side.
              </p>

              <p>
                Think about what dental schools teach. Years of clinical technique. Occlusion, endodontics, prosthodontics. But leadership? Sales? Patient communication? That gets maybe a few hours, if you&apos;re lucky.
              </p>

              {/* The Gap Card */}
              <div className="my-10 grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-2xl mb-3">🎓</div>
                  <div className="font-bold text-slate-900 mb-2">What Dental School Teaches</div>
                  <p className="text-slate-600 text-base">&ldquo;You&apos;re the expert. Patients need to listen to your clinical judgment.&rdquo;</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-teal-50 to-purple-50 border border-teal-200 rounded-xl">
                  <div className="text-2xl mb-3">🌍</div>
                  <div className="font-bold text-slate-900 mb-2">What Reality Requires</div>
                  <p className="text-slate-600 text-base">&ldquo;You&apos;re a guide. Patients have already consulted Google, your job is to navigate them through their objections.&rdquo;</p>
                </div>
              </div>

              {/* Quote Card */}
              <div className="my-10 p-8 bg-slate-50 border-l-4 border-slate-900 rounded-r-xl relative">
                <Quote size={32} className="text-slate-200 absolute top-4 right-4" />
                <p className="text-xl italic text-slate-700 mb-4 relative z-10">
                  &ldquo;The opportunity with associate dentists is: how do you drive productivity where it&apos;s not forced upon them? Where they don&apos;t feel like they&apos;re being told what to do, but where it becomes their idea of why productivity is better for them and for the patient?&rdquo;
                </p>
                <div className="text-slate-900 font-semibold">— Dr. Abhishek Nagaraj, Co-CEO</div>
              </div>

              <p>
                They needed an outside voice. Someone with authority. Someone who could say the exact same things, but have it land differently. Someone who had been in the trenches and emerged with a system that actually worked.
              </p>

              <p className="text-xl text-slate-800 font-light text-center py-6">
                They knew exactly who to call.
              </p>
            </div>
          </Section>

          {/* Chapter 3: The Playbook */}
          <div id="playbook" />
          <Section index={2} className="mb-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white">
                <Lightbulb size={22} />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wider text-teal-600 uppercase">Chapter 03</div>
                <h2 className="text-3xl font-bold text-slate-900">The Playbook</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p className="text-2xl text-slate-800 font-light">
                They didn&apos;t need another consultant. They needed a system they could own.
              </p>

              <p>
                When Areo Dental engaged with the DAG Playbook, they got more than coaching, they got a complete methodology for transforming how associates think, perform, and lead. The program included everything: the 6 Clinical Systems foundation, the Associate Playbook, and the 90-Day Rhythm that makes it all stick.
              </p>

              <p>
                One component was an intensive on-site workshop: Dr. Eric J. Roman spending a full day with all 15 associates. It was a bold decision. Closing an entire day of production across multiple locations isn&apos;t cheap. But Dr. Nagaraj and Dr. Guglani understood: the cost of not investing in your people is far higher than the cost of a training day.
              </p>

              {/* Core Shifts Framework */}
              <div className="my-10 p-8 bg-slate-900 rounded-2xl text-white">
                <div className="text-xl font-bold mb-6">The Core Shifts from the DAG Playbook</div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500/20 to-purple-500/20 flex items-center justify-center text-xl">👨‍⚕️</div>
                    <div>
                      <div className="font-bold text-white mb-1">From Expert to Guide</div>
                      <p className="text-slate-400 text-base">Patients aren&apos;t looking for authorities anymore. What they need is someone to navigate them through their fears and objections.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500/20 to-purple-500/20 flex items-center justify-center text-xl">🎯</div>
                    <div>
                      <div className="font-bold text-white mb-1">From Passive to Leader</div>
                      <p className="text-slate-400 text-base">The dentist has the most to gain and the most to lose. Taking ownership isn&apos;t optional, it&apos;s the job.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500/20 to-purple-500/20 flex items-center justify-center text-xl">💰</div>
                    <div>
                      <div className="font-bold text-white mb-1">Production = Patient Impact</div>
                      <p className="text-slate-400 text-base">Higher production means more patients getting the care they actually need.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                But the workshop was just the catalyst. What made the transformation stick was the ongoing rhythm: weekly touchpoints, monthly reviews, and a systematic approach to tracking progress. The associates weren&apos;t just motivated for a day. They were equipped with a system they could follow for the rest of their careers.
              </p>

              {/* Quote Card */}
              <div className="my-10 p-8 bg-slate-50 border-l-4 border-teal-500 rounded-r-xl relative">
                <Quote size={32} className="text-slate-200 absolute top-4 right-4" />
                <p className="text-xl italic text-slate-700 mb-4 relative z-10">
                  &ldquo;You can listen to them for 8 hours straight and just be enraptured. That&apos;s Dr. Eric J. Roman&apos;s true gift. Not only is the content amazing, but you can have amazing content and have poor delivery, and no one&apos;s gonna pay attention. He&apos;s just so phenomenal at that.&rdquo;
                </p>
                <div className="text-teal-600 font-semibold">— Dr. Anoushka Guglani, Co-CEO</div>
              </div>
            </div>
          </Section>

          {/* Chapter 4: The Results */}
          <div id="results" />
          <Section index={3} className="mb-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white">
                <Rocket size={22} />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wider text-teal-600 uppercase">Chapter 04</div>
                <h2 className="text-3xl font-bold text-slate-900">The Results</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p className="text-2xl text-slate-800 font-light">
                September. The engagement begins. October. Everything changes.
              </p>

              {/* Results Card */}
              <div className="my-10 p-8 bg-gradient-to-br from-teal-50 to-purple-50 border-2 border-teal-200 rounded-2xl">
                <div className="text-center mb-8">
                  <div className="text-xs font-bold tracking-widest text-teal-600 mb-2">ONE MONTH LATER</div>
                  <div className="text-2xl font-bold text-slate-900">The Numbers Speak</div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500 mb-2">35-40%</div>
                    <div className="font-bold text-slate-900 mb-1">Productivity Spike</div>
                    <div className="text-sm text-slate-500">For new grad dentists</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-5xl font-bold text-slate-900 mb-2">2x</div>
                    <div className="font-bold text-slate-900 mb-1">Production Growth</div>
                    <div className="text-sm text-slate-500">$39K → $77K monthly</div>
                  </div>
                </div>

                <div className="p-4 bg-teal-100/50 rounded-xl text-center">
                  <p className="text-slate-700">
                    <strong className="text-slate-900">One dentist&apos;s story:</strong> September production per patient visit was $334, totaling $39,000. In October? $510 per patient visit. <span className="text-teal-700 font-bold">$77,000 total. Nearly doubled in 30 days.</span>
                  </p>
                </div>
              </div>

              {/* Quote Card */}
              <div className="my-10 p-8 bg-slate-900 rounded-2xl relative">
                <p className="text-2xl italic text-white mb-4 relative z-10">
                  &ldquo;If that doesn&apos;t give you goosebumps, I don&apos;t know what else would.&rdquo;
                </p>
                <div className="text-teal-400 font-semibold">— Dr. Abhishek Nagaraj, Co-CEO</div>
              </div>

              {/* Results List */}
              <div className="my-10 space-y-3">
                {[
                  { title: "Aha Moments Everywhere", desc: "Associates suddenly understood why they were tracking metrics, not as surveillance, but as a feedback loop." },
                  { title: "Leadership Awakened", desc: "Dentists started seeing themselves as leaders in the operatory, not just technicians." },
                  { title: "Patient Care Reframed", desc: "The team realized that when they don't do the care patients need, productivity is down AND the patient suffers more later." },
                  { title: "Daily Huddles Non-Negotiable", desc: "What used to happen 70% of the time became 100%. Every doctor, every day." },
                  { title: "Power Pass Adopted", desc: "The entire team aligned on language, not just handoffs, but powerful transfers of energy and authority." },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-teal-300 transition-colors">
                    <CheckCircle2 size={24} className="flex-shrink-0 mt-0.5 text-teal-500" />
                    <div>
                      <div className="font-bold text-slate-900 mb-1">{item.title}</div>
                      <p className="text-slate-600 text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Chapter 5: What's Next */}
          <div id="whats-next" />
          <Section index={4} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white">
                <Sparkles size={22} />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wider text-teal-600 uppercase">Chapter 05</div>
                <h2 className="text-3xl font-bold text-slate-900">What&apos;s Next</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p className="text-2xl text-slate-800 font-light">
                This isn&apos;t the end of the story. It&apos;s the beginning of systematic excellence.
              </p>

              <p>
                For Dr. Nagaraj and Dr. Guglani, the DAG Playbook confirmed something they&apos;d always believed: that systematic coaching beats ad-hoc motivation every time. That associates don&apos;t need cheerleaders, they need frameworks. That the right methodology can accomplish in months what years of internal conversations cannot.
              </p>

              {/* Quote Card */}
              <div className="my-10 p-8 bg-slate-50 border-l-4 border-teal-500 rounded-r-xl relative">
                <Quote size={32} className="text-slate-200 absolute top-4 right-4" />
                <p className="text-xl italic text-slate-700 mb-4 relative z-10">
                  &ldquo;They opened our minds to the possibilities. They&apos;re such positive forces that I look at them as mentors myself. Their attitude towards dentistry just rubs off on everybody.&rdquo;
                </p>
                <div className="text-teal-600 font-semibold">— Dr. Anoushka Guglani, Co-CEO</div>
              </div>

              {/* Future Stats */}
              <div className="my-10 grid md:grid-cols-3 gap-4">
                <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-4xl font-bold text-slate-900 mb-2">8+</div>
                  <div className="font-medium text-slate-900 mb-1">Locations & Growing</div>
                  <div className="text-sm text-slate-500">Expansion continues</div>
                </div>
                <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500 mb-2">100%</div>
                  <div className="font-medium text-slate-900 mb-1">Daily Huddles</div>
                  <div className="text-sm text-slate-500">Non-negotiable accountability</div>
                </div>
                <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-4xl font-bold text-slate-900 mb-2">∞</div>
                  <div className="font-medium text-slate-900 mb-1">Impact</div>
                  <div className="text-sm text-slate-500">Patients & teams transformed</div>
                </div>
              </div>

              {/* Formula */}
              <div className="my-10 p-8 bg-slate-900 rounded-2xl text-white">
                <div className="text-xl font-bold mb-6 text-center">The DAG Formula</div>
                <div className="space-y-4 text-center">
                  <div className="text-lg text-slate-300"><strong className="text-white">6 Clinical Systems</strong> <span className="text-slate-500">(The foundation that enables everything)</span></div>
                  <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">+</div>
                  <div className="text-lg text-slate-300"><strong className="text-white">Associate Playbook</strong> <span className="text-slate-500">(The recipe for associate success)</span></div>
                  <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">+</div>
                  <div className="text-lg text-slate-300"><strong className="text-white">90-Day Rhythm</strong> <span className="text-slate-500">(The system that makes it stick)</span></div>
                  <div className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400 pt-4">=</div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400 pt-2">Transformational Results</div>
                </div>
              </div>

              <p className="text-xl text-slate-800 font-light text-center py-6">
                Areo Dental installed the system. Their associates found their path. And the patients? They found dentists who finally understand how to guide them to the care they need.
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-900/30 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">Your</span> Associates?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            If you&apos;re tired of telling associates what to do and watching nothing change, there&apos;s a better way. Systematic coaching that turns followers into leaders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-400 hover:to-purple-400 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-105"
            >
              Take the Associate Performance Diagnostic
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="text-sm text-slate-500">
            10 minutes • Instant personalized report • No credit card
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
