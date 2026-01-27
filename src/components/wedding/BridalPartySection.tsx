"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { User } from "lucide-react";

interface BridalPartyMember {
  name: string;
  role: string;
}

interface BridalPartyGroup {
  title: string;
  members: BridalPartyMember[];
  color: string;
}

const bridalPartyGroups: BridalPartyGroup[] = [
  {
    title: "Groomsmen",
    members: [
      { name: "Nino Kalondo", role: "Best Man" },
      { name: "John-Paul Karuaihe", role: "Groomsman" },
      { name: "Julian Benade", role: "Groomsman" },
      { name: "Audwin Mouton", role: "Groomsman" },
      { name: "Hugo Wasserfall", role: "Groomsman" },
      { name: "Placido Mutinde", role: "Groomsman" },
    ],
    color: "var(--wedding-sage)",
  },
  {
    title: "Bridesmaids",
    members: [
      { name: "Siobhan Carew", role: "Maid of Honour" },
      { name: "Natali Quickfall", role: "Bridesmaid" },
      { name: "Gabriella", role: "Bridesmaid" },
      { name: "Anver", role: "Bridesmaid" },
      { name: "Tira", role: "Bridesmaid" },
      { name: "Shawna Pieterse", role: "Sister of the Groom" },
    ],
    color: "var(--wedding-pink)",
  },
  {
    title: "Something Blue Crew",
    members: [
      { name: "Samantha Pascoe", role: "Something Blue Crew" },
      { name: "Samantha Mensah", role: "Something Blue Crew" },
      { name: "Edith Wasserfall", role: "Something Blue Crew" },
      { name: "Jessica Henn", role: "Something Blue Crew" },
    ],
    color: "#7BA3C7",
  },
];

export default function BridalPartySection() {
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
          Our Bridal Party
        </motion.h2>

        <motion.p
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='font-lato text-lg sm:text-xl text-center mb-12 md:mb-16 max-w-3xl mx-auto'
          style={{ color: "var(--wedding-slate)" }}
        >
          The amazing people standing by our side on our special day
        </motion.p>

        {/* Bridal Party Groups */}
        <div className='space-y-12 md:space-y-16'>
          {bridalPartyGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              variants={fadeInVariants}
              initial='hidden'
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: groupIndex * 0.1 }}
            >
              {/* Group Title */}
              <h3
                className='font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8'
                style={{ color: "var(--wedding-dark-grey)" }}
              >
                {group.title}
              </h3>

              {/* Members Grid */}
              <motion.div
                variants={staggerChildren}
                initial='hidden'
                animate={inView ? "visible" : "hidden"}
                className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'
              >
                {group.members.map((member, index) => (
                  <motion.div
                    key={`${member.name}-${index}`}
                    variants={fadeInVariants}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className='bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'
                  >
                    {/* Portrait Image Placeholder (3:4 aspect ratio) */}
                    <div
                      className='relative aspect-[3/4] flex items-center justify-center'
                      style={{ backgroundColor: group.color, opacity: 0.9 }}
                    >
                      <User className='w-16 h-16 sm:w-20 sm:h-20 text-white opacity-60' />
                    </div>

                    {/* Card Content */}
                    <div className='p-4 text-center'>
                      <h4
                        className='font-playfair text-lg sm:text-xl font-semibold mb-1'
                        style={{ color: "var(--wedding-dark-grey)" }}
                      >
                        {member.name}
                      </h4>

                      {/* Role Badge - Only show for Best Man and Maid of Honour */}
                      {(member.role === "Best Man" ||
                        member.role === "Maid of Honour") && (
                        <div
                          className='inline-block px-3 py-1 rounded-full text-sm font-lato font-medium'
                          style={{
                            backgroundColor: group.color,
                            color: "white",
                            opacity: 0.85,
                          }}
                        >
                          {member.role}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
