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
    { name: "Pink", hex: "#DE3290" },
    { name: "Salmon", hex: "#AA1846" },
    { name: "Coral", hex: "#C5543B" },
    { name: "Green", hex: "#7D8828" },
    { name: "Soft Yellow", hex: "#FBB450" },
    { name: "Lavender", hex: "#4C3261" },
  ];

  const mensColors = [
    { name: "Brown", hex: "#624600ff" },
    { name: "Taupe", hex: "#989078ff" },
    { name: "Sand", hex: "#e1adadff" },
    { name: "Light Grey", hex: "#9a9fa5ff" },
    { name: "Slate Blue", hex: "#7b90a9ff" },
    { name: "Navy", hex: "#2b4563ff" },
  ];

  return (
    <section
      ref={ref}
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-light-sage)" }}
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
            Dress To Impress
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
            Think{" "}
            <b>
              bright tones, playful frills, soft textures, and effortless
              elegance.
            </b>{" "}
            Linen suits in shades of <b>pink, salmon or sand</b> are highly
            encouraged - have fun with it!
          </p>
          <p
            className='font-lato text-lg sm:text-xl mt-4'
            style={{ color: "var(--wedding-slate)" }}
          >
            Ladies, please consider <b>comfortable heels or block heels</b>, as
            this is a <b>garden wedding with cobblestone flooring.</b> The Cape
            Town weather can be unpredictable - especially nestled between the
            mountains - so we recommend brining a <b>light cardigan or wrap</b>,
            just in case.
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
                  {/* <span className='text-2xl'>✨</span> */}
                  <span>Bright, vibrant tones encouraged</span>
                </p>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  {/* <span className='text-2xl'>💃</span> */}
                  <span>Frills, florals, and fun patterns welcome</span>
                </p>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  {/* <span className='text-2xl'>🌸</span> */}
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
                  No white, black, blue or plain pastel colours
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
                      {/* <span
                        className='font-lato text-xs text-center'
                        style={{ color: "var(--wedding-slate)" }}
                      >
                        {color.name}
                      </span> */}
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
                  {/* <span className='text-2xl'>👔</span> */}
                  <span>Linen suits for that relaxed elegance</span>
                </p>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  {/* <span className='text-2xl'>🌅</span> */}
                  <span>Light, breathable fabrics</span>
                </p>
                <p
                  className='font-lato text-base sm:text-lg flex items-start gap-2'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  {/* <span className='text-2xl'>🎨</span> */}
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
                  No black suits or tuxedos
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
                      {/* <span
                        className='font-lato text-xs text-center'
                        style={{ color: "var(--wedding-slate)" }}
                      >
                        {color.name}
                      </span> */}
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
          className='mt-12 text-center space-y-4'
        >
          <p
            className='font-lato text-lg sm:text-xl italic'
            style={{ color: "var(--wedding-slate)" }}
          >
            Have fun with your look and lean into colour - this is a
            celebration, not a formal black-tie affair.
          </p>
          <p
            className='font-lato text-base sm:text-lg'
            style={{ color: "var(--wedding-slate)" }}
          >
            Have a look at our{" "}
            <a
              href='https://uk.pinterest.com/pin/410672059794716908/'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:opacity-70 transition-opacity'
              style={{ color: "var(--wedding-pink)" }}
            >
              Pinterest board
            </a>{" "}
            for inspiration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
