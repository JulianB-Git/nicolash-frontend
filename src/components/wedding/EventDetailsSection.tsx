"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Clock, MapPin } from "lucide-react";

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

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const events = [
    {
      icon: Calendar,
      title: "Ceremony",
      time: "14:30",
      description: "Join us as we exchange our vows",
    },
    {
      icon: Clock,
      title: "Cocktail Hour",
      time: "15:30",
      description: "Celebrate with drinks and canapés",
    },
    {
      icon: MapPin,
      title: "Reception",
      time: "17:00",
      description: "Dinner, dancing, and celebration",
    },
  ];

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
          className='font-lato text-lg sm:text-xl text-center mb-12 md:mb-16'
          style={{ color: "var(--wedding-slate)" }}
        >
          1 April 2026 @ Nibbana Farm
        </motion.p>

        {/* Timeline */}
        <motion.div
          variants={staggerChildren}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12'
        >
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.title}
                variants={fadeInVariants}
                className='flex flex-col items-center text-center group'
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className='w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4 shadow-lg transition-shadow group-hover:shadow-xl'
                  style={{ backgroundColor: "var(--wedding-sage)" }}
                >
                  <Icon className='w-10 h-10 sm:w-12 sm:h-12 text-white' />
                </motion.div>

                {/* Title */}
                <h3
                  className='font-playfair text-2xl sm:text-3xl font-semibold mb-2'
                  style={{ color: "var(--wedding-dark-grey)" }}
                >
                  {event.title}
                </h3>

                {/* Time */}
                <p
                  className='font-lato text-xl sm:text-2xl font-medium mb-2'
                  style={{ color: "var(--wedding-sage)" }}
                >
                  {event.time}
                </p>

                {/* Description */}
                <p
                  className='font-lato text-base sm:text-lg'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  {event.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Venue Information */}
        {/* <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='mt-16 p-8 rounded-lg shadow-lg text-center'
          style={{ backgroundColor: "white" }}
        >
          <h3
            className='font-playfair text-2xl sm:text-3xl font-semibold mb-4'
            style={{ color: "var(--wedding-dark-grey)" }}
          >
            Nibbana Farm
          </h3>
          <p
            className='font-lato text-lg sm:text-xl'
            style={{ color: "var(--wedding-slate)" }}
          >
            Tulbagh/Wolseley, South Africa
          </p>
        </motion.div> */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='mt-12 p-8 rounded-lg shadow-lg text-center'
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
