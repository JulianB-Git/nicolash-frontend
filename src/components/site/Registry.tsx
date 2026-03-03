import { ExternalLink, Gift } from "lucide-react";
import SectionReveal from "@/components/site/SectionReveal";
import { registryLinks } from "@/data/travel";

export default function Registry() {
  return (
    <div className='grid gap-5 md:grid-cols-3'>
      <SectionReveal className='paper-card p-6 md:col-span-2'>
        <h3 className='inline-flex items-center gap-2 text-2xl'>
          <Gift className='h-5 w-5 text-mauve' aria-hidden='true' />
          Registry links
        </h3>
        <ul className='mt-5 grid gap-3 sm:grid-cols-2'>
          {registryLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className='inline-flex w-full items-center justify-between gap-2 rounded-full border border-sage/30 bg-cream/80 px-4 py-2 text-sm text-ink transition hover:bg-blush/45'
              >
                {link.label}
                <ExternalLink className='h-3.5 w-3.5 text-olive/80' aria-hidden='true' />
              </a>
            </li>
          ))}
        </ul>
      </SectionReveal>

      <SectionReveal className='paper-card p-6' delay={0.1}>
        <p className='text-smallcaps text-xs text-olive/85'>Gift note</p>
        <p className='mt-3 text-base leading-relaxed text-navy/88'>
          Your presence is enough. If you would like to gift, please use the
          registry links. No boxed gifts, please.
        </p>
      </SectionReveal>
    </div>
  );
}
