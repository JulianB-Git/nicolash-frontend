"use client";

import Link from "next/link";
import Image from "next/image";

export default function RSVPBannerSection() {
  return (
    <section className='relative w-full py-20 overflow-hidden bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50'>
      {/* Decorative lines */}
      <div className='absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-30' />
      <div className='absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-30' />

      <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative'>
        {/* Envelope Image - Overlaying and oversized */}
        <div className='relative flex-shrink-0 z-20'>
          <div className='relative w-64 h-64 md:w-96 md:h-96 transform -rotate-12 hover:rotate-0 transition-transform duration-500'>
            <Image
              src='/envelope.png'
              alt='Wedding Invitation Envelope'
              fill
              className='object-contain drop-shadow-2xl'
              priority
            />
          </div>
        </div>

        {/* RSVP Button */}
        <div className='text-center z-10'>
          <Link href='/rsvp'>
            <button className='group relative px-12 py-4 bg-white border-2 border-rose-400 rounded-full overflow-hidden transition-all duration-300 hover:border-rose-500 hover:shadow-xl'>
              <span
                className='relative z-10 text-2xl font-semibold text-rose-500 transition-colors duration-300 group-hover:text-white'
                style={{ fontFamily: "var(--font-cursive)" }}
              >
                RSVP
              </span>

              {/* Hover effect background */}
              <div className='absolute inset-0 bg-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left' />
            </button>
          </Link>

          <p className='text-center mt-3 text-sm text-gray-600'>
            Join us in celebrating
          </p>
        </div>
      </div>
    </section>
  );
}
