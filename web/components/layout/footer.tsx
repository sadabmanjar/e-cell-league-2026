import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-white tracking-tight">E-Cell <span className="text-primary">League</span> 2026</span>
            </Link>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              The premier national-level college entrepreneurship competition. Build, scale, and win.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-text-secondary hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/competitions" className="text-sm text-text-secondary hover:text-white transition-colors">Competitions</Link></li>
              <li><Link href="/leaderboard" className="text-sm text-text-secondary hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link href="/guidelines" className="text-sm text-text-secondary hover:text-white transition-colors">Guidelines</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-sm text-text-secondary hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-text-secondary hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm text-text-secondary hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-text-secondary hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} E-Cell League. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
