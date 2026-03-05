import { ArrowDownRight, Compass, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import SectionReveal from "@/components/site/SectionReveal";

export default function Hero() {
  return (
    <section
      id='home'
      aria-labelledby='hero-title'
      className='relative overflow-hidden px-5 pb-20 pt-20 md:px-8 md:pb-24 md:pt-28'
    >
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        <div className='absolute inset-0 opacity-55 mix-blend-normal'>
          <Image
            src='/images/wedding/hero-background.png'
            alt=''
            fill
            priority
            sizes='100vw'
            className='object-cover object-bottom brightness-110 contrast-105 saturate-110 md:object-center'
          />
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-linen/70 via-linen/24 to-linen/62' />

        <svg
          viewBox='0 0 1440 300'
          className='absolute inset-x-0 top-0 h-44 w-full text-navy/20'
          fill='none'
        >
          <path
            d='M-40 58C130 28 250 130 408 92C566 54 662 6 828 46C996 86 1110 166 1480 108'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M-80 124C116 94 308 200 496 160C684 120 920 48 1114 92C1308 136 1480 186 1600 174'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
          {Array.from({ length: 21 }).map((_, index) => {
            const x = 34 + index * 66;
            const y = 82 + (index % 3) * 11;
            return (
              <g key={`bulb-${index}`}>
                <line
                  x1={x}
                  y1={y}
                  x2={x}
                  y2={y + 11}
                  stroke='currentColor'
                  strokeWidth='1.7'
                />
                <ellipse
                  cx={x}
                  cy={y + 16}
                  rx='4.2'
                  ry='5.2'
                  stroke='currentColor'
                  strokeWidth='1.6'
                />
              </g>
            );
          })}
        </svg>

      </div>

      <div className='relative mx-auto max-w-6xl'>
        <SectionReveal className='mx-auto max-w-4xl text-center'>
          <p className='text-smallcaps text-xs text-olive/80 md:text-sm'>
            For the wedding of
          </p>

          <h1
            id='hero-title'
            className='mt-5 font-nameplate text-4xl leading-[1.04] text-olive sm:text-5xl md:text-7xl'
          >
            Nicole Carew
            <span className='mx-3 inline-block font-serif text-3xl text-mauve md:text-5xl'>
              &amp;
            </span>
            Lashca Pieterse
          </h1>

          <p className='mt-6 text-smallcaps font-serif text-sm text-navy/80 md:text-base'>
            Wednesday, 1 April 2026 | Nibbana Farm, Boontjiesrivier Rd Wolseley
          </p>

          <p className='mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink/88 md:text-lg'>
            We are gathering for an afternoon wedding and long-table lunch at
            Nibbana Farm, Boontjiesrivier Rd Wolseley. Thank you for making the
            trip and sharing this season with us.
          </p>

          <div className='mt-10 flex flex-wrap items-center justify-center gap-3'>
            <a href='#rsvp' className='btn-pill-primary'>
              RSVP
            </a>
            <a href='#schedule' className='btn-pill-outline'>
              Schedule
            </a>
            <a href='#travel' className='btn-pill-outline'>
              Travel
            </a>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2} className='mx-auto mt-12 max-w-4xl'>
          <div className='paper-card grid gap-6 px-6 py-7 md:grid-cols-3 md:px-8'>
            <div className='flex items-start gap-3'>
              <Sparkles className='mt-0.5 h-4 w-4 text-mauve' aria-hidden='true' />
              <p className='text-sm text-navy/85'>
                A light, airy garden-party lunch with soft florals and open
                skies.
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <Compass className='mt-0.5 h-4 w-4 text-mauve' aria-hidden='true' />
              <p className='text-sm text-navy/85'>
                Set at Nibbana Farm, Boontjiesrivier Rd Wolseley, with mountain
                views and close friends at one table.
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <Heart className='mt-0.5 h-4 w-4 text-mauve' aria-hidden='true' />
              <p className='text-sm text-navy/85'>
                Warm, minimal, and easy to move through from ceremony to dance
                floor.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.35} className='mt-10 flex justify-center'>
          <a
            href='#our-story'
            className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-olive/85 hover:text-ink'
            aria-label='Scroll to our story section'
          >
            Scroll through
            <ArrowDownRight className='h-4 w-4' aria-hidden='true' />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
