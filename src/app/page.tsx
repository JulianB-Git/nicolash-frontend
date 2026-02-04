"use client";

import HeroSection from "@/components/wedding/HeroSection";
import OurStorySection from "@/components/wedding/OurStorySection";
import EventDetailsSection from "@/components/wedding/EventDetailsSection";
import VenueMapSection from "@/components/wedding/VenueMapSection";
import AccommodationSection from "@/components/wedding/AccommodationSection";
import TransportSection from "@/components/wedding/TransportSection";
import DressCodeSection from "@/components/wedding/DressCodeSection";
import RegistrySection from "@/components/wedding/RegistrySection";
// import PhotoGallerySection from "@/components/wedding/PhotoGallerySection"; // Bento Grid version
import PhotoGalleryLightbox from "@/components/wedding/PhotoGalleryLightbox"; // Lightbox version
import BridalPartySection from "@/components/wedding/BridalPartySection";
import FAQSection from "@/components/wedding/FAQSection";
import Footer from "@/components/wedding/Footer";
import { useEffect, useState } from "react";

export default function WeddingLandingPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // Small delay to ensure smooth transition
      setTimeout(() => setShowContent(true), 100);
    };
    img.onerror = () => {
      // If image fails to load, show content anyway
      setShowContent(true);
    };
    img.src = "/images/wedding/leading.jpg";
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
            Getting ready!
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className='overflow-x-hidden'>
      <HeroSection />
      <OurStorySection />
      <PhotoGalleryLightbox />
      <EventDetailsSection />
      <VenueMapSection />
      <AccommodationSection />
      <TransportSection />
      <DressCodeSection />
      <RegistrySection />
      <BridalPartySection />
      <FAQSection />
      <Footer />
    </main>
  );
}
