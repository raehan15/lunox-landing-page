"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Lightning Fast Performance",
    description:
      "Optimized architectures that deliver exceptional speed and reliability",
    metric: "99.9%",
    metricLabel: "Uptime",
    color: "text-blue-400",
  },
  {
    title: "AI-Powered Intelligence",
    description:
      "Smart automation and intelligent workflows that streamline your business processes",
    metric: "50%",
    metricLabel: "Time Saved",
    color: "text-purple-400",
  },
  {
    title: "Seamless Scaling",
    description:
      "Infrastructure that grows with your business, from startup to enterprise",
    metric: "∞",
    metricLabel: "Scalability",
    color: "text-emerald-400",
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-grade security protocols protecting your most valuable data",
    metric: "100%",
    metricLabel: "Secure",
    color: "text-red-400",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={ref}
      className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Why Choose <span className="gradient-text">Lunox</span>?
          </h2>
          <p className="text-xl text-secondary-300 max-w-4xl mx-auto">
            Experience the difference with our cutting-edge technology stack and
            innovative approach to software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotateX: 0 }
                  : { opacity: 0, y: 80, rotateX: 45 }
              }
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                y: -20,
                rotateY: 5,
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="glass-effect rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-500 group flex flex-col h-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                className={`text-6xl font-bold mb-4 ${feature.color} group-hover:animate-pulse`}
              >
                {feature.metric}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                className={`text-sm uppercase tracking-wider mb-6 ${feature.color}`}
              >
                {feature.metricLabel}
              </motion.div>

              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-secondary-400 text-sm leading-relaxed flex-grow">
                {feature.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.15 + 0.8 }}
                className={`h-0.5 bg-gradient-to-r from-transparent via-current to-transparent mt-6 ${feature.color}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
