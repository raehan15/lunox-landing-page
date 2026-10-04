"use client";

import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";

type PillTone = "glass" | "solid" | "outline" | "outline-dark";
type PillSize = "sm" | "md" | "lg";

interface PillButtonProps {
  href: string;
  label: string;
  tone?: PillTone;
  size?: PillSize;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  external?: boolean;
  magnetic?: boolean;
  ariaLabel?: string;
}

function setLight(e: React.PointerEvent<HTMLAnchorElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--bx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--by", `${e.clientY - r.top}px`);
}

/**
 * Pill with a cursor-tracked light, rolling label and an arrow orb that turns
 * toward its destination. The accent only appears inside the orb on hover.
 */
export function PillButton({
  href,
  label,
  tone = "glass",
  size = "md",
  className = "",
  onClick,
  external = false,
  magnetic = true,
  ariaLabel,
}: PillButtonProps) {
  const classes = `pill pill-${tone} pill-${size} group ${className}`;
  const content = (
    <>
      <span className="pill-light" aria-hidden />
      <span className="pill-label">
        <span className="pill-roll" data-text={label}>
          {label}
        </span>
      </span>
      <span className="pill-orb" aria-hidden>
        <ArrowIcon className="h-[15px] w-[15px]" plain />
      </span>
    </>
  );

  const isInternalRoute = href.startsWith("/") && !href.startsWith("/#");
  const link = isInternalRoute ? (
    <Link href={href} className={classes} onPointerMove={setLight} aria-label={ariaLabel}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      className={classes}
      onPointerMove={setLight}
      onClick={onClick}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );

  if (!magnetic) return link;
  return (
    <Magnetic strength={0.2} className="inline-flex">
      {link}
    </Magnetic>
  );
}

interface IconButtonProps {
  onClick: () => void;
  label: string;
  direction: "prev" | "next";
  tone?: "light" | "dark";
}

export function IconButton({ onClick, label, direction, tone = "light" }: IconButtonProps) {
  return (
    <Magnetic strength={0.32} className="inline-flex">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`icon-btn icon-btn-${tone} group`}
      >
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${
            direction === "prev" ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h14m-6-6l6 6-6 6" />
        </svg>
      </button>
    </Magnetic>
  );
}

export function ArrowIcon({ className = "", plain = false }: { className?: string; plain?: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${plain ? "" : "transition-transform duration-300 ease-out group-hover:translate-x-1"} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
    </svg>
  );
}
