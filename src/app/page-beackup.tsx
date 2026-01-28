"use client";

import { Button } from "@/components/ui/button";
import PublicNavigation from "@/components/PublicNavigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      // Small delay to ensure smooth transition
      setTimeout(() => setShowContent(true), 100);
    };
    img.onerror = () => {
      // If image fails to load, show content anyway
      setImageLoaded(true);
      setShowContent(true);
    };
    img.src = "/images/brushedhome.png";
  }, []);

  // Loading screen while image loads
  if (!showContent) {
    return (
      <div className='min-h-screen w-full bg-white flex items-center justify-center'>
        <div className='text-center'>
          {/* Loading spinner */}
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-6'></div>

          {/* Loading text */}
          <p
            className='text-gray-700 text-xl'
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Wait! Let me fix my hair
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full bg-cover bg-center bg-no-repeat relative transition-opacity duration-500 ${
        imageLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: "url('/images/brushedhome.png')",
      }}
    >
      {/* Navigation with transparent background */}
      <PublicNavigation transparent />

      {/* Content */}
      <div className='relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4'>
        <div className='text-center max-w-4xl mx-auto'>
          {/* Names */}
          <h1
            className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 drop-shadow-2xl tracking-wide animate-fade-in'
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Nicole & Lashca&apos;s
          </h1>

          {/* Wedding text */}
          <h2
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-12 drop-shadow-2xl tracking-wide animate-fade-in-delay'
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Wedding
          </h2>

          <Button
            asChild
            size='lg'
            className='rounded-full px-12 py-6 text-lg font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 animate-fade-in-delay-2'
          >
            <Link href='/rsvp'>RSVP</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
