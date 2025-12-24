"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface PublicNavigationProps {
  transparent?: boolean;
}

export default function PublicNavigation({
  transparent = false,
}: PublicNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`${
          transparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-sm shadow-sm"
        } sticky top-0 z-50`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo/Brand */}
            <Link
              href='/'
              className='text-xl font-semibold text-gray-900 hover:opacity-80 transition-opacity'
              onClick={closeMenu}
            >
              Nicole & Lashca
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-8'>
              <Link
                href='/our-story'
                className='text-gray-700 hover:opacity-80 transition-opacity font-medium'
              >
                Our Story
              </Link>
              <Link
                href='/venue'
                className='text-gray-700 hover:opacity-80 transition-opacity font-medium'
              >
                Venue
              </Link>
              <Button
                asChild
                size='sm'
                className='bg-gray-900 hover:bg-gray-800'
              >
                <Link href='/rsvp'>RSVP</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className='md:hidden'>
              <Button
                variant='ghost'
                size='sm'
                onClick={toggleMenu}
                className='p-2 text-gray-900 hover:bg-gray-100'
                aria-label='Toggle menu'
              >
                {isMenuOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className='md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'>
          <div className='bg-white h-full flex flex-col'>
            {/* Header with close button */}
            <div className='flex justify-between items-center p-4 border-b border-gray-200'>
              <span className='text-xl font-semibold text-gray-900'>
                Nicole & Lashca
              </span>
              <Button
                variant='ghost'
                size='sm'
                onClick={closeMenu}
                className='p-2'
                aria-label='Close menu'
              >
                <X className='h-5 w-5' />
              </Button>
            </div>

            {/* Navigation Links */}
            <div className='flex-1 flex flex-col justify-center space-y-8 px-8'>
              <Link
                href='/our-story'
                className='text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors text-center py-4'
                onClick={closeMenu}
              >
                Our Story
              </Link>
              <Link
                href='/venue'
                className='text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors text-center py-4'
                onClick={closeMenu}
              >
                Venue
              </Link>
              <div className='px-4'>
                <Button
                  asChild
                  size='lg'
                  className='w-full bg-gray-900 hover:bg-gray-800 text-lg py-6'
                >
                  <Link href='/rsvp' onClick={closeMenu}>
                    RSVP
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
