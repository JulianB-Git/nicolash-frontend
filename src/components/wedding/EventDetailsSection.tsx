"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";
import Link from "next/link";

export default function EventDetailsSection() {
  const { ref, inView } = useScrollAnimation();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-light-sage)" }}
    >
      <div className='max-w-6xl mx-auto'>
        {/* Section Heading */}
        <motion.h2
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4'
          style={{ color: "var(--wedding-dark-grey)" }}
        >
          Wedding Program
        </motion.h2>

        <motion.p
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='font-lato text-lg sm:text-xl text-center'
          style={{ color: "var(--wedding-slate)" }}
        >
          1 April 2026 @ Nibbana Farm
        </motion.p>

        {/* Timeline and RSVP Card - Side by side on desktop */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12'>
          {/* Timeline Image */}
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={inView ? "visible" : "hidden"}
            className='flex items-start justify-center'
          >
            <div className='relative w-full max-w-lg'>
              <Image
                src='/wedding-timeline.png'
                alt='Wedding Program Timeline'
                width={900}
                height={1300}
                className='w-full h-auto'
                priority
                quality={90}
              />
            </div>
          </motion.div>

          {/* RSVP Card - Redesigned to match the vibe */}
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={inView ? "visible" : "hidden"}
            className='flex items-center justify-center'
          >
            <div className='w-full max-w-lg relative'>
              {/* Soft background with subtle border */}
              <div
                className='p-10 md:p-14 rounded-3xl relative overflow-hidden border-2'
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderColor: "var(--wedding-sage)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Decorative corner flourishes */}
                <div
                  className='absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 opacity-20'
                  style={{ borderColor: "var(--wedding-sage)" }}
                />
                <div
                  className='absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 opacity-20'
                  style={{ borderColor: "var(--wedding-sage)" }}
                />
                <div
                  className='absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 opacity-20'
                  style={{ borderColor: "var(--wedding-sage)" }}
                />
                <div
                  className='absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 opacity-20'
                  style={{ borderColor: "var(--wedding-sage)" }}
                />

                <div className='relative flex flex-col items-center text-center gap-6'>
                  {/* Envelope Image - larger with left tilt */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    className='relative w-56 h-56 md:w-76 md:h-76 flex-shrink-0 transition-all duration-300 -rotate-6'
                  >
                    <Image
                      src='/envelope.png'
                      alt='Wedding Invitation Envelope'
                      fill
                      className='object-contain drop-shadow-lg'
                      priority
                    />
                  </motion.div>

                  {/* RSVP Content */}
                  <div className='space-y-4'>
                    <p
                      className='font-lato text-base sm:text-lg max-w-md mx-auto leading-relaxed'
                      style={{ color: "var(--wedding-slate)" }}
                    >
                      We would be honored by your presence on our special day.
                      Please let us know if you can make it!
                    </p>

                    <Link href='/rsvp'>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className='font-playfair italic mt-4 px-12 py-4 rounded-full text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
                        style={{
                          backgroundColor: "var(--wedding-sage)",
                        }}
                      >
                        RSVP Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Share your love section - Below both */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='p-8 rounded-lg shadow-lg text-center'
          style={{ backgroundColor: "var(--wedding-light-grey)" }}
        >
          <p
            className='font-playfair text-xl sm:text-2xl italic'
            style={{ color: "var(--wedding-dark-grey)" }}
          >
            Share your love and memories using #NicoLashEverAfter - so that we
            can relive our day through your eyes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
