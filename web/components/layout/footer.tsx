import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-white tracking-tight">
                E-Cell <span className="text-primary">League</span> 2026
              </span>
            </Link>

            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              The premier national-level college entrepreneurship competition.
              Build, scale, and win.
            </p>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-2xl font-semibold text-white mb-4">
                {" "}
                Follow Us{" "}
              </h4>
              <div className="flex items-center gap-5">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ecell_rntu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="E-Cell RNTU Instagram"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-9 h-9"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/e&i-cell-rntu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="E-Cell RNTU LinkedIn"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-9 h-9"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/tracks"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Competitions
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Guidelines
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Overall Coordinators */}
        <div className="mt-12 pt-8 border-t border-border">
          <h4 className="text-sm font-semibold text-white mb-5 text-center">
            Overall Coordinators
          </h4>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
            {/* <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-white">Md Sadab Manjar</span>
              <a
                href="tel:+919142692038"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                +91 9142692038
              </a>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" /> */}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-white">Vansh Agrawal</span>
              <a
                href="tel:+916307023247"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                +91 6307023247
              </a>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-white">Dilip Gupta</span>
              <a
                href="tel:+917870367939"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                +91 9693028104
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} E-Cell League. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
