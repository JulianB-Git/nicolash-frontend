"use client";

import Image from "next/image";
import { useState } from "react";

interface PreloadedBackgroundProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}

export default function PreloadedBackground({
  src,
  alt,
  children,
  className = "",
}: PreloadedBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Background Image with Next.js optimization */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        className={`object-cover transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Loading overlay */}
      {!imageLoaded && (
        <div className='absolute inset-0 bg-white flex items-center justify-center z-20'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-6'></div>
            <p
              className='text-gray-700 text-xl'
              style={{ fontFamily: "var(--font-cursive)" }}
            >
              Wait! Let me fix my hair
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-10 transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
