import Image from "next/image";
import SectionReveal from "@/components/site/SectionReveal";
import type { BridalPartyMember } from "@/data/bridalParty";
import { cn } from "@/lib/utils";

interface BridalPartyGridProps {
  members: BridalPartyMember[];
}

const featuredPattern = new Set([0, 5, 10, 15]);

export default function BridalPartyGrid({ members }: BridalPartyGridProps) {
  return (
    <div className='relative'>
      <div
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
        aria-hidden='true'
      >
        <div className='absolute -left-16 top-12 h-48 w-48 rounded-full bg-blush/55 blur-3xl' />
        <div className='absolute right-0 top-40 h-56 w-56 rounded-full bg-sage/25 blur-3xl' />
        <div className='absolute bottom-6 left-1/3 h-40 w-40 rounded-full bg-petal/60 blur-3xl' />
      </div>

      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {members.map((member, index) => (
          <SectionReveal
            key={`${member.image}-${index}`}
            delay={(index % 6) * 0.04}
            className={cn(featuredPattern.has(index) && "lg:col-span-2")}
          >
            <article className='paper-card group h-full p-3'>
              <div className='relative overflow-hidden rounded-[1.2rem] bg-cream/90'>
                <div className={cn("relative", featuredPattern.has(index) ? "aspect-[5/3]" : "aspect-[3/4]")}>
                  <Image
                    src={member.image}
                    alt={`Bridal party portrait of ${member.name}`}
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                    className='object-cover transition duration-500 group-hover:scale-[1.03]'
                  />
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100' />
              </div>

              <div className='mt-4 flex items-center justify-between gap-4 px-1 pb-1'>
                <div>
                  <p className='text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-olive/80'>
                    {member.label ?? "Bridal Party"}
                  </p>
                  <h3 className='mt-1 text-lg font-semibold text-ink'>{member.name}</h3>
                </div>
                <div className='hidden h-10 w-10 items-center justify-center rounded-full border border-olive/30 bg-cream/80 text-xs font-semibold text-olive sm:flex'>
                  {member.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </div>
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
