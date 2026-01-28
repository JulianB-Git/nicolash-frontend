"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

export default function OurStorySection() {
  const { ref, inView } = useScrollAnimation();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      ref={ref}
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-cream)" }}
    >
      <div className='max-w-6xl mx-auto'>
        {/* Section Heading */}
        <motion.h2
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 md:mb-16'
          style={{ color: "var(--wedding-dark-grey)" }}
        >
          Our Story
        </motion.h2>

        {/* Story Content */}
        <div className='space-y-16 md:space-y-24'>
          {/* First Section - Text Left, Image Right */}
          <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
            <motion.div
              variants={slideInLeft}
              initial='hidden'
              animate={inView ? "visible" : "hidden"}
              className='space-y-4'
            >
              <p
                className='font-lato text-base sm:text-lg md:text-xl leading-relaxed'
                style={{ color: "var(--wedding-slate)" }}
              >
                Our love story began in the most unexpected way, bringing
                together two souls who were meant to find each other. From our
                first conversation, we knew there was something special between
                us.
              </p>
              <p
                className='font-lato text-base sm:text-lg md:text-xl leading-relaxed'
                style={{ color: "var(--wedding-slate)" }}
              >
                Through laughter, adventures, and countless memories, our bond
                grew stronger with each passing day. We discovered that
                together, we could face anything life threw our way.
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial='hidden'
              animate={inView ? "visible" : "hidden"}
              className='relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl'
              style={{ border: "8px solid var(--wedding-sage)" }}
            >
              <div
                className='w-full h-full flex items-center justify-center text-center p-8'
                style={{ backgroundColor: "var(--wedding-light-grey)" }}
              >
                <Image
                  src='/images/wedding/drop.jpg'
                  alt="Nicole and Lashca's Wedding"
                  fill
                  priority
                  className='cover'
                  quality={70}
                />
              </div>
            </motion.div>
          </div>

          {/* Second Section - Image Left, Text Right */}
          <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
            <motion.div
              variants={slideInLeft}
              initial='hidden'
              animate={inView ? "visible" : "hidden"}
              className='relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl order-2 md:order-1'
              style={{ border: "8px solid var(--wedding-pink)" }}
            >
              <div
                className='w-full h-full flex items-center justify-center text-center p-8'
                style={{ backgroundColor: "var(--wedding-light-grey)" }}
              >
                <Image
                  src='/images/wedding/pillars-wide.jpg'
                  alt="Nicole and Lashca's Wedding"
                  fill
                  priority
                  className='object-cover'
                  quality={70}
                />
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial='hidden'
              animate={inView ? "visible" : "hidden"}
              className='space-y-4 order-1 md:order-2'
            >
              <p
                className='font-lato text-base sm:text-lg md:text-xl leading-relaxed'
                style={{ color: "var(--wedding-slate)" }}
              >
                The moment we knew we wanted to spend forever together was
                magical. It wasn't just one moment, but a collection of
                beautiful experiences that made us realize we had found our
                person.
              </p>
              <p
                className='font-lato text-base sm:text-lg md:text-xl leading-relaxed'
                style={{ color: "var(--wedding-slate)" }}
              >
                Now, we're thrilled to celebrate our love with the people who
                mean the most to us. Join us as we begin this new chapter in the
                beautiful South African countryside.
              </p>
            </motion.div>
          </div>

          {/* Third Section - Centered Image */}
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={inView ? "visible" : "hidden"}
            className='max-w-2xl mx-auto'
          >
            <div
              className='relative aspect-[3/2] rounded-lg overflow-hidden shadow-xl'
              style={{ border: "8px solid var(--wedding-sage)" }}
            >
              <div
                className='w-full h-full flex items-center justify-center text-center p-8'
                style={{ backgroundColor: "var(--wedding-light-grey)" }}
              >
                <Image
                  src='/images/wedding/spinning.jpg'
                  alt="Nicole and Lashca's Wedding"
                  fill
                  priority
                  className='cover'
                  quality={70}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
