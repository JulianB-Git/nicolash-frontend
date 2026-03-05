import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className='border-t border-sage/25 bg-cream/80'>
      <div className='mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center text-xs uppercase tracking-[0.17em] text-ink/70 md:flex-row md:justify-between md:px-8'>
        <p>Nicole Carew &amp; Lashca Pieterse</p>
        <p className='inline-flex items-center gap-2 text-olive'>
          <Heart className='h-3.5 w-3.5' aria-hidden='true' />
          1 April 2026
        </p>
        <p>Nibbana Farm, Boontjiesrivier Rd Wolseley</p>
      </div>
    </footer>
  );
}
