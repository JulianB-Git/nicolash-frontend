import Image from "next/image";
import type { AmbianceImage } from "@/data/ambiance";
import { cn } from "@/lib/utils";

interface AmbianceCollageBannerProps {
  images: AmbianceImage[];
}

const layoutClasses = [
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-5 lg:row-span-2",
  "col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-4 lg:row-span-1",
  "col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1",
  "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-3 lg:row-span-1",
  "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-4 lg:row-span-1",
];

export default function AmbianceCollageBanner({
  images,
}: AmbianceCollageBannerProps) {
  return (
    <section
      aria-label='Ambiance collage banner'
      className='relative py-6 md:py-8'
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,253,248,0.35), rgba(255,253,248,0.7))",
      }}
    >
      <div className='mx-auto max-w-[88rem] px-4 md:px-6'>
        <div className='paper-card overflow-hidden p-3 sm:p-4'>
          <header className='mb-4 flex items-end justify-between gap-4 px-1 sm:mb-5'>
            <div>
              <p className='text-smallcaps text-[0.68rem] text-olive/80 sm:text-xs'>
                Ambiance
              </p>
              <h3 className='mt-1 font-serif text-xl text-ink md:text-2xl'>
                Garden Wedding
              </h3>
            </div>
            <p className='hidden max-w-md text-right text-xs leading-relaxed text-navy/72 md:block'>
              A soft blend of florals, linen, and long-table moments shaping
              the tone of the celebration.
            </p>
          </header>

          <div className='grid grid-cols-2 auto-rows-[8.3rem] gap-2.5 sm:auto-rows-[9.2rem] sm:gap-3 md:grid-cols-4 md:auto-rows-[9.4rem] lg:grid-cols-12 lg:auto-rows-[10.8rem] lg:gap-3.5'>
            {images.slice(0, 5).map((image, index) => (
              <figure
                key={image.src}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-sage/20 bg-cream/80",
                  layoutClasses[index]
                )}
              >
                <div className='relative h-full w-full'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes='(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw'
                    className='object-cover object-center transition duration-700 group-hover:scale-[1.03]'
                  />

                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/14 via-transparent to-transparent opacity-70' />

                  {index === 0 ? (
                    <figcaption className='pointer-events-none absolute inset-x-0 bottom-0 p-4 text-cream'>
                      <p className='text-smallcaps text-[0.62rem] text-cream/85 sm:text-[0.68rem]'>
                        Garden Dinner Mood
                      </p>
                      <p className='mt-1 font-serif text-sm sm:text-base'>
                        Soft florals, layered texture, and candlelight details
                      </p>
                    </figcaption>
                  ) : null}
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
