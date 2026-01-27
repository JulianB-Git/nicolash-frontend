"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function VenueMapSection() {
  const { ref, inView } = useScrollAnimation();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const venueAddress = "Nibbana Farm, Tulbagh/Wolseley, South Africa";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venueAddress
  )}`;

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
          The Venue
        </motion.h2>

        <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
          {/* Venue Description */}
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={inView ? "visible" : "hidden"}
            className='space-y-6'
          >
            <h3
              className='font-playfair text-2xl sm:text-3xl font-semibold'
              style={{ color: "var(--wedding-dark-grey)" }}
            >
              Nibbana Farm
            </h3>

            <p
              className='font-lato text-base sm:text-lg md:text-xl leading-relaxed'
              style={{ color: "var(--wedding-slate)" }}
            >
              Nestled in the heart of the beautiful Tulbagh/Wolseley
              countryside, Nibbana Farm offers a stunning backdrop for our
              special day. Surrounded by rolling vineyards and majestic
              mountains, this picturesque venue embodies the charm and elegance
              of the South African winelands.
            </p>

            <p
              className='font-lato text-base sm:text-lg md:text-xl leading-relaxed'
              style={{ color: "var(--wedding-slate)" }}
            >
              The farm's rustic beauty and serene atmosphere create the perfect
              setting for our celebration of love, bringing together the warmth
              of nature with the joy of our union.
            </p>

            {/* Get Directions Button */}
            <motion.a
              href={googleMapsUrl}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-flex items-center gap-2 px-8 py-4 rounded-full font-lato font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300'
              style={{ backgroundColor: "var(--wedding-sage)" }}
            >
              Get Directions
              <ExternalLink className='w-5 h-5' />
            </motion.a>
          </motion.div>

          {/* Map & Image */}
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={inView ? "visible" : "hidden"}
            className='space-y-6'
          >
            {/* Venue Image */}
            <div className='relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl'>
              <Image
                src='/images/wedding/venue-landscape.jpg'
                alt='Nibbana Farm Venue'
                fill
                className='object-cover'
              />
            </div>

            {/* Google Maps Embed */}
            <div className='relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl'>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
                }&q=${encodeURIComponent(venueAddress)}`}
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                aria-label='Venue location map'
                className='absolute inset-0'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
