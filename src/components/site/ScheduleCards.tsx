import { Clock3, MapPin } from "lucide-react";
import SectionReveal from "@/components/site/SectionReveal";
import type { ScheduleItem } from "@/data/schedule";

interface ScheduleCardsProps {
  items: ScheduleItem[];
}

export default function ScheduleCards({ items }: ScheduleCardsProps) {
  return (
    <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
      {items.map((item, index) => (
        <SectionReveal key={`${item.title}-${item.day}`} delay={index * 0.04}>
          <article className='paper-card h-full p-6'>
            <p className='text-smallcaps text-xs text-olive/80'>{item.day}</p>
            <h3 className='mt-3 text-2xl'>{item.title}</h3>

            <dl className='mt-5 space-y-3 text-sm text-navy/85'>
              <div className='flex items-center gap-2'>
                <dt className='sr-only'>Time</dt>
                <Clock3 className='h-4 w-4 text-mauve' aria-hidden='true' />
                <dd>{item.time}</dd>
              </div>
              <div className='flex items-center gap-2'>
                <dt className='sr-only'>Location</dt>
                <MapPin className='h-4 w-4 text-mauve' aria-hidden='true' />
                <dd>{item.place}</dd>
              </div>
            </dl>

            <p className='mt-5 border-t border-sage/25 pt-4 text-sm leading-relaxed text-ink/85'>
              {item.details}
            </p>
          </article>
        </SectionReveal>
      ))}
    </div>
  );
}
