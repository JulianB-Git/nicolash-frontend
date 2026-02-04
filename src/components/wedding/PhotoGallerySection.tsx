"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  span?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/wedding/baw-leading.jpg",
    alt: "Nicole and Lashca - Beautiful moment",
    caption: "Our Journey",
    span: "md:col-span-2",
  },
  {
    src: "/images/wedding/baw1.jpg",
    alt: "Nicole and Lashca - Together",
    caption: "Forever Starts Here",
  },
  {
    src: "/images/wedding/drop.jpg",
    alt: "Nicole and Lashca - Special moment",
    caption: "Love & Laughter",
  },
  {
    src: "/images/wedding/spinning.jpg",
    alt: "Nicole and Lashca - Dancing",
    caption: "Dancing Through Life",
    span: "md:row-span-2",
  },
  {
    src: "/images/wedding/leading.jpg",
    alt: "Nicole and Lashca - Leading the way",
    caption: "Hand in Hand",
    span: "md:col-span-2",
  },
  {
    src: "/images/wedding/pillars.jpg",
    alt: "Nicole and Lashca - At the pillars",
    caption: "Building Our Future",
  },
];

export default function PhotoGallerySection() {
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
      style={{ backgroundColor: "var(--wedding-cream)" }}
      aria-label='Photo Gallery'
    >
      <div className='max-w-7xl mx-auto'>
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
            Our Moments
          </h2>
          <p
            className='font-lato text-lg sm:text-xl max-w-2xl mx-auto'
            style={{ color: "var(--wedding-slate)" }}
          >
            A glimpse into our journey together
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={staggerChildren}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]'
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeInVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
                image.span || ""
              }`}
            >
              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
              />

              {/* Overlay with Caption */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                {image.caption && (
                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                    <p className='font-playfair text-white text-xl md:text-2xl font-semibold'>
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>

              {/* Subtle border accent */}
              <div
                className='absolute inset-0 border-2 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                style={{ borderColor: "var(--wedding-sage)" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
