import Image from "next/image";
import SectionReveal from "@/components/site/SectionReveal";
import type { TimelineEvent } from "@/data/timeline";
import { cn } from "@/lib/utils";

interface TimelineProps {
  events: TimelineEvent[];
}

const collageLayout = [
  "col-span-2 aspect-[5/3]",
  "aspect-[3/4]",
  "aspect-square",
  "col-span-2 aspect-[5/2]",
];

const collageLayoutThree = ["col-span-2 aspect-[5/3]", "aspect-[4/3]", "aspect-[4/3]"];

export default function Timeline({ events }: TimelineProps) {
  return (
    <ol className='relative mx-auto max-w-6xl space-y-16 md:space-y-20'>
      <div
        className='absolute left-4 top-0 h-full w-px bg-gradient-to-b from-sage/40 via-olive/30 to-transparent md:left-1/2 md:-translate-x-1/2'
        aria-hidden='true'
      />

      {events.map((event, index) => (
        <li key={`${event.date}-${event.title}`} className='relative'>
          {event.title.includes("Zanzibar") ? null : (
            <span
              className='absolute left-4 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-olive/70 shadow-paper md:left-1/2'
              aria-hidden='true'
            />
          )}

          <SectionReveal
            className={cn(
              "pl-10 md:pl-0",
              index % 2 === 0 ? "md:pr-10" : "md:pl-10"
            )}
            delay={(index % 3) * 0.05}
          >
            <article
              className={cn(
                "grid gap-8 rounded-[2rem] border border-sage/20 bg-cream/80 p-6 shadow-paper md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
                index % 2 === 0 ? "md:mr-auto md:max-w-[42rem]" : "md:ml-auto md:max-w-[42rem]"
              )}
            >
              <div className='space-y-4'>
                <p className='text-smallcaps text-xs text-olive/80'>{event.date}</p>
                <h3 className='text-2xl md:text-3xl'>{event.title}</h3>
                <p className='text-sm leading-relaxed text-navy/85 md:text-base'>
                  {event.summary}
                </p>
                <div className='flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.35em] text-olive/70'>
                  <span className='h-px w-10 bg-sage/50' />
                  Our Story
                </div>
              </div>

              <div className='relative'>
                <div className='pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-blush/60 blur-3xl' />
                <div className='pointer-events-none absolute -bottom-10 left-10 h-28 w-28 rounded-full bg-sage/30 blur-3xl' />

                {event.images.length === 1 ? (
                  <figure className='overflow-hidden rounded-2xl border border-sage/20 bg-cream/90'>
                    <div className='relative aspect-[4/5] w-full'>
                      <Image
                        src={event.images[0]}
                        alt={`${event.title} memory`}
                        fill
                        sizes='(max-width: 768px) 100vw, 40vw'
                        className='object-cover object-top'
                      />
                    </div>
                  </figure>
                ) : (
                  <div className='grid grid-cols-2 gap-3'>
                    {event.images.slice(0, 4).map((image, imageIndex) => (
                      <figure
                        key={`${image}-${imageIndex}`}
                        className={cn(
                          "overflow-hidden rounded-2xl border border-sage/20 bg-cream/90",
                          (event.images.length === 3
                            ? collageLayoutThree[imageIndex]
                            : collageLayout[imageIndex]) ?? "aspect-[4/3]"
                        )}
                      >
                        <div className='relative h-full w-full'>
                          <Image
                            src={image}
                            alt={`${event.title} memory ${imageIndex + 1}`}
                            fill
                            sizes='(max-width: 768px) 100vw, 40vw'
                            className={cn(
                              "object-cover transition duration-500 hover:scale-[1.03]",
                              imageIndex === 0 && "object-[50%_10%]"
                            )}
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </SectionReveal>
        </li>
      ))}
    </ol>
  );
}
