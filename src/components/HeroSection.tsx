"use client";

import { motion } from "framer-motion";
import { Hero3D } from "@/components/3d/Hero3D";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* 3D Background */}
      <Hero3D />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="gradient-text">LUNOX</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl lg:text-3xl text-secondary-300 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Transforming businesses with cutting-edge{" "}
            <span className="text-primary-400 font-semibold">
              Software Development
            </span>{" "}
            &{" "}
            <span className="text-accent-500 font-semibold">AI Automation</span>
          </motion.p>

          <motion.p
            className="text-lg sm:text-xl text-secondary-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Unleash the power of next-generation SaaS solutions that drive
            innovation, boost efficiency, and accelerate your digital
            transformation journey.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              className="glass-effect px-8 py-4 rounded-2xl text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300 animate-glow"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Transformation
            </motion.button>

            <motion.button
              className="border-2 border-primary-500 px-8 py-4 rounded-2xl text-lg font-semibold text-primary-400 hover:bg-primary-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Services
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
}
