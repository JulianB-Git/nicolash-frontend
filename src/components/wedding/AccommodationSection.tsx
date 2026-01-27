"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Users, ExternalLink } from "lucide-react";

interface Accommodation {
  name: string;
  capacity: number;
  img: string;
  link?: string;
}

const accommodations: Accommodation[] = [
  {
    name: "Steenbok Farm",
    capacity: 24,
    img: "/images/wedding/steenbok.jpeg",
    link: "https://www.steenbokfarmcottage.co.za/",
  },
  {
    name: "Usingizi",
    capacity: 6,
    img: "/images/wedding/usingizi.webp",
    link: "https://usingizi.co.za/",
  },
  {
    name: "Fynbos Guest Farm",
    capacity: 6,
    img: "/images/wedding/fynbos.jpg",
    link: "https://www.fynbosguestfarm.co.za/contact/",
  },
  {
    name: "Mountain Haven",
    capacity: 11,
    img: "/images/wedding/mountainhaven.jpg",
    link: "https://mountainhaventulbagh.co.za/",
  },
  {
    name: "Big Sky Cottages",
    capacity: 34,
    img: "/images/wedding/bluesky.webp",
    link: "https://bigskycottages.co.za/",
  },
  {
    name: "Die Boord",
    capacity: 8,
    img: "/images/wedding/dieboord.jpg",
    link: "https://www.dieboord.co.za/accommodation/",
  },
  {
    name: "Bergsicht",
    capacity: 15,
    img: "/images/wedding/bergsicht.jpg",
    link: "https://www.bergsicht.co.za/",
  },
  {
    name: "Witzenberg",
    capacity: 46,
    img: "/images/wedding/witzenberg.jpeg",
    link: "https://witzenbergguestfarm.co.za/",
  },
];

export default function AccommodationSection() {
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

  return (
    <section
      ref={ref}
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-light-grey)" }}
    >
      <div className='max-w-7xl mx-auto'>
        {/* Section Heading */}
        <motion.h2
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4'
          style={{ color: "var(--wedding-dark-grey)" }}
        >
          Where to Stay
        </motion.h2>

        <motion.p
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='font-lato text-lg sm:text-xl text-center mb-12 md:mb-16 max-w-3xl mx-auto'
          style={{ color: "var(--wedding-slate)" }}
        >
          We've curated a selection of beautiful accommodations near the venue.
          Book early to secure your spot!
        </motion.p>

        {/* Accommodation Grid */}
        <motion.div
          variants={staggerChildren}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        >
          {accommodations.map((accommodation) => (
            <motion.div
              key={accommodation.name}
              variants={fadeInVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className='bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'
            >
              {/* Image Placeholder */}
              <div
                className='relative aspect-[4/3] flex items-center justify-center'
                style={{ backgroundColor: "var(--wedding-cream)" }}
              >
                <Image
                  src={accommodation.img}
                  alt={accommodation.name}
                  fill
                  priority
                  className='object-cover'
                  quality={70}
                />
              </div>

              {/* Card Content */}
              <div className='p-6'>
                <h3
                  className='font-playfair text-xl sm:text-2xl font-semibold mb-3'
                  style={{ color: "var(--wedding-dark-grey)" }}
                >
                  {accommodation.name}
                </h3>

                {/* Capacity Badge */}
                <div className='flex items-center gap-2 mb-4'>
                  <div
                    className='flex items-center gap-2 px-3 py-1 rounded-full'
                    style={{
                      backgroundColor: "var(--wedding-sage)",
                      opacity: 0.8,
                    }}
                  >
                    <Users
                      className='w-4 h-4'
                      style={{ color: "var(--wedding-cream)" }}
                    />
                    <span
                      className='font-lato text-sm font-medium'
                      style={{ color: "var(--wedding-cream)" }}
                    >
                      {accommodation.capacity} guests
                    </span>
                  </div>
                </div>

                {/* Contact Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-lato font-medium text-white transition-all duration-300'
                  style={{ backgroundColor: "var(--wedding-pink)" }}
                  onClick={() => {
                    // For now, just search Google. Can be updated with actual links later
                    window.open(accommodation.link, "_blank");
                  }}
                >
                  View Details
                  <ExternalLink className='w-4 h-4' />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='mt-12 text-center'
        >
          <p
            className='font-lato text-base sm:text-lg italic'
            style={{ color: "var(--wedding-slate)" }}
          >
            Need help with accommodation? Feel free to reach out to us for
            recommendations!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
