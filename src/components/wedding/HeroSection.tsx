"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CountdownTimer from "./CountdownTimer";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect - background moves slower than scroll
  const y = useTransform(scrollY, [0, 500], [0, 250]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className='relative h-screen w-full overflow-hidden'>
      {/* Parallax Background - Mobile */}
      <motion.div
        style={{ y }}
        className='absolute inset-0 w-full h-[120%] md:hidden'
      >
        <Image
          src='/images/wedding/leading.jpg'
          alt="Nicole and Lashca's Wedding"
          fill
          priority
          className='object-cover'
          quality={70}
        />
        {/* Overlay for text readability */}
        <div className='absolute inset-0 bg-black/20' />
      </motion.div>

      {/* Parallax Background - Desktop */}
      <motion.div
        style={{ y }}
        className='absolute inset-0 w-full h-[120%] hidden md:block'
      >
        <div className='relative w-full h-full -translate-y-[15%]'>
          <Image
            src='/images/wedding/pillars.jpg'
            alt="Nicole and Lashca's Wedding"
            fill
            priority
            className='object-cover'
            quality={70}
          />
        </div>
        {/* Overlay for text readability */}
        <div className='absolute inset-0 bg-black/20' />
      </motion.div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
        >
          {/* Couple Names */}
          <h1 className='font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-lg'>
            Nicole & Lashca
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className='space-y-2'
        >
          {/* Date & Time */}
          <p className='font-lato text-xl sm:text-2xl md:text-3xl font-light'>
            1 April 2026 @ 14:30
          </p>

          {/* Venue */}
          <p className='font-lato text-lg sm:text-xl md:text-2xl font-light'>
            Nibbana Farm, Tulbagh/Wolseley, South Africa
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
          className='mt-12'
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
