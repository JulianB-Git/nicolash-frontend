import { ExternalLink, Sparkles } from "lucide-react";
import SectionReveal from "@/components/site/SectionReveal";

const PINTEREST_LINK = "https://www.pinterest.com/pin/410672059794716908/";
const PINTEREST_EMBED =
  "https://assets.pinterest.com/ext/embed.html?id=410672059794716908";

export default function AttireBoard() {
  return (
    <SectionReveal className='paper-card p-6 md:p-8'>
      <div className='grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-center'>
        <div>
          <h3 className='inline-flex items-center gap-2 text-2xl'>
            <Sparkles className='h-5 w-5 text-mauve' aria-hidden='true' />
            What to wear
          </h3>
          <p className='mt-4 max-w-xl text-base leading-relaxed text-navy/85'>
            We curated a Pinterest mood board to guide the look and feel for the
            day.
          </p>
          <a
            href={PINTEREST_LINK}
            target='_blank'
            rel='noopener noreferrer'
            className='btn-pill-outline mt-5 inline-flex items-center gap-2'
            aria-label='Open Pinterest attire mood board in a new tab'
          >
            Open Pinterest board
            <ExternalLink className='h-4 w-4' aria-hidden='true' />
          </a>
        </div>

        <div className='overflow-hidden rounded-2xl border border-sage/25 bg-linen/60 p-2'>
          <iframe
            src={PINTEREST_EMBED}
            title='Pinterest attire mood board'
            className='h-[420px] w-full rounded-xl bg-cream'
            loading='lazy'
          />
        </div>
      </div>
    </SectionReveal>
  );
}
