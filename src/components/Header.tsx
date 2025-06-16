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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/logo.png"
              alt="Lunox Logo"
              width={360}
              height={120}
              className="h-24 lg:h-32 w-auto"
              priority
            />
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#services"
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Services
            </motion.a>
            <motion.a
              href="#features"
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Features
            </motion.a>
            <motion.a
              href="#about"
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              About
            </motion.a>
            <motion.a
              href="#contact"
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.a>
          </div>

          {/* CTA Button */}
          <motion.button
            className="hidden sm:block glass-effect px-6 py-2 rounded-xl text-sm font-semibold text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
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
