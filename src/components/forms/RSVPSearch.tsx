"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  RSVPSearchSchema,
  type RSVPSearchFormData,
  validateSearchField,
} from "@/lib/validations";
import { publicApiClient } from "@/lib/api";
import { Attendee } from "@/types";
import { rsvpToasts } from "@/lib/toastUtils";

interface RSVPSearchProps {
  onAttendeeSelect: (attendee: Attendee) => void;
}

export default function RSVPSearch({ onAttendeeSelect }: RSVPSearchProps) {
  const [searchResults, setSearchResults] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [realtimeError, setRealtimeError] = useState<string | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<RSVPSearchFormData>({
    resolver: zodResolver(RSVPSearchSchema),
    mode: "onChange", // Enable real-time validation
  });

  // Watch the name field for real-time validation
  const nameValue = watch("name");

  // Real-time validation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validationError = validateSearchField(value);
    setRealtimeError(validationError);

    // Clear previous search results and errors when typing
    if (hasSearched) {
      setSearchResults([]);
      setError(null);
      setHasSearched(false);
    }
  };

  const onSubmit = async (data: RSVPSearchFormData) => {
    setIsLoading(true);
    setError(null);
    setRealtimeError(undefined);
    setHasSearched(true);

    try {
      console.log("Searching for:", data.name);
      const results = await publicApiClient.searchAttendees(data.name);
      console.log("Search results:", results);
      setSearchResults(results);

      if (results.length === 0) {
        rsvpToasts.searchEmpty();
      } else {
        rsvpToasts.searchSuccess(results.length);
      }
    } catch (err) {
      console.error("Search error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to search for attendees";
      setError(errorMessage);
      setSearchResults([]);
      rsvpToasts.searchError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = realtimeError || errors.name?.message;

  return (
    <div className='space-y-12'>
      {/* Elegant Search Input */}
      <div className='max-w-lg mx-auto'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6'
          role='search'
        >
          <div className='relative'>
            <label htmlFor='name-search' className='sr-only'>
              Search for your invitation by name
            </label>
            <Input
              id='name-search'
              {...register("name", {
                onChange: handleNameChange,
              })}
              placeholder='Enter your name or surname...'
              className={`w-full h-14 px-6 text-center text-lg font-light bg-white/80 border-stone-200 rounded-full shadow-sm focus:border-stone-400 focus:ring-stone-400/20 placeholder:text-stone-400 transition-colors ${
                displayError
                  ? "border-red-300 focus:border-red-400 focus:ring-red-400/20"
                  : ""
              }`}
              aria-invalid={!!displayError}
              aria-describedby={displayError ? "name-error" : "name-help"}
              autoComplete='name'
            />
            <div id='name-help' className='sr-only'>
              Enter your first name, last name, or surname to find your wedding
              invitation
            </div>
            {displayError && (
              <p
                id='name-error'
                className='text-red-500 text-sm mt-2 text-center font-light'
                role='alert'
                aria-live='polite'
              >
                {displayError}
              </p>
            )}
          </div>
          <div className='text-center'>
            <Button
              type='submit'
              disabled={isLoading || !!displayError || !nameValue?.trim()}
              className='px-8 py-3 bg-stone-800 hover:bg-stone-700 text-white font-light tracking-wide rounded-full transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2'
              aria-describedby='search-button-help'
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <LoadingSpinner size='sm' />
                  <span aria-live='polite'>Searching...</span>
                </div>
              ) : (
                "Find Invitation"
              )}
            </Button>
            <div id='search-button-help' className='sr-only'>
              Click to search for your wedding invitation
            </div>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className='flex justify-center py-12'
          role='status'
          aria-live='polite'
        >
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
        <div
          className='max-w-md mx-auto text-center py-8'
          role='alert'
          aria-live='assertive'
        >
          <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
            <p className='text-red-600 font-light'>{error}</p>
          </div>
        </div>
      )}

      {/* No Results */}
      {hasSearched && !isLoading && !error && searchResults.length === 0 && (
        <div
          className='max-w-md mx-auto text-center py-8'
          role='status'
          aria-live='polite'
        >
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
            <p className='sr-only'>
              {searchResults.length} invitation
              {searchResults.length !== 1 ? "s" : ""} found. Use arrow keys to
              navigate and Enter to select.
            </p>
          </div>
          <div
            className='grid gap-4'
            role='listbox'
            aria-label='Search results'
          >
            {searchResults.map((attendee, index) => (
              <Card
                key={attendee.id}
                className='cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border-stone-200 bg-white/90 backdrop-blur-sm group focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2'
                onClick={() => {
                  onAttendeeSelect(attendee);
                  rsvpToasts.attendeeSelected(
                    `${attendee.firstName} ${attendee.lastName}`
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onAttendeeSelect(attendee);
                    rsvpToasts.attendeeSelected(
                      `${attendee.firstName} ${attendee.lastName}`
                    );
                  }
                }}
                tabIndex={0}
                role='option'
                aria-selected={false}
                aria-label={`Select ${attendee.firstName} ${
                  attendee.lastName
                }, ${attendee.email}, status: ${attendee.rsvpStatus}${
                  attendee.groupId ? ", group invitation" : ""
                }`}
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
