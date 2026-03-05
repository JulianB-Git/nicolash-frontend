import {
  BedDouble,
  CarTaxiFront,
  ExternalLink,
  MapPinned,
  PlaneLanding,
  Trees,
} from "lucide-react";
import Image from "next/image";
import { gettingThere, stayOptions, thingsToDo } from "@/data/travel";
import SectionReveal from "@/components/site/SectionReveal";

const nibbanaMapLink =
  "https://www.google.com/maps/place/Nibbana+Farm/@-33.383625,19.2210636,17z/data=!4m9!3m8!1s0x1dcd6b1cfb503847:0x59e6f12e0ad82ee8!5m2!4m1!1i2!8m2!3d-33.383625!4d19.2210636!16s%2Fg%2F11bz0m5wl7?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D";
const nibbanaMapEmbed =
  "https://www.google.com/maps?q=-33.383625,19.2210636&z=17&output=embed";

export default function TravelStay() {
  return (
    <div className='grid gap-5 lg:grid-cols-12'>
      <SectionReveal className='paper-card p-6 lg:col-span-4'>
        <h3 className='inline-flex items-center gap-2 text-2xl'>
          <PlaneLanding className='h-5 w-5 text-mauve' aria-hidden='true' />
          Getting there
        </h3>
        <ul className='mt-4 space-y-3 text-sm leading-relaxed text-navy/85'>
          {gettingThere.map((item) => (
            <li key={item} className='flex items-start gap-2'>
              <CarTaxiFront className='mt-0.5 h-4 w-4 shrink-0 text-olive/75' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionReveal>

      <SectionReveal className='paper-card p-6 lg:col-span-4' delay={0.08}>
        <h3 className='inline-flex items-center gap-2 text-2xl'>
          <BedDouble className='h-5 w-5 text-mauve' aria-hidden='true' />
          Accommodation
        </h3>
        <ul className='mt-4 max-h-[18rem] space-y-3 overflow-y-auto pr-1'>
          {stayOptions.map((option) => (
            <li
              key={option.name}
              className='rounded-2xl border border-sage/20 bg-cream/60 p-3'
            >
              <div className='flex items-start gap-3'>
                <div className='relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-sage/20'>
                  <Image
                    src={option.image}
                    alt={option.name}
                    fill
                    sizes='96px'
                    className='object-cover'
                  />
                </div>

                <div className='min-w-0'>
                  <p className='text-sm font-semibold uppercase tracking-[0.12em] text-olive'>
                    {option.name}
                  </p>
                  <p className='mt-1 inline-flex rounded-full border border-sage/25 bg-linen/80 px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-navy/75'>
                    {option.guests} guests
                  </p>
                  <p className='mt-2 text-sm leading-relaxed text-navy/82'>{option.note}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </SectionReveal>

      <SectionReveal className='paper-card p-6 lg:col-span-4' delay={0.12}>
        <h3 className='inline-flex items-center gap-2 text-2xl'>
          <Trees className='h-5 w-5 text-mauve' aria-hidden='true' />
          Nibbana Farm area ideas
        </h3>
        <ul className='mt-4 space-y-2 text-sm leading-relaxed text-navy/85'>
          {thingsToDo.map((item) => (
            <li key={item} className='rounded-full border border-sage/20 px-3 py-1.5'>
              {item}
            </li>
          ))}
        </ul>
      </SectionReveal>

      <SectionReveal className='paper-card overflow-hidden p-0 lg:col-span-12' delay={0.16}>
        <div className='relative h-[320px] overflow-hidden md:h-[380px]'>
          <iframe
            title='Nibbana Farm map'
            src={nibbanaMapEmbed}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='h-full w-full border-0'
          />

          <div className='pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-linen/80 to-transparent' />
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-linen/75 to-transparent' />

          <div className='absolute left-4 top-4 rounded-2xl border border-sage/25 bg-cream/88 px-4 py-3 shadow-sm backdrop-blur-sm'>
            <p className='inline-flex items-center gap-2 text-smallcaps text-[0.65rem] text-olive/85 md:text-xs'>
              <MapPinned className='h-3.5 w-3.5' aria-hidden='true' />
              Nibbana Farm
            </p>
            <p className='mt-1 text-sm text-navy/85'>
              Nibbana Farm, Boontjiesrivier Rd Wolseley
            </p>
          </div>

          <a
            href={nibbanaMapLink}
            target='_blank'
            rel='noreferrer'
            className='absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-cream/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition hover:bg-petal/50'
          >
            Open in Maps
            <ExternalLink className='h-3.5 w-3.5 text-olive/85' aria-hidden='true' />
          </a>
        </div>
      </SectionReveal>
    </div>
  );
}
