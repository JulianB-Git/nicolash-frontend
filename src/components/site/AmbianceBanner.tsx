import Image from "next/image";

interface AmbianceBannerProps {
  src?: string;
  alt?: string;
}

export default function AmbianceBanner({
  src = "/images/wedding/ambiance-banner.png",
  alt = "Floral wedding ambiance mood collage",
}: AmbianceBannerProps) {
  return (
    <section
      aria-label='Ambiance banner'
      className='relative py-3 md:py-4'
      style={{ background: "linear-gradient(to bottom, rgba(255,253,248,0.35), rgba(255,253,248,0.7))" }}
    >
      <div className='mx-auto max-w-[88rem] px-4 md:px-6'>
        <div className='paper-card overflow-hidden p-0'>
          <Image
            src={src}
            alt={alt}
            width={2400}
            height={1800}
            sizes='(max-width: 768px) 100vw, (max-width: 1440px) 92vw, 1408px'
            className='h-auto w-full object-contain'
            priority
          />
        </div>
      </div>
    </section>
  );
}
