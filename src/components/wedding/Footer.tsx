"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className='py-8 px-4 text-center'
      style={{ backgroundColor: "var(--wedding-dark-grey)", color: "white" }}
    >
      <div className='max-w-4xl mx-auto space-y-4'>
        {/* Heart Icon */}
        <div className='flex justify-center'>
          <Heart className='w-6 h-6' fill='currentColor' />
        </div>

        {/* Copyright */}
        <p className='font-lato text-base sm:text-lg'>
          © {currentYear} Nicole & Lashca
        </p>

        {/* Optional Message */}
        <p className='font-lato text-sm sm:text-base opacity-80'>
          Made with love for our special day
        </p>
      </div>
    </footer>
  );
}
