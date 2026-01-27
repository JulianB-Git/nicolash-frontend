import HeroSection from "@/components/wedding/HeroSection";
import OurStorySection from "@/components/wedding/OurStorySection";
import EventDetailsSection from "@/components/wedding/EventDetailsSection";
import VenueMapSection from "@/components/wedding/VenueMapSection";
import AccommodationSection from "@/components/wedding/AccommodationSection";
import TransportSection from "@/components/wedding/TransportSection";
import DressCodeSection from "@/components/wedding/DressCodeSection";
import RegistrySection from "@/components/wedding/RegistrySection";
import BridalPartySection from "@/components/wedding/BridalPartySection";
import FAQSection from "@/components/wedding/FAQSection";
import Footer from "@/components/wedding/Footer";

export const metadata = {
  title: "Nicole & Lashca's Wedding | April 1, 2026",
  description:
    "Join us for our South of France inspired wedding at Nibbana Farm, Tulbagh on April 1, 2026",
  openGraph: {
    title: "Nicole & Lashca's Wedding",
    description: "Join us for our wedding celebration on April 1, 2026",
    type: "website",
    images: [
      {
        url: "/images/wedding/hero-background.png",
        width: 1200,
        height: 630,
        alt: "Nicole & Lashca's Wedding",
      },
    ],
  },
};

export default function WeddingLandingPage() {
  return (
    <main className='overflow-x-hidden'>
      <HeroSection />
      <OurStorySection />
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
