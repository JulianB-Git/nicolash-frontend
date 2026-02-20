"use client";

import { useState } from "react";
import RSVPSearch from "@/components/forms/RSVPSearch";
import RSVPForm from "@/components/forms/RSVPForm";
import AttendeeCard from "@/components/AttendeeCard";
import GroupRSVPForm from "@/components/forms/GroupRSVPForm";
import ErrorBoundary from "@/components/ErrorBoundary";
import { RSVPSearchFallback } from "@/components/FallbackUI";
import { Attendee, GroupWithMembers } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RSVPPage() {
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(
    null,
  );
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [showGroupRSVPForm, setShowGroupRSVPForm] = useState(false);

  const handleAttendeeSelect = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setShowRSVPForm(false);
    setShowGroupRSVPForm(false);
  };

  const handleRSVPClick = () => {
    setShowRSVPForm(true);
    setShowGroupRSVPForm(false);
  };

  const handleGroupRSVPClick = () => {
    setShowGroupRSVPForm(true);
    setShowRSVPForm(false);
  };

  const handleRSVPSuccess = (updatedAttendee: Attendee) => {
    setSelectedAttendee(updatedAttendee);
    setShowRSVPForm(false);
    setShowGroupRSVPForm(false);
  };

  const handleGroupRSVPSuccess = (updatedGroup: GroupWithMembers) => {
    // Find the current attendee in the updated group
    const updatedAttendee = updatedGroup.members.find(
      (member) => member.id === selectedAttendee?.id,
    );
    if (updatedAttendee) {
      setSelectedAttendee(updatedAttendee);
    }
    setShowRSVPForm(false);
    setShowGroupRSVPForm(false);
  };

  const handleRSVPCancel = () => {
    setShowRSVPForm(false);
    setShowGroupRSVPForm(false);
  };

  const handleBackToSearch = () => {
    setSelectedAttendee(null);
    setShowRSVPForm(false);
    setShowGroupRSVPForm(false);
  };

  return (
    <div
      className='min-h-screen w-full overflow-hidden'
      style={{ backgroundColor: "var(--wedding-cream)" }}
    >
      <div className='container mx-auto px-4 py-16 md:py-24 max-w-4xl'>
        {!selectedAttendee ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center space-y-12 md:space-y-16'
          >
            {/* Elegant Header */}
            <div className='space-y-8'>
              <div className='flex justify-center'>
                <div
                  className='w-20 h-px'
                  style={{ backgroundColor: "var(--wedding-sage)" }}
                ></div>
              </div>

              <div className='space-y-6'>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className='text-7xl md:text-8xl lg:text-9xl font-normal'
                  style={{
                    fontFamily: "var(--font-great-vibes)",
                    color: "var(--wedding-sage)",
                  }}
                >
                  N & L
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className='font-lato text-lg tracking-widest  font-light'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Let us know if you will be attending.
                </motion.p>
              </div>

              <div className='flex justify-center'>
                <div
                  className='w-20 h-px'
                  style={{ backgroundColor: "var(--wedding-sage)" }}
                ></div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className='space-y-2'
                style={{ color: "var(--wedding-slate)" }}
              >
                <p className='font-lato text-2xl font-light'>April 1st, 2026</p>
                <p
                  className='font-lato text-base font-light'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Nibbana Farm, Tulbagh, South Africa
                </p>
              </motion.div>
            </div>

            {/* RSVP Section with Error Boundary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className='space-y-8 max-w-2xl mx-auto'
            >
              <div className='space-y-4'>
                <h2
                  className='font-playfair text-4xl md:text-5xl italic'
                  style={{ color: "var(--wedding-sage)" }}
                >
                  Find Your Invitation
                </h2>
                <p
                  className='font-lato text-base tracking-wide font-light'
                  style={{ color: "var(--wedding-slate)" }}
                >
                  Please enter your name to locate your invitation
                </p>
              </div>

              <ErrorBoundary
                context='RSVP Search'
                fallback={<RSVPSearchFallback />}
              >
                <RSVPSearch onAttendeeSelect={handleAttendeeSelect} />
              </ErrorBoundary>
            </motion.div>
          </motion.div>
        ) : showRSVPForm ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-2xl mx-auto space-y-8'
          >
            <div className='text-center space-y-6'>
              <div className='flex justify-center'>
                <div
                  className='w-16 h-px'
                  style={{ backgroundColor: "var(--wedding-sage)" }}
                ></div>
              </div>
              <h1
                className='font-playfair text-4xl md:text-5xl font-bold'
                style={{ color: "var(--wedding-dark-grey)" }}
              >
                Submit Your RSVP
              </h1>
              <button
                onClick={handleBackToSearch}
                className='font-lato text-sm font-light tracking-wide transition-colors flex items-center gap-2 mx-auto'
                style={{ color: "var(--wedding-slate)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--wedding-sage)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--wedding-slate)")
                }
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M10 19l-7-7m0 0l7-7m-7 7h18'></path>
                </svg>
                Back to search
              </button>
            </div>
            <ErrorBoundary context='RSVP Form'>
              <RSVPForm
                attendee={selectedAttendee}
                onSuccess={handleRSVPSuccess}
                onCancel={handleRSVPCancel}
              />
            </ErrorBoundary>
          </motion.div>
        ) : showGroupRSVPForm ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-3xl mx-auto space-y-8'
          >
            <div className='text-center space-y-6'>
              <div className='flex justify-center'>
                <div
                  className='w-16 h-px'
                  style={{ backgroundColor: "var(--wedding-sage)" }}
                ></div>
              </div>
              <h1
                className='font-playfair text-4xl md:text-5xl font-bold'
                style={{ color: "var(--wedding-dark-grey)" }}
              >
                Submit Group RSVP
              </h1>
              <button
                onClick={handleBackToSearch}
                className='font-lato text-sm font-light tracking-wide transition-colors flex items-center gap-2 mx-auto'
                style={{ color: "var(--wedding-slate)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--wedding-sage)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--wedding-slate)")
                }
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M10 19l-7-7m0 0l7-7m-7 7h18'></path>
                </svg>
                Back to search
              </button>
            </div>
            <ErrorBoundary context='Group RSVP Form'>
              <GroupRSVPForm
                attendee={selectedAttendee}
                onSuccess={handleGroupRSVPSuccess}
                onCancel={handleRSVPCancel}
              />
            </ErrorBoundary>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-2xl mx-auto space-y-8'
          >
            <div className='text-center space-y-6'>
              <div className='flex justify-center'>
                <div
                  className='w-16 h-px'
                  style={{ backgroundColor: "var(--wedding-sage)" }}
                ></div>
              </div>
              <h1
                className='font-playfair text-4xl md:text-5xl font-bold'
                style={{ color: "var(--wedding-dark-grey)" }}
              >
                Your Invitation
              </h1>
              <button
                onClick={handleBackToSearch}
                className='font-lato text-sm font-light tracking-wide transition-colors flex items-center gap-2 mx-auto'
                style={{ color: "var(--wedding-slate)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--wedding-sage)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--wedding-slate)")
                }
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M10 19l-7-7m0 0l7-7m-7 7h18'></path>
                </svg>
                Back to search
              </button>
            </div>
            <ErrorBoundary context='Attendee Card'>
              <AttendeeCard
                attendee={selectedAttendee}
                onRSVPClick={handleRSVPClick}
                onGroupRSVPClick={
                  selectedAttendee.groupId ? handleGroupRSVPClick : undefined
                }
              />
            </ErrorBoundary>
          </motion.div>
        )}
      </div>
    </div>
  );
}
