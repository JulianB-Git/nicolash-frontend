"use client";

import { motion, Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

interface StorySection {
  title: string;
  paragraphs: string[];
  images: string[];
  imagePosition: "left" | "right";
  stackLayout?: "default" | "vertical"; // vertical stacks images on mobile
}

const storySections: StorySection[] = [
  {
    title: "December 2015 — The Accidental Beginning",
    paragraphs: [
      "What was meant to be our parents' friends' family holiday turned out to be the first of many holidays together. Think Christmas in Swakop, a long festive table, and two people eyeing each other from opposite ends — no idea that one day we'd be setting our own table.",
      "Spoiler: the longest one yet. Our wedding table.",
    ],
    images: ["/images/our-story/2015.jpg"],
    imagePosition: "right",
  },
  {
    title: "March 2016 — The 'Not-Quite-Yet' Chapter",
    paragraphs: [
      "We crossed paths again in Cape Town… but timing had other plans. Cue three full years of the friend zone (respectfully). Lashca fought bravely, survived the trenches, and emerged victorious.",
      '"A true friend," Nicole always said.',
    ],
    images: ["/images/our-story/2016.png"],
    imagePosition: "left",
  },
  {
    title: "December 2018 — Officially Us",
    paragraphs: [
      "Best friends became best friends who date. Cape Town became our playground — and wow, did we explore.",
    ],
    images: [
      "/images/our-story/2018-2.png",
      "/images/our-story/2018-3.png",
      "/images/our-story/2018-1.png",
    ],
    imagePosition: "right",
  },
  {
    title: "The Blue ST Era",
    paragraphs: [
      "The blue, two-door ST. Iconic. If you saw Lashca and Nicole pulling up, you knew you were about to have the best time. Friends piled in. Road trips happened. Bellville to Century City. Rondebosch to Constantia. Knysna. Hermanus.",
      "No plan, just vibes.",
    ],
    images: ["/images/our-story/st-1.jpg", "/images/our-story/st-2.png"],
    imagePosition: "left",
    stackLayout: "vertical",
  },
  {
    title: "2018 — Degrees & Dreams",
    paragraphs: [
      "We finished our studies and decided we'd start our little life in South Africa. Jobs secured. Exploring continued. (Possibly a bit too enthusiastically.)",
    ],
    images: [
      "/images/our-story/degree-1.png",
      "/images/our-story/degree-2.png",
      "/images/our-story/degree-3.png",
      "/images/our-story/degree-4.png",
    ],
    imagePosition: "right",
  },
  {
    title: "The Plot Twist Years",
    paragraphs: [
      "Lashca ended up in China (as one does). Nicole landed in a warm, vibrant loft off Bree Street, living the corporate Cape Town hustle. Fun? Yes. The dream? Not quite.",
    ],
    images: [
      "/images/our-story/plot-1.jpg",
      "/images/our-story/plot-2.jpg",
      "/images/our-story/plot-3.jpg",
    ],
    imagePosition: "left",
  },
  {
    title: "2019 — Back to Where It All Makes Sense",
    paragraphs: [
      "We packed up Cape Town and headed home. Namibia it was. Careers started. Roots planted. Hearts settled.",
    ],
    images: [
      "/images/our-story/2019-1.png",
      "/images/our-story/2019-2.png",
      "/images/our-story/2019-3.png",
      "/images/our-story/2019-4.png",
    ],
    imagePosition: "right",
  },
  {
    title: "The COVID Chapter",
    paragraphs: [
      "A tough time for everyone — but somehow, we built anyway. Businesses grew. Jobs happened. Love stayed steady. And yes… we still found our way back to Cape Town after lockdowns. Some places never leave your story.",
    ],
    images: ["/images/our-story/covid-1.png", "/images/our-story/covid-2.png"],
    imagePosition: "left",
  },
  {
    title: "Community Is Everything",
    paragraphs: [
      "Over time, Windhoek and Swakop became home in the truest sense. Our weekends filled with friends, family, padel, Noah and Skylar, and strangers who became lifelong comrades.",
      "To be honest, these days we still gather the troops — just not in the blue ST anymore, but around homemade pizza's, tacos or Lashca's steak and Nicole's salads.",
    ],
    images: [
      "/images/our-story/comm-1.jpg",
      "/images/our-story/comm-2.png",
      "/images/our-story/comm-3.png",
      "/images/our-story/comm-4.jpg",
    ],
    imagePosition: "right",
  },
  {
    title: "The Realisation",
    paragraphs: [
      "It clicked: it's not about where you are, but who you're with. Our life felt full. Ours. A story we get to keep writing.",
    ],
    images: [
      "/images/our-story/real-1.png",
      "/images/our-story/real-2.png",
      "/images/our-story/real-3.png",
      "/images/our-story/real-4.png",
    ],
    imagePosition: "left",
  },
  {
    title: "03 January 2025 — Zanzibar",
    paragraphs: [
      "A quiet shore. A secret little beach. A holiday that changed everything — BOOM — forever.",
      "(Lashca's words, obviously.)",
    ],
    images: [
      "/images/our-story/zan-1.png",
      "/images/our-story/zan-2.png",
      "/images/our-story/zan-3.png",
      "/images/our-story/zan-4.png",
    ],
    imagePosition: "right",
  },
  {
    title: "15 Months Later…",
    paragraphs: [
      'Here we are. Walking down the aisle. Sealing the deal. Saying "I do" — for the rest of our lives.',
      "And this? This is just the beginning.",
    ],
    images: ["/images/our-story/15months.png"],
    imagePosition: "left",
  },
];

export default function OurStorySection() {
  const { ref: headerRef, inView: headerInView } = useScrollAnimation();

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

  // Card stack component with better fanning - two rows for 3-4 photos
  const CardStack = ({
    images,
    stackLayout = "default",
  }: {
    images: string[];
    stackLayout?: "default" | "vertical";
  }) => {
    const rotations = [-5, 4, -3, 3];
    const numImages = Math.min(images.length, 4);

    // Calculate positioning based on number of images - more spread out
    const getCardStyle = (index: number, total: number) => {
      // Vertical layout for mobile when specified
      if (stackLayout === "vertical" && total === 2) {
        return index === 0
          ? {
              rotate: `${rotations[0]}deg`,
              left: "10%",
              right: "10%",
              top: "0%",
              bottom: "52%",
            }
          : {
              rotate: `${rotations[1]}deg`,
              left: "10%",
              right: "10%",
              top: "48%",
              bottom: "0%",
            };
      }

      if (total === 1) {
        return {
          rotate: `${rotations[0]}deg`,
          left: "10%",
          right: "10%",
          top: "10%",
          bottom: "10%",
        };
      }

      if (total === 2) {
        // Two cards: side by side with minimal overlap
        return index === 0
          ? {
              rotate: `${rotations[0]}deg`,
              left: "0%",
              right: "52%",
              top: "8%",
              bottom: "15%",
            }
          : {
              rotate: `${rotations[1]}deg`,
              left: "48%",
              right: "0%",
              top: "15%",
              bottom: "8%",
            };
      }

      if (total === 3) {
        // Three cards: two on top, one below center
        const positions = [
          {
            rotate: `${rotations[0]}deg`,
            left: "0%",
            right: "52%",
            top: "0%",
            bottom: "52%",
          },
          {
            rotate: `${rotations[1]}deg`,
            left: "48%",
            right: "0%",
            top: "5%",
            bottom: "47%",
          },
          {
            rotate: `${rotations[2]}deg`,
            left: "20%",
            right: "20%",
            top: "48%",
            bottom: "0%",
          },
        ];
        return positions[index];
      }

      // Four cards: two rows of two
      const positions = [
        {
          rotate: `${rotations[0]}deg`,
          left: "0%",
          right: "52%",
          top: "0%",
          bottom: "52%",
        },
        {
          rotate: `${rotations[1]}deg`,
          left: "48%",
          right: "0%",
          top: "5%",
          bottom: "47%",
        },
        {
          rotate: `${rotations[2]}deg`,
          left: "0%",
          right: "52%",
          top: "48%",
          bottom: "5%",
        },
        {
          rotate: `${rotations[3]}deg`,
          left: "48%",
          right: "0%",
          top: "53%",
          bottom: "0%",
        },
      ];
      return positions[index];
    };

    return (
      <div className='relative w-full h-[450px] md:h-[500px]'>
        {images.slice(0, 4).map((image, index) => {
          const style = getCardStyle(index, numImages);
          return (
            <motion.div
              key={index}
              className='absolute rounded-lg overflow-hidden shadow-2xl bg-white p-2'
              style={{
                rotate: style.rotate,
                left: style.left,
                right: style.right,
                top: style.top,
                bottom: style.bottom,
                zIndex: index + 1,
              }}
              whileHover={{
                rotate: 0,
                scale: 1.1,
                zIndex: 100,
                transition: { duration: 0.3 },
              }}
            >
              <div className='relative w-full h-full'>
                <Image
                  src={image}
                  alt={`Memory ${index + 1}`}
                  fill
                  className='object-cover rounded'
                  quality={70}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <section
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-cream)" }}
    >
      <div className='max-w-7xl mx-auto'>
        {/* Section Heading */}
        <motion.h2
          ref={headerRef}
          variants={fadeInVariants}
          initial='hidden'
          animate={headerInView ? "visible" : "hidden"}
          className='font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4'
          style={{ color: "var(--wedding-dark-grey)" }}
        >
          Our Story
        </motion.h2>

        <motion.p
          variants={fadeInVariants}
          initial='hidden'
          animate={headerInView ? "visible" : "hidden"}
          className='font-lato text-lg sm:text-xl text-center mb-16 md:mb-20 italic'
          style={{ color: "var(--wedding-slate)" }}
        >
          A Timeline
        </motion.p>

        {/* Story Sections */}
        <div className='space-y-20 md:space-y-32'>
          {storySections.map((section, sectionIndex) => (
            <StorySectionItem
              key={sectionIndex}
              section={section}
              slideInLeft={slideInLeft}
              slideInRight={slideInRight}
              CardStack={CardStack}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Individual story section component with its own intersection observer
function StorySectionItem({
  section,
  slideInLeft,
  slideInRight,
  CardStack,
}: {
  section: StorySection;
  slideInLeft: Variants;
  slideInRight: Variants;
  CardStack: React.ComponentType<{
    images: string[];
    stackLayout?: "default" | "vertical";
  }>;
}) {
  const { ref, inView } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
        section.imagePosition === "left" ? "md:grid-flow-dense" : ""
      }`}
    >
      {/* Text Content */}
      <motion.div
        variants={
          section.imagePosition === "right" ? slideInLeft : slideInRight
        }
        initial='hidden'
        animate={inView ? "visible" : "hidden"}
        className={`space-y-6 ${
          section.imagePosition === "left" ? "md:col-start-2" : "md:col-start-1"
        }`}
      >
        <h3
          className='font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold'
          style={{ color: "var(--wedding-dark-grey)" }}
        >
          {section.title}
        </h3>

        {section.paragraphs.map((paragraph, pIndex) => (
          <p
            key={pIndex}
            className='font-lato text-base sm:text-lg md:text-xl leading-relaxed'
            style={{ color: "var(--wedding-slate)" }}
          >
            {paragraph}
          </p>
        ))}
      </motion.div>

      {/* Card Stack Images */}
      <motion.div
        variants={
          section.imagePosition === "right" ? slideInRight : slideInLeft
        }
        initial='hidden'
        animate={inView ? "visible" : "hidden"}
        className={`${
          section.imagePosition === "left"
            ? "md:col-start-1 md:row-start-1"
            : "md:col-start-2"
        }`}
      >
        <CardStack images={section.images} stackLayout={section.stackLayout} />
      </motion.div>
    </div>
  );
}
