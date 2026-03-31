"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const dummyProjects = [
  {
    title: "Nexa Commerce Cloud",
    category: "E-Commerce Platform",
    description:
      "Multi-vendor commerce dashboard with order automation, real-time analytics, and smart inventory syncing.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    title: "PulseOps AI Assistant",
    category: "AI Automation",
    description:
      "Internal ops copilot that automates repetitive workflows, summarizes tickets, and predicts task priority.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    tags: ["OpenAI", "Python", "Automation"],
  },
  {
    title: "FinTrack Vision",
    category: "FinTech Dashboard",
    description:
      "Financial intelligence suite with forecasting widgets, KPI snapshots, and secure role-based reporting.",
    image:
      "https://images.unsplash.com/photo-1551281044-8b0d3f4fef89?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "PostgreSQL", "Charts"],
  },
  {
    title: "HealthFlow Connect",
    category: "Healthcare SaaS",
    description:
      "Telehealth experience with appointment routing, patient timelines, and integrated communication channels.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tags: ["TypeScript", "WebRTC", "HIPAA"],
  },
  {
    title: "RoutePilot Logistics",
    category: "Supply Chain",
    description:
      "AI-powered dispatch planner optimizing delivery routes with live ETA updates and fleet health insights.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Maps", "Machine Learning", "IoT"],
  },
  {
    title: "EduSpark Learning Hub",
    category: "EdTech Platform",
    description:
      "Personalized learning portal with adaptive modules, assignment automation, and progress intelligence.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    tags: ["LMS", "Serverless", "Analytics"],
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
            A quick look at selected product experiences and automation systems.
            These are placeholder showcases and will be replaced by real project
            case studies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-3xl overflow-hidden border border-white/10 group"
            >
              <div
                className="h-52 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${project.image})` }}
                role="img"
                aria-label={`${project.title} preview image`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/35 to-transparent" />
                <p className="absolute left-4 top-4 text-xs uppercase tracking-wider bg-black/35 px-3 py-1 rounded-full border border-white/20 text-white/90">
                  {project.category}
                </p>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 border border-white/15 text-secondary-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
