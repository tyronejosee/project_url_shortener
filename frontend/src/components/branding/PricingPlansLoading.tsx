"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PricingPlansLoading() {
  // States
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    "Verifying subscription...",
    "Activating premium benefits...",
    "Preparing your experience...",
  ];

  // Effects
  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <main className="h-[calc(100vh-10vh)] flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        {/* Premium Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mx-auto"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 p-0.5"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl"
                >
                  ⭐
                </motion.div>
              </div>
            </motion.div>

            {/* Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-violet-400 rounded-full"
                style={{
                  top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 40}px`,
                  left: `${20 + Math.cos((i * 60 * Math.PI) / 180) * 40}px`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome! 🎉
          </h1>
          <p className="text-gray-700 text-lg max-w-sm mx-auto">
            Thanks for membership. We&apos;re preparing your exclusive
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="space-y-6"
        >
          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Status Text */}
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-gray-600 font-medium"
          >
            {steps[currentStep]}
          </motion.p>

          {/* Floating Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-400 to-purple-500"
                animate={{
                  y: [-8, 8, -8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
