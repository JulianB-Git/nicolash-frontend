"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigationItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 border-b border-sage/20 bg-linen/85 backdrop-blur-md'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8'>
        <a
          href='#home'
          className='font-nameplate text-lg leading-none text-olive sm:text-xl md:text-2xl'
          aria-label='Go to homepage section'
        >
          Nicole &amp; Lashca
        </a>

        <nav className='hidden items-center gap-5 md:flex' aria-label='Primary navigation'>
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-smallcaps text-[0.74rem] text-ink/80 transition hover:text-olive",
                item.href === "#rsvp" &&
                  "rounded-full border border-olive/35 bg-cream/90 px-4 py-2 text-[0.7rem]"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type='button'
          className='inline-flex items-center justify-center rounded-full border border-sage/30 bg-cream p-2 text-ink md:hidden'
          aria-expanded={menuOpen}
          aria-controls='mobile-menu'
          aria-label='Toggle navigation menu'
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id='mobile-menu'
            aria-label='Mobile navigation'
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className='max-h-[70vh] overflow-y-auto border-t border-sage/20 bg-cream/95 px-5 py-4 md:hidden'
          >
            <ul className='space-y-2'>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className='block rounded-xl px-3 py-2 text-sm font-medium text-ink/85 hover:bg-petal/55 hover:text-olive'
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
