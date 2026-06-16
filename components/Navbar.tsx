"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Bots", href: "#bots" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-md border-b border-navy-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="Cardinal Capital Markets"
            width={180}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-ivory-text/80 hover:text-ivory-text text-sm font-medium tracking-wide transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-cardinal-red transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <a
            href="#pricing"
            className="bg-cardinal-red hover:bg-cardinal-red-dark text-ivory-text text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200"
          >
            Get Access
          </a>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden text-ivory-text p-2 rounded-md hover:bg-navy-surface transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6 pt-16">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-ivory-text/80 hover:text-ivory-text text-lg font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-4 bg-cardinal-red hover:bg-cardinal-red-dark text-ivory-text font-semibold px-6 py-3 rounded-full text-center transition-colors"
              >
                Get Access
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
