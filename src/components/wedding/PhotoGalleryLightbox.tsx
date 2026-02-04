"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/1.jpg",
    alt: "Nicole and Lashca - Beautiful moment",
    caption: "Our Journey",
  },
  {
    src: "/images/gallery/2.jpg",
    alt: "Nicole and Lashca - Together",
    caption: "Forever Starts Here",
  },
  {
    src: "/images/gallery/3.jpg",
    alt: "Nicole and Lashca - Special moment",
    caption: "Love & Laughter",
  },
  {
    src: "/images/gallery/4.jpg",
    alt: "Nicole and Lashca - Dancing",
    caption: "Dancing Through Life",
  },
  {
    src: "/images/gallery/5.jpg",
    alt: "Nicole and Lashca - Leading the way",
    caption: "Hand in Hand",
  },
  {
    src: "/images/gallery/6.jpg",
    alt: "Nicole and Lashca - At the pillars",
    caption: "Building Our Future",
  },
  {
    src: "/images/gallery/12.jpg",
    alt: "Nicole and Lashca - Romantic embrace",
    caption: "Two Hearts, One Love",
  },
  {
    src: "/images/gallery/8.jpg",
    alt: "Nicole and Lashca - Joyful celebration",
    caption: "Pure Happiness",
  },
  {
    src: "/images/gallery/9.jpg",
    alt: "Nicole and Lashca - Tender moment",
    caption: "Every Moment Counts",
  },
  {
    src: "/images/gallery/10.jpg",
    alt: "Nicole and Lashca - Beautiful scenery",
    caption: "Our Perfect Day",
  },
  {
    src: "/images/gallery/11.jpg",
    alt: "Nicole and Lashca - Candid laughter",
    caption: "Laughter & Love",
  },
  {
    src: "/images/gallery/7.jpg",
    alt: "Nicole and Lashca - Sunset together",
    caption: "Golden Hour Magic",
  },
  {
    src: "/images/gallery/13.jpg",
    alt: "Nicole and Lashca - Close up portrait",
    caption: "Simply Us",
  },
  {
    src: "/images/gallery/14.jpg",
    alt: "Nicole and Lashca - Walking together",
    caption: "Side by Side",
  },
  {
    src: "/images/gallery/15.jpg",
    alt: "Nicole and Lashca - Sweet kiss",
    caption: "Sealed with a Kiss",
  },
];

export default function PhotoGalleryLightbox() {
  const { ref, inView } = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 8;

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

  const goToNext = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % galleryImages.length);
  };

  const goToPrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(
      selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, goToNext, goToPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const displayedImages = showAll
    ? galleryImages
    : galleryImages.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <section
      ref={ref}
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-dusty-pink)" }}
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

        {/* Thumbnail Grid */}
        <motion.div
          variants={staggerChildren}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
        >
          {displayedImages.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeInVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => setSelectedImage(index)}
              className='relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 group'
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
                sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
              />
              {/* Hover overlay */}
              <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                <p className='font-playfair text-white text-lg font-semibold'>
                  View
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More Button */}
        {!showAll && galleryImages.length > INITIAL_DISPLAY_COUNT && (
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={inView ? "visible" : "hidden"}
            className='text-center mt-8 md:mt-12'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(INITIAL_DISPLAY_COUNT)}
              className='px-8 py-3 rounded-full font-lato font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300'
              style={{ backgroundColor: "var(--wedding-sage)" }}
            >
              Show me more!
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-black flex flex-col'
            onClick={() => setSelectedImage(null)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Top Control Bar */}
            <div className='flex items-center justify-between p-4 z-50 bg-gradient-to-b from-black/80 to-transparent'>
              {/* Image Counter */}
              <div className='px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm'>
                <p className='font-lato text-white text-sm font-medium'>
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className='p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
                aria-label='Close gallery'
              >
                <X className='w-6 h-6 md:w-8 md:h-8 text-white' />
              </button>
            </div>

            {/* Image Container - Centered */}
            <div className='flex-1 flex items-center justify-center relative px-4 md:px-16'>
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className='absolute left-2 md:left-4 z-50 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
                aria-label='Previous image'
              >
                <ChevronLeft className='w-6 h-6 md:w-8 md:h-8 text-white' />
              </button>

              {/* Image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className='relative w-full h-full max-w-6xl'
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className='object-contain'
                  sizes='100vw'
                  priority
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className='absolute right-2 md:right-4 z-50 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
                aria-label='Next image'
              >
                <ChevronRight className='w-6 h-6 md:w-8 md:h-8 text-white' />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className='p-4 md:p-6 z-50 bg-gradient-to-t from-black/80 to-transparent'>
              {/* {galleryImages[selectedImage].caption && (
                <p className='font-playfair text-white text-lg md:text-2xl font-semibold text-center'>
                  {galleryImages[selectedImage].caption}
                </p>
              )} */}
              {/* Mobile Navigation Hint */}
              <p className='font-lato text-white/60 text-xs md:text-sm text-center mt-2 md:hidden'>
                Swipe to navigate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
