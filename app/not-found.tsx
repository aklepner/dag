import Link from "next/link"
import Navigation from "@/components/navigation"

const popularPages = [
  {
    title: "The Framework",
    description: "6 Systems + 10-Step Playbook",
    href: "/pricing#framework",
  },
  {
    title: "Areo Dental Case Study",
    description: "35-40% productivity spike",
    href: "/case-studies/areo-dental",
  },
  {
    title: "Our Story",
    description: "Meet Dr. Eric J. Roman & Josey",
    href: "/about",
  },
  {
    title: "Fit Assessment Call",
    description: "See if we're the right fit",
    href: "/book-call",
  },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-semibold tracking-wider uppercase rounded-full mb-8">
            Page Not Found
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 tracking-tight">
            {"This Page Doesn\u2019t Exist."}
          </h1>
          <p className="text-4xl md:text-5xl font-bold text-teal-500 mb-6 tracking-tight">
            But Your System Should.
          </p>

          {/* Subtext */}
          <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
            {"The page you\u2019re looking for has moved or never existed. Let\u2019s get you back to building systematic excellence."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              {"\u2190 Back to Homepage"}
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-medium hover:border-slate-400 hover:bg-white transition-colors bg-transparent"
            >
              {"See the Partnership \u2192"}
            </Link>
          </div>

          {/* Popular Pages Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-left">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Popular Pages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="block p-4 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-colors"
                >
                  <p className="font-medium text-slate-900 mb-0.5">{page.title}</p>
                  <p className="text-sm text-slate-500">{page.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="py-8 text-center border-t border-slate-200">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Dental Associate Growth. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
