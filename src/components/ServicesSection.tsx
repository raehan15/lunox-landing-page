"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "Transform your digital presence with custom websites that drive results. From sleek corporate sites to powerful e-commerce platforms, we build secure, responsive, and user-focused solutions using both legacy and cutting-edge technologies.",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Custom Website Development",
      "E-commerce Solutions",
      "Responsive Design & UX/UI",
      "Security & Performance Optimization",
    ],
  },
  {
    title: "AI & Machine Learning",
    description:
      "Unlock your data's potential with custom AI solutions that give you a competitive edge. We develop intelligent features that provide actionable insights, automate decision-making, and revolutionize how your business operates.",
    icon: "🤖",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Custom AI/ML Model Development",
      "Data Analytics & Insights",
      "Predictive Intelligence",
      "AI-Powered Business Features",
    ],
  },
  {
    title: "Automation & Bots",
    description:
      "Eliminate repetitive tasks and boost efficiency with smart automation. Our custom bots and workflows, built on platforms like n8n and Make.com, save time, reduce errors, and free your team to focus on what matters most.",
    icon: "⚡",
    gradient: "from-emerald-500 to-teal-500",
    features: [
      "Business Process Automation",
      "Custom Bot Development",
      "Workflow Integration (n8n, Make.com)",
      "Error Reduction & Time Savings",
    ],
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary-800/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Solutions That <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
            Modernize your business with innovative web development, AI, and
            automation solutions designed to increase efficiency and accelerate
            your success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-effect rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="text-6xl mb-6 group-hover:animate-bounce">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">
                {service.title}
              </h3>

              <p className="text-secondary-300 mb-6 leading-relaxed flex-grow">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2 + idx * 0.1,
                    }}
                    className="flex items-center text-sm text-secondary-400"
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}
                    ></div>
                    {feature}
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-xl font-semibold bg-gradient-to-r ${service.gradient} text-white hover:shadow-lg transition-all duration-300 mt-auto`}
              >
                {service.title === "Full-Stack Web Development"
                  ? "Start Your Project"
                  : service.title === "AI & Machine Learning"
                  ? "Explore AI Solutions"
                  : "Automate Your Business"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
