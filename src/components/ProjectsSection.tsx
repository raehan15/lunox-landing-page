"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Goofy Guesser",
    category: "Full-Stack Wordle Game",
    description:
      "A real-time collaborative Wordle-style game featuring live group leaderboards, timezone-synchronized daily challenges, and persistent state tracking.",
    image: "/images/goofy_guesser_main.png",
    tags: ["React 19", "TypeScript", "Supabase", "PostgreSQL"],
    link: "https://goofy-guesser-game.vercel.app/",
  },
  {
    title: "Finlo",
    category: "Personal Finance SaaS",
    description:
      "A secure, offline-ready Personal Finance Tracker with wallet budgeting, cryptographic JWT authentication, and interactive Chart.js visualizations.",
    image: "/images/finlo_main.png",
    tags: ["Next.js 16", "Prisma", "PostgreSQL", "Tailwind CSS v4"],
    link: "https://finlo-wallet.vercel.app/",
  },
  {
    title: "Rustagaari Resort Management",
    category: "Offline Desktop Application",
    description:
      "An offline-first resort management desktop app featuring an interactive room reservation calendar, automated invoicing, and a local SQLite database.",
    image: "/images/resort_main.png",
    tags: ["Electron", "Express.js", "SQLite", "JavaScript"],
    link: "#",
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="py-28 px-4 sm:px-6 lg:px-8 bg-secondary-900/70"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Projects We Have <span className="gradient-text">Built</span>
          </h2>
          <p className="text-lg sm:text-xl text-secondary-300 max-w-3xl mx-auto">
            A showcase of our featured applications, demonstrating modern full-stack engineering and interactive user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target={project.link !== "#" ? "_blank" : undefined}
              rel={project.link !== "#" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-3xl overflow-hidden border border-white/10 group block w-full cursor-pointer hover:border-primary-500/30 transition-colors duration-200"
            >
              <div
                className="h-64 sm:h-80 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${project.image})` }}
                role="img"
                aria-label={`${project.title} preview image`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/35 to-transparent" />
                <p className="absolute left-4 top-4 text-xs uppercase tracking-wider bg-black/35 px-3 py-1 rounded-full border border-white/20 text-white/90">
                  {project.category}
                </p>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-primary-300 transition-colors">
                    {project.title}
                  </h3>
                  {project.link !== "#" && (
                    <svg
                      className="w-6 h-6 text-secondary-400 group-hover:text-primary-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 ease-out"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}
                </div>
                <p className="text-secondary-300 leading-relaxed mb-6 text-base sm:text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-white/10 border border-white/15 text-secondary-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

