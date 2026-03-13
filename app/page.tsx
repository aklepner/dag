import type { Metadata } from 'next'
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/problem-section"
import { ComparisonSection } from "@/components/comparison-section"
import { FrameworkSection } from "@/components/framework-section"
import { AvatarSelection } from "@/components/avatar-selection"
import { WhyWeBuiltThis } from "@/components/why-we-built-this"
import { Footer } from "@/components/footer"
import Navigation from "@/components/navigation"

export const metadata: Metadata = {
  title: 'Home | Dental Associate Growth',
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ProblemSection />
        <ComparisonSection />
        <FrameworkSection />
        <AvatarSelection />
        <WhyWeBuiltThis />
      </main>
      <Footer />
    </div>
  )
}
