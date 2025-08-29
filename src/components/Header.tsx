"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Image
              src="/Logo.svg"
              alt="Lunox Logo"
              width={360}
              height={120}
              className="h-16 lg:h-20 w-auto logo-white"
              priority
            />
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#services"
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
            </motion.a>
            <motion.a
              href="#features"
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
            </motion.a>
            <motion.a
              href="#about"
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
            </motion.a>
            <motion.a
              href="#contact"
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
            </motion.a>
          </div>

          {/* CTA Button */}
          <motion.button
            className="hidden sm:block bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white/90 hover:text-white transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
