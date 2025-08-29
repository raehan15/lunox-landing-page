"use client";

import { motion } from "framer-motion";
import { Hero3D } from "@/components/3d/Hero3D";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient md:hero-gradient mobile-hero-bg pt-24 md:pt-0">
      {/* 3D Background - Hidden on mobile for better performance */}
      <div className="hidden md:block">
        <Hero3D />
      </div>

      {/* Mobile-only animated background */}
      <div className="absolute inset-0 md:hidden">
        <div className="absolute inset-0 bg-secondary-900"></div>

        {/* Animated floating elements - matching website theme */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/5 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-accent-500/8 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary-400/6 rounded-full animate-ping"></div>
        <div className="absolute bottom-60 right-10 w-12 h-12 bg-accent-600/7 rounded-full animate-bounce delay-500"></div>

        {/* Moving gradient overlays - subtle and matching theme */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-500/15 to-primary-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="gradient-text">LUNOX</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-2xl lg:text-3xl text-white/90 mb-6 sm:mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Transforming businesses with cutting-edge{" "}
            <span className="text-blue-400 font-semibold">
              Software Development
            </span>{" "}
            & <span className="text-cyan-400 font-semibold">AI Automation</span>
          </motion.p>

          <motion.p
            className="text-base sm:text-xl text-white/70 mb-8 sm:mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Unleash the power of next-generation SaaS solutions that drive
            innovation, boost efficiency, and accelerate your digital
            transformation journey.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {/* Get Started button - hidden on mobile */}
            <motion.button
              className="hidden sm:block w-full sm:w-auto glass-effect px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              Start Your Transformation
            </motion.button>

            {/* Explore Services button - visible on all screens */}
            <motion.button
              className="w-full sm:w-auto border-2 border-primary-500 bg-primary-500/10 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold text-primary-400 hover:bg-primary-500/20 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              Explore Our Services
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Desktop only */}
      <motion.div
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
