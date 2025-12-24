import { Button } from "@/components/ui/button";
import PublicNavigation from "@/components/PublicNavigation";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className='min-h-screen w-full bg-cover bg-center bg-no-repeat relative'
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
            className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 drop-shadow-2xl tracking-wide'
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Nicole & Lashca&apos;s
          </h1>

          {/* Wedding text */}
          <h2
            className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-12 drop-shadow-2xl tracking-wide'
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Wedding
          </h2>

          <Button
            asChild
            size='lg'
            className='rounded-full px-12 py-6 text-lg font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105'
          >
            <Link href='/rsvp'>RSVP</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
