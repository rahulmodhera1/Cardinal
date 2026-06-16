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
      <nav className="w-full pl-4 pr-6 lg:pr-8 h-20 flex items-center gap-6">

        {/* Left: logo + wordmark */}
        <a href="#" className="flex items-center gap-4 flex-shrink-0">
          <Image
            src="/cardinal-bird.png"
            alt="Cardinal Capital Markets"
            width={482}
            height={390}
            priority
            className="w-auto flex-shrink-0"
            style={{ height: "54px", transform: "translateY(-5px)" }}
          />
          <div className="flex flex-col justify-center leading-tight">
            <span
              className="font-black uppercase tracking-widest text-white"
              style={{ fontSize: "1.45rem", letterSpacing: "0.12em" }}
            >
              Cardinal
            </span>
            <span
              className="font-semibold uppercase tracking-[0.22em] text-cardinal-red"
              style={{ fontSize: "0.6rem" }}
            >
              Professional Trading Solutions
            </span>
          </div>
        </a>

        {/* Center: nav links spread across the open space */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-10 lg:gap-14">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-white/60 hover:text-white text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 group py-1"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 rounded-full bg-gradient-to-r from-cardinal-red to-cardinal-red-mid transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="hidden md:flex flex-shrink-0">
          <a
            href="#pricing"
            className="btn-glow bg-cardinal-red hover:bg-cardinal-red-dark text-white text-[0.8rem] font-bold uppercase tracking-wider px-7 py-2.5 rounded-full"
          >
            Get Access
          </a>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden ml-auto text-white p-2 rounded-md hover:bg-white/10 transition-colors"
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
