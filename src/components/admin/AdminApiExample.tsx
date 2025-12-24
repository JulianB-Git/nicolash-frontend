"use client";

import { useState } from "react";
import { useAuthenticatedApi } from "@/lib/useAuthenticatedApi";
import { handleAPIError } from "@/lib/apiUtils";
import { Attendee } from "@/types";

/**
 * Example component demonstrating how to use the authenticated API client
 * in admin components. This shows proper error handling for authentication
 * and authorization errors.
 */
export default function AdminApiExample() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiClient = useAuthenticatedApi();

  const fetchAttendees = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getAttendees(1, 10);
      setAttendees(response.attendees);
    } catch (err) {
      const errorMessage = handleAPIError(
        err,
        () => {
          // Handle authentication error - could redirect to sign-in
          console.log("Authentication required");
        },
        () => {
          // Handle authorization error - show access denied message
          console.log("Access denied");
        }
      );
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createAttendee = async () => {
    setLoading(true);
    setError(null);

    try {
      const newAttendee = await apiClient.createAttendee({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
      });

      setAttendees((prev) => [...prev, newAttendee]);
    } catch (err) {
      const errorMessage = handleAPIError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Admin API Example</h2>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
        </div>
      )}

      <div className='space-x-2 mb-4'>
        <button
          onClick={fetchAttendees}
          disabled={loading}
          className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
        >
          {loading ? "Loading..." : "Fetch Attendees"}
        </button>

        <button
          onClick={createAttendee}
          disabled={loading}
          className='bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50'
        >
          {loading ? "Creating..." : "Create Test Attendee"}
        </button>
      </div>

      <div>
        <h3 className='text-lg font-medium mb-2'>
          Attendees ({attendees.length})
        </h3>
        <ul className='space-y-2'>
          {attendees.map((attendee) => (
            <li key={attendee.id} className='border p-2 rounded'>
              {attendee.firstName} {attendee.lastName} - {attendee.email} (
              {attendee.rsvpStatus})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
