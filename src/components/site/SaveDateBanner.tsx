import { Sparkles } from "lucide-react";

export default function SaveDateBanner() {
  return (
    <aside className='border-b border-sage/20 bg-petal/70'>
      <div className='mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/85 md:text-xs'>
        <Sparkles className='h-3.5 w-3.5 text-mauve' aria-hidden='true' />
        <span>
          Save the date | Nicole Carew &amp; Lashca Pieterse | 1 April 2026 |
          Nibbana Farm, Boontjiesrivier Rd Wolseley
        </span>
      </div>
    </aside>
  );
}
