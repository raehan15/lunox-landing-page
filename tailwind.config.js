/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1200px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        dark: "var(--dark)",
        "dark-2": "var(--dark-2)",
        "dark-surface": "var(--dark-surface)",
        "dark-border": "var(--dark-border)",
        "dark-text": "var(--dark-text)",
        "dark-muted": "var(--dark-muted)",
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "light-border": "var(--light-border)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
      },
      borderRadius: {
        btn: "14px",
        card: "20px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(17,19,24,.06)",
        product: "0 24px 60px rgba(5,7,11,.35)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
