"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      className='relative min-h-screen w-full overflow-hidden flex items-center justify-center py-12 md:py-20'
      style={{ backgroundColor: "var(--wedding-sage)" }}
    >
      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className='space-y-4 md:space-y-8'
        >
          {/* Couple Names - Large Script Style */}
          <div className='space-y-1'>
            <h1
              className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal'
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              N
            </h1>
            <p
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal'
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              &
            </p>
            <h1
              className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal'
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              L
            </h1>
          </div>

          {/* Invitation Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className='space-y-3 md:space-y-6 mt-6 md:mt-12'
          >
            <p className='font-lato text-sm sm:text-base md:text-lg tracking-widest uppercase'>
              Cordially invites you to
              <br />
              their wedding on
            </p>

            {/* Date with decorative lines */}
            <div className='flex items-center justify-center gap-4 my-3 md:my-8'>
              <div className='w-12 sm:w-16 h-px bg-white/60'></div>
              <div className='text-center'>
                <p className='font-lato text-3xl sm:text-4xl md:text-5xl font-light tracking-wider'>
                  01.04.2026
                </p>
                <p className='font-lato text-sm sm:text-base md:text-lg tracking-widest uppercase mt-2'>
                  Tuesday, 2:30PM
                </p>
              </div>
              <div className='w-12 sm:w-16 h-px bg-white/60'></div>
            </div>

            {/* Venue */}
            <div className='space-y-1 md:space-y-2 mt-3 md:mt-8'>
              <p
                className='text-2xl sm:text-3xl md:text-4xl'
                style={{ fontFamily: "var(--font-great-vibes)" }}
              >
                Venue
              </p>
              <p className='font-lato text-base sm:text-lg md:text-xl font-light'>
                Nibbana Farm
              </p>
              <p className='font-lato text-sm sm:text-base md:text-lg font-light'>
                Tulbagh/Wolseley, South Africa
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
          className='mt-6 md:mt-16'
        >
          <CountdownTimer />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className='text-white'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
