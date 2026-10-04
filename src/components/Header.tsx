"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { PillButton } from "@/components/ui/Button";

const NAV_ITEMS = [
  { label: "Services", href: "/#services", id: "services" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "Process", href: "/#process", id: "process" },
  { label: "Stack", href: "/#stack", id: "stack" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const updateNavTheme = useCallback(() => {
    const probeY = 40;
    const sections = document.querySelectorAll<HTMLElement>("section[id], footer[id]");
    let currentId = "hero";
    let themeDark = true;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom > probeY) {
        currentId = section.id;
        themeDark = section.dataset.navTheme !== "light";
      }
    });

    setActiveSection(currentId);
    setIsDark(themeDark);
  }, []);

  useEffect(() => {
    updateNavTheme();
    window.addEventListener("scroll", updateNavTheme, { passive: true });
    window.addEventListener("resize", updateNavTheme);
    return () => {
      window.removeEventListener("scroll", updateNavTheme);
      window.removeEventListener("resize", updateNavTheme);
    };
  }, [updateNavTheme]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const path = window.location.pathname;
    const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
    const onHome = path === "/";

    if (!onHome) {
      setIsMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    setIsMobileMenuOpen(false);

    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement | number, o?: object) => void } }).__lenis;

    if (hash === "#hero" || hash === "#" || href === "/") {
      if (lenis && !reduceMotion) lenis.scrollTo(0, { duration: 1.1 });
      else window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }

    const el = document.getElementById(hash.replace("#", ""));
    if (!el) return;
    if (lenis && !reduceMotion) lenis.scrollTo(el, { offset: -64, duration: 1.15 });
    else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const shell = isDark
    ? "bg-[rgba(16,20,29,0.78)] text-dark-text border-white/10 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)]"
    : "bg-[rgba(255,255,255,0.72)] text-ink border-ink/10 shadow-[0_18px_50px_-22px_rgba(17,19,24,0.35)]";

  const linkIdle = isDark ? "text-dark-muted hover:text-dark-text" : "text-ink-muted hover:text-ink";

  const cta = isDark
    ? "bg-dark-text text-dark hover:bg-white"
    : "bg-ink text-white hover:bg-black";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`glass-nav mx-auto flex h-[60px] max-w-[1120px] items-center justify-between gap-3 rounded-full border pl-5 pr-2 transition-colors duration-300 sm:h-16 sm:pl-6 ${shell}`}
        >
          <a href="/" onClick={(e) => handleNavClick(e, "/")} className="shrink-0" aria-label="Lunox home">
            <Image
              src="/logo-wordmark.svg"
              alt="Lunox"
              width={250}
              height={61}
              className={`h-8 w-auto sm:h-10 ${isDark ? "logo-on-dark" : "logo-on-light"}`}
              priority
            />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={active ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                    active ? (isDark ? "text-dark-text" : "text-ink") : linkIdle
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="mailto:the.lunox.co@gmail.com"
              className={`hidden items-center rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-300 hover:scale-[1.03] sm:inline-flex ${cta}`}
            >
              Book a Call
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
                isDark ? "border-white/15 text-dark-text" : "border-ink/15 text-ink"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-dark text-dark-text lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-[76px] shrink-0 items-center justify-between px-5 sm:px-8">
              <Image src="/logo-wordmark.svg" alt="Lunox" width={250} height={61} className="logo-on-dark h-9 w-auto" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-5 py-8 sm:px-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="rounded-2xl px-2 py-2.5 font-heading text-[34px] font-semibold tracking-[-0.03em] text-dark-muted hover:text-dark-text sm:text-[40px]"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-8">
                <PillButton href="mailto:the.lunox.co@gmail.com" label="Book a Call" tone="glass" size="md" magnetic={false} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
