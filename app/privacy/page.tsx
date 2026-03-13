import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/navigation"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Dental Associate Growth.",
}

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Contact information you provide through forms (name, email, phone number, practice details)",
      "Diagnostic responses submitted through our Readiness Diagnostic tool",
      "Newsletter subscription details for the Clinical Leadership Journal",
      "Usage data including pages visited, time on site, and referring sources",
      "Cookies and similar tracking technologies as described below",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "Respond to inquiries and discovery call requests",
      "Deliver personalized diagnostic results and framework recommendations",
      "Send the Clinical Leadership Journal newsletter and relevant updates",
      "Improve our website, services, and user experience",
      "Manage relationships through our CRM system",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "Go High Level (GHL) \u2014 CRM, email automation, and form processing",
      "Google Analytics \u2014 website traffic analysis and user behavior insights",
      "Vercel \u2014 website hosting and performance optimization",
      "Calendly \u2014 discovery call scheduling and calendar management",
    ],
  },
  {
    title: "Email Communications",
    content: [
      "You may unsubscribe from any email communication at any time using the unsubscribe link included in every email.",
      "We honor all unsubscribe requests within 10 business days.",
      "For direct removal requests, contact eric@dentalassociategrowth.com.",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy.",
      "Upon request, we will delete your data within 30 days. Contact us at eric@dentalassociategrowth.com to submit a deletion request.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.",
      "While we strive to protect your data, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "Access \u2014 Request a copy of the personal data we hold about you",
      "Correction \u2014 Request correction of inaccurate or incomplete data",
      "Deletion \u2014 Request deletion of your personal data",
      "Opt-out \u2014 Unsubscribe from marketing communications at any time",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Essential cookies \u2014 Required for basic site functionality and security",
      "Analytics cookies \u2014 Help us understand how visitors interact with our site (Google Analytics)",
      "Marketing cookies \u2014 Used to deliver relevant content and measure campaign effectiveness",
    ],
  },
  {
    title: "Children\u2019s Privacy",
    content: [
      "Our services are designed for dental professionals and practice owners. We do not knowingly collect personal information from individuals under 18 years of age.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. We encourage you to review this page periodically. The \u201CLast updated\u201D date at the top indicates the most recent revision.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Dark Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-teal-500/10 text-teal-400 text-xs font-semibold tracking-wider uppercase rounded-full mb-6">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-lg">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-[720px] mx-auto">
          {/* Intro */}
          <p className="text-slate-600 leading-relaxed mb-12 text-lg">
            Dental Associate Growth ("we," "us," or "our") is committed to protecting the privacy of our website visitors, diagnostic participants, and newsletter subscribers. This policy explains how we collect, use, and safeguard your information when you interact with our website and services.
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{section.title}</h2>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Card */}
          <div className="mt-16 bg-slate-50 rounded-xl border border-slate-200 p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Questions About This Policy?</h3>
            <div className="space-y-2 text-slate-600">
              <p>
                Email:{" "}
                <a
                  href="mailto:eric@dentalassociategrowth.com"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  eric@dentalassociategrowth.com
                </a>
              </p>
              <p>
                Website:{" "}
                <Link href="/" className="text-teal-600 hover:text-teal-700 underline">
                  dentalassociategrowth.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 text-center border-t border-slate-200">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Dental Associate Growth. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
