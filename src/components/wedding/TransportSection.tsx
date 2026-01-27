"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Car, Navigation } from "lucide-react";

export default function TransportSection() {
  const { ref, inView } = useScrollAnimation();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      ref={ref}
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-cream)" }}
    >
      <div className='max-w-5xl mx-auto'>
        {/* Section Heading */}
        <motion.h2
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4'
          style={{ color: "var(--wedding-dark-grey)" }}
        >
          Getting There
        </motion.h2>

        <motion.p
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='font-lato text-lg sm:text-xl text-center mb-12 md:mb-16'
          style={{ color: "var(--wedding-slate)" }}
        >
          Plan your journey to Tulbagh with these transport options
        </motion.p>

        {/* Transport Options */}
        <motion.div
          variants={staggerChildren}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid md:grid-cols-2 gap-8'
        >
          {/* Uber/Ride Share */}
          <motion.div
            variants={fadeInVariants}
            className='bg-white rounded-lg p-8 shadow-lg'
          >
            <div
              className='w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto'
              style={{ backgroundColor: "var(--wedding-sage)" }}
            >
              <Navigation className='w-8 h-8 text-white' />
            </div>

            <h3
              className='font-playfair text-2xl sm:text-3xl font-semibold text-center mb-4'
              style={{ color: "var(--wedding-dark-grey)" }}
            >
              Uber / Ride Share
            </h3>

            <div className='space-y-3'>
              <div
                className='flex justify-between items-center py-2 border-b'
                style={{ borderColor: "var(--wedding-light-grey)" }}
              >
                <span
                  className='font-lato text-base sm:text-lg'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Route:
                </span>
                <span
                  className='font-lato text-base sm:text-lg font-medium'
                  style={{ color: "var(--wedding-dark-grey)" }}
                >
                  Cape Town → Tulbagh
                </span>
              </div>

              <div
                className='flex justify-between items-center py-2 border-b'
                style={{ borderColor: "var(--wedding-light-grey)" }}
              >
                <span
                  className='font-lato text-base sm:text-lg'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Estimated Cost:
                </span>
                <span
                  className='font-lato text-base sm:text-lg font-semibold'
                  style={{ color: "var(--wedding-sage)" }}
                >
                  R1,600 - R1,900
                </span>
              </div>

              <div className='flex justify-between items-center py-2'>
                <span
                  className='font-lato text-base sm:text-lg'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Duration:
                </span>
                <span
                  className='font-lato text-base sm:text-lg font-medium'
                  style={{ color: "var(--wedding-dark-grey)" }}
                >
                  ~1.5 hours
                </span>
              </div>
            </div>

            <p
              className='font-lato text-sm sm:text-base mt-6 text-center italic'
              style={{ color: "var(--wedding-slate)" }}
            >
              Book in advance for the best rates
            </p>
          </motion.div>

          {/* Car Rental */}
          <motion.div
            variants={fadeInVariants}
            className='bg-white rounded-lg p-8 shadow-lg'
          >
            <div
              className='w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto'
              style={{ backgroundColor: "var(--wedding-pink)" }}
            >
              <Car className='w-8 h-8 text-white' />
            </div>

            <h3
              className='font-playfair text-2xl sm:text-3xl font-semibold text-center mb-4'
              style={{ color: "var(--wedding-dark-grey)" }}
            >
              Car Rental
            </h3>

            <div className='space-y-4'>
              <p
                className='font-lato text-base sm:text-lg text-center'
                style={{ color: "var(--wedding-slate)" }}
              >
                Rent a car for flexibility and convenience during your stay in
                the winelands.
              </p>

              <div className='text-center py-4'>
                <p
                  className='font-lato text-lg font-semibold mb-2'
                  style={{ color: "var(--wedding-dark-grey)" }}
                >
                  Recommended Provider:
                </p>
                <p
                  className='font-playfair text-2xl font-bold'
                  style={{ color: "var(--wedding-pink)" }}
                >
                  Avis
                </p>
              </div>

              <motion.a
                href='https://www.avis.co.za'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='block w-full text-center px-6 py-3 rounded-lg font-lato font-semibold text-white transition-all duration-300'
                style={{ backgroundColor: "var(--wedding-pink)" }}
              >
                Book with Avis
              </motion.a>
            </div>

            <p
              className='font-lato text-sm sm:text-base mt-6 text-center italic'
              style={{ color: "var(--wedding-slate)" }}
            >
              Perfect for exploring the beautiful surroundings
            </p>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='mt-12 p-6 rounded-lg text-center'
          style={{ backgroundColor: "var(--wedding-light-grey)" }}
        >
          <p
            className='font-lato text-base sm:text-lg'
            style={{ color: "var(--wedding-slate)" }}
          >
            💡 <strong>Tip:</strong> Consider carpooling with other guests to
            make the journey more fun and affordable!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
