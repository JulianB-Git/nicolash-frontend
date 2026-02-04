"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink, Gift } from "lucide-react";

interface Registry {
  name: string;
  url: string;
  description: string;
}

const registries: Registry[] = [
  {
    name: "Yuppiechef",
    url: "https://www.yuppiechef.com",
    description: "Kitchen & homeware essentials",
  },
  {
    name: "@home",
    url: "https://www.athome.co.za",
    description: "Home decor & lifestyle",
  },
  {
    name: "Woolworths",
    url: "https://www.woolworths.co.za",
    description: "Quality home goods",
  },
];

export default function RegistrySection() {
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
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-dusty-pink)" }}
    >
      <div className='max-w-5xl mx-auto'>
        {/* Section Heading */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='text-center mb-8'
        >
          <div
            className='w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'
            style={{ backgroundColor: "var(--wedding-sage)" }}
          >
            <Gift className='w-10 h-10 text-white' />
          </div>

          <h2
            className='font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-4'
            style={{ color: "var(--wedding-dark-grey)" }}
          >
            Gift Registry
          </h2>

          <p
            className='font-lato text-lg sm:text-xl max-w-2xl mx-auto'
            style={{ color: "var(--wedding-slate)" }}
          >
            Your presence at our wedding is the greatest gift of all. However,
            if you wish to honor us with a gift, we've registered at the
            following stores for home vouchers.
          </p>
        </motion.div>

        {/* Registry Cards */}
        <motion.div
          variants={staggerChildren}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'
        >
          {registries.map((registry) => (
            <motion.a
              key={registry.name}
              href={registry.url}
              target='_blank'
              rel='noopener noreferrer'
              variants={fadeInVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className='bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group'
            >
              {/* Store Name */}
              <h3
                className='font-playfair text-2xl sm:text-3xl font-semibold mb-3'
                style={{ color: "var(--wedding-dark-grey)" }}
              >
                {registry.name}
              </h3>

              {/* Description */}
              <p
                className='font-lato text-base sm:text-lg mb-6'
                style={{ color: "var(--wedding-slate)" }}
              >
                {registry.description}
              </p>

              {/* Link Icon */}
              <div
                className='flex items-center gap-2 font-lato font-semibold transition-colors'
                style={{ color: "var(--wedding-sage)" }}
              >
                <span>Visit Store</span>
                <ExternalLink className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Personal Message */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='mt-12 p-8 rounded-lg text-center'
          style={{ backgroundColor: "var(--wedding-light-grey)" }}
        >
          <p
            className='font-playfair text-xl sm:text-2xl italic'
            style={{ color: "var(--wedding-dark-grey)" }}
          >
            "The best gift you can give us is your love, laughter, and presence
            on our special day."
          </p>
          <p
            className='font-lato text-lg mt-4'
            style={{ color: "var(--wedding-slate)" }}
          >
            — Nicole & Lashca
          </p>
        </motion.div>
      </div>
    </section>
  );
}
