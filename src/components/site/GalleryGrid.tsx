import Image from "next/image";
import SectionReveal from "@/components/site/SectionReveal";
import type { GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  images: GalleryImage[];
}

const aspectClasses = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[5/6]",
  "aspect-[3/4]",
  "aspect-[16/11]",
];

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className='columns-1 gap-4 sm:columns-2 lg:columns-3'>
      {images.map((image, index) => (
        <SectionReveal
          key={`${image.src}-${index}`}
          delay={(index % 6) * 0.03}
          className='mb-4 break-inside-avoid'
        >
          <figure className='paper-card overflow-hidden p-0'>
            <div className={cn("relative", aspectClasses[index % aspectClasses.length])}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='object-cover transition duration-500 hover:scale-[1.02]'
              />
            </div>
          </figure>
        </SectionReveal>
      ))}
    </div>
  );
}
