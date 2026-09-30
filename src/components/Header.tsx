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
    const probeY = 48;
    const sections = document.querySelectorAll<HTMLElement>(
      "section[id], footer[id]"
    );
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
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
    ? "bg-[rgba(5,7,11,0.72)] text-dark-text border-dark-border"
    : "bg-[rgba(243,241,236,0.82)] text-ink border-light-border";

  const linkIdle = isDark
    ? "text-dark-muted hover:text-dark-text"
    : "text-ink-muted hover:text-ink";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className={`glass-nav border-b transition-colors duration-250 ${shell}`}>
          <div className="container-site flex h-14 items-center justify-between gap-4">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="shrink-0"
              aria-label="Lunox home"
            >
              <Image
                src="/Logo.svg"
                alt="Lunox"
                width={112}
                height={28}
                className={`h-6 w-auto sm:h-7 ${isDark ? "logo-on-dark" : "logo-on-light"}`}
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
                    className={`relative rounded-btn px-3 py-2 text-[13px] font-medium transition-colors ${
                      active ? (isDark ? "text-dark-text" : "text-ink") : linkIdle
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-line"
                        className="absolute inset-x-3 bottom-1 h-px bg-accent"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex">
                <PillButton
                  href="mailto:the.lunox.co@gmail.com"
                  label="Book a Call"
                  tone={isDark ? "glass" : "solid"}
                  size="sm"
                />
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-btn border lg:hidden ${
                  isDark
                    ? "border-dark-border text-dark-text"
                    : "border-light-border text-ink"
                }`}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
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
            className="fixed inset-0 z-[60] flex flex-col bg-dark text-dark-text lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="container-site flex h-14 items-center justify-between border-b border-dark-border">
              <Image src="/Logo.svg" alt="Lunox" width={112} height={28} className="h-6 w-auto logo-on-dark" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-dark-border"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="container-site flex flex-1 flex-col justify-center gap-2 py-10">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="rounded-btn px-2 py-3 font-heading text-[36px] font-semibold tracking-[-0.03em] text-dark-muted hover:text-dark-text"
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
