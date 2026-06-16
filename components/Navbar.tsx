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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">

        {/* Banner: bird logo + metallic tagline */}
        <a href="#" className="flex items-center gap-5 min-w-0 flex-shrink">
          <Image
            src="/cardinal-logo.png"
            alt="Cardinal Capital Markets"
            width={729}
            height={660}
            priority
            className="w-auto flex-shrink-0"
            style={{ height: "66px" }}
          />
          <span
            className="hidden xl:block font-serif uppercase whitespace-nowrap select-none"
            style={{
              fontSize: "1.6rem",
              letterSpacing: "0.06em",
              backgroundImage:
                "linear-gradient(180deg,#f7f7f7 0%,#ffffff 16%,#b9b9b9 45%,#6d6d6d 51%,#cfcfcf 57%,#ffffff 82%,#cccccc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              textShadow: "0 1px 2px rgba(0,0,0,0.45)",
            }}
          >
            Swing Trading. Automated. Tested.
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 flex-shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-white/70 hover:text-white text-sm font-semibold tracking-wide transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-cardinal-red to-cardinal-red-mid transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <a
            href="#pricing"
            className="btn-glow bg-cardinal-red hover:bg-cardinal-red-dark text-white text-sm font-bold px-6 py-2.5 rounded-full"
          >
            Get Access
          </a>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
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
                  className="text-white/80 hover:text-white text-lg font-semibold transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-4 bg-cardinal-red hover:bg-cardinal-red-dark text-white font-bold px-6 py-3 rounded-full text-center transition-colors"
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
