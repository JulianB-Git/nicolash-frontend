"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { FaqItem } from "@/data/faqs";

interface FAQAccordionProps {
  items: FaqItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className='mx-auto grid max-w-4xl gap-3'>
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const answerId = `faq-answer-${index}`;

        return (
          <article key={item.question} className='paper-card px-5 py-4 md:px-6'>
            <h3>
              <button
                type='button'
                className='flex w-full items-center justify-between gap-4 text-left'
                onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className='text-base font-medium leading-relaxed text-ink md:text-lg'>
                  {item.question}
                </span>
                <span
                  className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sage/30 bg-cream'
                  aria-hidden='true'
                >
                  {isOpen ? (
                    <Minus className='h-4 w-4 text-olive' />
                  ) : (
                    <Plus className='h-4 w-4 text-olive' />
                  )}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={answerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className='overflow-hidden'
                >
                  <p className='border-t border-sage/25 pt-4 text-sm leading-relaxed text-navy/85 md:text-base'>
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
