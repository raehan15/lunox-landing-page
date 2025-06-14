"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Custom Software Development",
    description:
      "Tailored software solutions that perfectly align with your business needs and scale with your growth.",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Full-Stack Development",
      "Mobile Applications",
      "Cloud-Native Solutions",
      "API Development",
    ],
  },
  {
    title: "AI Automation",
    description:
      "Intelligent automation solutions that streamline operations and unlock new possibilities for your business.",
    icon: "🤖",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Process Automation",
      "ML Model Development",
      "Data Analytics",
      "Intelligent Workflows",
    ],
  },
  {
    title: "SaaS Solutions",
    description:
      "Scalable software-as-a-service platforms designed to transform how you deliver value to your customers.",
    icon: "⚡",
    gradient: "from-emerald-500 to-teal-500",
    features: [
      "Multi-tenant Architecture",
      "Real-time Analytics",
      "Subscription Management",
      "Global Scaling",
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
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
            Comprehensive technology solutions that empower your business to
            thrive in the digital age
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
              className="glass-effect rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="text-6xl mb-6 group-hover:animate-bounce">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">
                {service.title}
              </h3>

              <p className="text-secondary-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-3">
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
                className={`mt-8 w-full py-3 rounded-xl font-semibold bg-gradient-to-r ${service.gradient} text-white hover:shadow-lg transition-all duration-300`}
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
