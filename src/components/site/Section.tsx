import type { ReactNode } from "react";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  hideHeader?: boolean;
  children: ReactNode;
}

export default function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  hideHeader = false,
  children,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("section-shell", className)}>
      <div className='mx-auto max-w-6xl px-5 md:px-8'>
        {!hideHeader ? (
          <header className='section-heading'>
            <p className='section-eyebrow'>{eyebrow}</p>
            <h2 id={`${id}-title`} className='section-title'>
              {title}
            </h2>
            <p className='section-copy'>{description}</p>
            <div className='divider-floral' aria-hidden='true'>
              <Leaf className='h-4 w-4' />
            </div>
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
