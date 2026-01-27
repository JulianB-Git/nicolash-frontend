"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X } from "lucide-react";

export default function DressCodeSection() {
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
        staggerChildren: 0.1,
      },
    },
  };

  const ladiesColors = [
    { name: "Dusty Pink", hex: "#D4A5A5" },
    { name: "Salmon", hex: "#FA8072" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Sage Green", hex: "#8B9D83" },
    { name: "Soft Yellow", hex: "#F4E4C1" },
    { name: "Lavender", hex: "#E6E6FA" },
  ];

  const mensColors = [
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Salmon", hex: "#FA8072" },
    { name: "Sand", hex: "#C2B280" },
    { name: "Beige", hex: "#F5F5DC" },
  ];

  return (
    <section
      ref={ref}
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-light-grey)" }}
    >
      <div className='max-w-6xl mx-auto'>
        {/* Section Heading */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='text-center mb-12 md:mb-16'
        >
          <h2
            className='font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-4'
            style={{ color: "var(--wedding-dark-grey)" }}
          >
            Dress Code
          </h2>
          <p
            className='font-playfair text-2xl sm:text-3xl md:text-4xl italic'
            style={{ color: "var(--wedding-sage)" }}
          >
            South of France Chic
          </p>
          <p
            className='font-lato text-lg sm:text-xl mt-4'
            style={{ color: "var(--wedding-slate)" }}
          >
            Think garden party elegance meets Mediterranean charm
          </p>
        </motion.div>

        {/* Ladies & Men Sections */}
        <div className='grid md:grid-cols-2 gap-12 md:gap-16'>
          {/* Ladies Section */}
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={inView ? "visible" : "hidden"}
            className='space-y-6'
          >
            <h3
              className='font-playfair text-3xl sm:text-4xl font-semibold text-center mb-6'
              style={{ color: "var(--wedding-dark-grey)" }}
            >
              For the Ladies
            </h3>

            <div className='bg-white rounded-lg p-6 sm:p-8 shadow-lg space-y-4'>
              <div className='space-y-3'>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  <span className='text-2xl'>✨</span>
                  <span>Bright, vibrant tones encouraged</span>
                </p>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  <span className='text-2xl'>💃</span>
                  <span>Frills, florals, and fun patterns welcome</span>
                </p>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  <span className='text-2xl'>🌸</span>
                  <span>Flowing fabrics and garden party vibes</span>
                </p>
              </div>

              <div
                className='pt-4 mt-4 border-t'
                style={{ borderColor: "var(--wedding-light-grey)" }}
              >
                <p
                  className='font-lato text-base sm:text-lg font-semibold mb-2 flex items-center gap-2'
                  style={{ color: "var(--wedding-dark-grey)" }}
                >
                  <X
                    className='w-5 h-5'
                    style={{ color: "var(--wedding-pink)" }}
                  />
                  Please avoid:
                </p>
                <p
                  className='font-lato text-base sm:text-lg'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Black, white, or blue
                </p>
              </div>

              {/* Color Swatches */}
              <div className='pt-4'>
                <p
                  className='font-lato text-sm font-semibold mb-3 uppercase tracking-wide'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Suggested Colors:
                </p>
                <motion.div
                  variants={staggerChildren}
                  initial='hidden'
                  animate={inView ? "visible" : "hidden"}
                  className='grid grid-cols-3 gap-3'
                >
                  {ladiesColors.map((color) => (
                    <motion.div
                      key={color.name}
                      variants={fadeInVariants}
                      whileHover={{ scale: 1.1 }}
                      className='flex flex-col items-center gap-2 cursor-pointer'
                    >
                      <div
                        className='w-16 h-16 rounded-full shadow-md'
                        style={{ backgroundColor: color.hex }}
                      />
                      <span
                        className='font-lato text-xs text-center'
                        style={{ color: "var(--wedding-slate)" }}
                      >
                        {color.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Men Section */}
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={inView ? "visible" : "hidden"}
            className='space-y-6'
          >
            <h3
              className='font-playfair text-3xl sm:text-4xl font-semibold text-center mb-6'
              style={{ color: "var(--wedding-dark-grey)" }}
            >
              For the Gents
            </h3>

            <div className='bg-white rounded-lg p-6 sm:p-8 shadow-lg space-y-4'>
              <div className='space-y-3'>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  <span className='text-2xl'>👔</span>
                  <span>Linen suits for that relaxed elegance</span>
                </p>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  <span className='text-2xl'>🌅</span>
                  <span>Light, breathable fabrics</span>
                </p>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  <span className='text-2xl'>🎨</span>
                  <span>Soft, warm tones preferred</span>
                </p>
              </div>

              <div
                className='pt-4 mt-4 border-t'
                style={{ borderColor: "var(--wedding-light-grey)" }}
              >
                <p
                  className='font-lato text-base sm:text-lg font-semibold mb-2 flex items-center gap-2'
                  style={{ color: "var(--wedding-dark-grey)" }}
                >
                  <X
                    className='w-5 h-5'
                    style={{ color: "var(--wedding-pink)" }}
                  />
                  Please avoid:
                </p>
                <p
                  className='font-lato text-base sm:text-lg'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Black suits
                </p>
              </div>

              {/* Color Swatches */}
              <div className='pt-4'>
                <p
                  className='font-lato text-sm font-semibold mb-3 uppercase tracking-wide'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Suggested Colors:
                </p>
                <motion.div
                  variants={staggerChildren}
                  initial='hidden'
                  animate={inView ? "visible" : "hidden"}
                  className='grid grid-cols-2 gap-3'
                >
                  {mensColors.map((color) => (
                    <motion.div
                      key={color.name}
                      variants={fadeInVariants}
                      whileHover={{ scale: 1.1 }}
                      className='flex flex-col items-center gap-2 cursor-pointer'
                    >
                      <div
                        className='w-16 h-16 rounded-full shadow-md'
                        style={{ backgroundColor: color.hex }}
                      />
                      <span
                        className='font-lato text-xs text-center'
                        style={{ color: "var(--wedding-slate)" }}
                      >
                        {color.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fun Note */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='mt-12 text-center'
        >
          <p
            className='font-lato text-lg sm:text-xl italic'
            style={{ color: "var(--wedding-slate)" }}
          >
            Most importantly, wear something that makes you feel fabulous! 💕
          </p>
        </motion.div>
      </div>
    </section>
  );
}
