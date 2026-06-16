import Image from "next/image";

const platformLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Bots", href: "#bots" },
  { label: "Pricing", href: "#pricing" },
  { label: "Performance", href: "#performance" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-navy-border">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Logo column */}
          <div className="md:col-span-2">
            <Image
              src="/cardinal-logo.png"
              alt="Cardinal Capital Markets"
              width={729}
              height={660}
              className="h-20 w-auto mb-4"
            />
            <p className="text-muted text-sm mt-3 leading-relaxed max-w-xs">
              Professional swing trading automation for serious market participants.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-5">
              <a
                href="#"
                aria-label="Twitter / X"
                className="text-muted hover:text-cardinal-red transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted hover:text-cardinal-red transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-ivory-text font-semibold uppercase tracking-widest text-xs mb-5">
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-ivory-text text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-ivory-text font-semibold uppercase tracking-widest text-xs mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-ivory-text text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-border pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <p className="font-mono text-xs text-muted">
            © 2025 Cardinal Capital Markets. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted max-w-lg text-left md:text-right leading-relaxed">
            ⚠ Trading involves risk of loss. Cardinal does not provide financial advice.
            Past bot performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
