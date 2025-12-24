"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import { RSVPSearchSchema, type RSVPSearchFormData } from "@/lib/validations";
import { publicApiClient } from "@/lib/api";
import { Attendee } from "@/types";

interface RSVPSearchProps {
  onAttendeeSelect: (attendee: Attendee) => void;
}

export default function RSVPSearch({ onAttendeeSelect }: RSVPSearchProps) {
  const [searchResults, setSearchResults] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RSVPSearchFormData>({
    resolver: zodResolver(RSVPSearchSchema),
  });

  const onSubmit = async (data: RSVPSearchFormData) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      console.log("Searching for:", data.name);
      const results = await publicApiClient.searchAttendees(data.name);
      console.log("Search results:", results);
      setSearchResults(results);
    } catch (err) {
      console.error("Search error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to search for attendees"
      );
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-12'>
      {/* Elegant Search Input */}
      <div className='max-w-lg mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='relative'>
            <Input
              {...register("name")}
              placeholder='Enter your name or surname...'
              className='w-full h-14 px-6 text-center text-lg font-light bg-white/80 border-stone-200 rounded-full shadow-sm focus:border-stone-400 focus:ring-stone-400/20 placeholder:text-stone-400'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-2 text-center font-light'>
                {errors.name.message}
              </p>
            )}
          </div>
          <div className='text-center'>
            <Button
              type='submit'
              disabled={isLoading}
              className='px-8 py-3 bg-stone-800 hover:bg-stone-700 text-white font-light tracking-wide rounded-full transition-all duration-200 shadow-sm hover:shadow-md'
            >
              {isLoading ? "Searching..." : "Find Invitation"}
            </Button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className='flex justify-center py-12'>
          <div className='space-y-4 text-center'>
            <LoadingSpinner text='' />
            <p className='text-stone-500 font-light tracking-wide'>
              Searching for your invitation...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className='max-w-md mx-auto text-center py-8'>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
            <p className='text-red-600 font-light'>{error}</p>
          </div>
        </div>
      )}

      {/* No Results */}
      {hasSearched && !isLoading && !error && searchResults.length === 0 && (
        <div className='max-w-md mx-auto text-center py-8'>
          <div className='space-y-4'>
            <div className='flex justify-center'>
              <div className='w-12 h-px bg-stone-300'></div>
            </div>
            <p className='text-stone-600 font-light leading-relaxed'>
              No invitations found with that name. Please try a different
              spelling or contact the hosts.
            </p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className='space-y-8 max-w-2xl mx-auto'>
          <div className='text-center space-y-4'>
            <div className='flex justify-center'>
              <div className='w-12 h-px bg-stone-300'></div>
            </div>
            <h3 className='text-2xl font-serif text-stone-800'>
              Select Your Name
            </h3>
          </div>
          <div className='grid gap-4'>
            {searchResults.map((attendee) => (
              <Card
                key={attendee.id}
                className='cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border-stone-200 bg-white/90 backdrop-blur-sm group'
                onClick={() => onAttendeeSelect(attendee)}
              >
                <CardContent className='p-4'>
                  <div className='text-center space-y-2'>
                    {/* Name */}
                    <h4 className='font-serif text-xl text-stone-800 group-hover:text-stone-900 transition-colors duration-200'>
                      {attendee.firstName} {attendee.lastName}
                    </h4>

                    {/* Email */}
                    <p className='text-stone-500 font-light text-sm'>
                      {attendee.email}
                    </p>

                    {/* Group Indicator & Status in same row */}
                    <div className='flex items-center justify-center gap-3 pt-1'>
                      {attendee.groupId && (
                        <span className='text-xs text-stone-400 font-light tracking-wide uppercase'>
                          Group Invitation
                        </span>
                      )}

                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-light tracking-wide border ${
                          attendee.rsvpStatus === "accepted"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : attendee.rsvpStatus === "declined"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {attendee.rsvpStatus === "pending"
                          ? "Awaiting Response"
                          : attendee.rsvpStatus === "accepted"
                          ? "Accepted"
                          : "Declined"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
