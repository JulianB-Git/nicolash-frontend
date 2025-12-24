"use client";

import { useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import RSVPSearch from "@/components/forms/RSVPSearch";
import RSVPForm from "@/components/forms/RSVPForm";
import AttendeeCard from "@/components/AttendeeCard";
import GroupRSVPForm from "@/components/forms/GroupRSVPForm";
import { Attendee, GroupWithMembers } from "@/types";

export default function RSVPPage() {
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(
    null
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
      (member) => member.id === selectedAttendee?.id
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
    <PublicLayout>
      <div className='min-h-screen bg-gradient-to-b from-stone-50 to-white'>
        <div className='container mx-auto px-4 py-16 max-w-4xl'>
          {!selectedAttendee ? (
            <div className='text-center space-y-12'>
              {/* Elegant Header */}
              <div className='space-y-8'>
                <div className='flex justify-center'>
                  <div className='w-16 h-px bg-stone-300'></div>
                </div>

                <div className='space-y-4'>
                  <h1 className='text-6xl md:text-7xl font-serif text-stone-800 tracking-wide'>
                    Nicole & Lashca
                  </h1>
                  <p className='text-stone-600 text-lg tracking-widest uppercase font-light'>
                    We're Getting Married!
                  </p>
                </div>

                <div className='flex justify-center'>
                  <div className='w-16 h-px bg-stone-300'></div>
                </div>

                <div className='space-y-2 text-stone-700'>
                  <p className='text-2xl font-light'>April 1st, 2026</p>
                  <p className='text-stone-500 font-light'>
                    Nibbana Farm, Tulbagh, South Africa
                  </p>
                </div>
              </div>

              {/* RSVP Section */}
              <div className='space-y-8 max-w-2xl mx-auto'>
                <div className='space-y-4'>
                  <h2 className='text-4xl font-serif text-stone-800'>
                    Join Us
                  </h2>
                  <p className='text-stone-600 uppercase tracking-widest text-sm font-light'>
                    Find Your Invitation
                  </p>
                </div>

                <RSVPSearch onAttendeeSelect={handleAttendeeSelect} />
              </div>
            </div>
          ) : showRSVPForm ? (
            <div className='max-w-2xl mx-auto space-y-8'>
              <div className='text-center space-y-4'>
                <div className='flex justify-center'>
                  <div className='w-16 h-px bg-stone-300'></div>
                </div>
                <h1 className='text-4xl font-serif text-stone-800'>
                  Submit Your RSVP
                </h1>
                <button
                  onClick={handleBackToSearch}
                  className='text-stone-500 hover:text-stone-700 text-sm font-light tracking-wide transition-colors'
                >
                  ← Back to search
                </button>
              </div>
              <RSVPForm
                attendee={selectedAttendee}
                onSuccess={handleRSVPSuccess}
                onCancel={handleRSVPCancel}
              />
            </div>
          ) : showGroupRSVPForm ? (
            <div className='max-w-3xl mx-auto space-y-8'>
              <div className='text-center space-y-4'>
                <div className='flex justify-center'>
                  <div className='w-16 h-px bg-stone-300'></div>
                </div>
                <h1 className='text-4xl font-serif text-stone-800'>
                  Submit Group RSVP
                </h1>
                <button
                  onClick={handleBackToSearch}
                  className='text-stone-500 hover:text-stone-700 text-sm font-light tracking-wide transition-colors'
                >
                  ← Back to search
                </button>
              </div>
              <GroupRSVPForm
                attendee={selectedAttendee}
                onSuccess={handleGroupRSVPSuccess}
                onCancel={handleRSVPCancel}
              />
            </div>
          ) : (
            <div className='max-w-2xl mx-auto space-y-8'>
              <div className='text-center space-y-4'>
                <div className='flex justify-center'>
                  <div className='w-16 h-px bg-stone-300'></div>
                </div>
                <h1 className='text-4xl font-serif text-stone-800'>
                  Your Invitation
                </h1>
                <button
                  onClick={handleBackToSearch}
                  className='text-stone-500 hover:text-stone-700 text-sm font-light tracking-wide transition-colors'
                >
                  ← Back to search
                </button>
              </div>
              <AttendeeCard
                attendee={selectedAttendee}
                onRSVPClick={handleRSVPClick}
                onGroupRSVPClick={
                  selectedAttendee.groupId ? handleGroupRSVPClick : undefined
                }
              />
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
