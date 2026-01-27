"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How far is Tulbagh from Cape Town?",
    answer: "Approximately 120 km or 1.5–2 hours' drive.",
  },
  {
    question: "Will there be a bar?",
    answer: "Yes — a cash bar will be available.",
  },
  {
    question: "How do I get around Cape Town?",
    answer:
      "Uber is the easiest option within the city. For exploring beyond Cape Town or travelling to the wedding, we strongly recommend hiring a car.",
  },
  {
    question: "How do I get to and from the wedding?",
    answer:
      "Uber (see estimated fares above) or Avis car rental from Cape Town International Airport are your best options.",
  },
];

export default function FAQSection() {
  const { ref, inView } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={ref}
      className='py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: "var(--wedding-cream)" }}
    >
      <div className='max-w-4xl mx-auto'>
        {/* Section Heading */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='text-center mb-12 md:mb-16'
        >
          <div
            className='w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'
            style={{ backgroundColor: "var(--wedding-sage)" }}
          >
            <HelpCircle className='w-10 h-10 text-white' />
          </div>

          <h2
            className='font-playfair text-4xl sm:text-5xl md:text-6xl font-bold mb-4'
            style={{ color: "var(--wedding-dark-grey)" }}
          >
            Frequently Asked Questions
          </h2>

          <p
            className='font-lato text-lg sm:text-xl'
            style={{ color: "var(--wedding-slate)" }}
          >
            Everything you need to know about our special day
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={staggerChildren}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='space-y-4'
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInVariants}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200'
              >
                <span
                  className='font-lato text-base sm:text-lg font-semibold pr-4'
                  style={{ color: "var(--wedding-dark-grey)" }}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    className='w-5 h-5 flex-shrink-0'
                    style={{ color: "var(--wedding-sage)" }}
                  />
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className='overflow-hidden'
              >
                <div
                  className='px-6 pb-5 pt-2'
                  style={{
                    borderTop: "1px solid var(--wedding-light-grey)",
                  }}
                >
                  <p
                    className='font-lato text-base sm:text-lg leading-relaxed'
                    style={{ color: "var(--wedding-slate)" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Help */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='mt-12 text-center p-6 rounded-lg'
          style={{ backgroundColor: "var(--wedding-light-grey)" }}
        >
          <p
            className='font-lato text-base sm:text-lg'
            style={{ color: "var(--wedding-slate)" }}
          >
            Have more questions? Feel free to reach out to us directly!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
