"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm" : "bg-white/95 backdrop-blur-xl"
      } border-b border-black/[0.08]`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dental-associate-growth-logo.png"
              alt="Dental Associate Growth"
              className="h-auto w-auto max-h-[110px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-9">
            <Link
              href="/case-studies/areo-dental"
              className="text-slate-600 hover:text-slate-900 font-medium text-[15px] transition-colors"
            >
              Results
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 font-medium text-[15px] transition-colors"
            >
              About
            </Link>
            <Link
              href="/pricing"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-600 hover:text-slate-900 font-medium text-[15px] transition-colors"
            >
              Apply
            </Link>
            <Link
              href="/book-call"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium text-[15px] hover:bg-teal hover:-translate-y-0.5 transition-all"
            >
              Fit Assessment Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pt-4 pb-6 flex flex-col gap-4">
            <Link href="/case-studies/areo-dental" className="text-slate-600 font-medium">
              Results
            </Link>
            <Link href="/about" className="text-slate-600 font-medium">
              About
            </Link>
            <Link href="/pricing" className="text-slate-600 font-medium">
              Apply
            </Link>
            <Link href="/book-call" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium text-center">
              Fit Assessment Call
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
