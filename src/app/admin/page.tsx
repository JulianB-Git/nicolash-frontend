"use client";

import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AttendeeListFallback } from "@/components/FallbackUI";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load admin components for better performance
const AdminStats = lazy(() => import("@/components/admin/AdminStats"));
const AttendeeList = lazy(() => import("@/components/admin/AttendeeList"));

export default function AdminPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold mb-2'>Dashboard Overview</h2>
        <p className='text-muted-foreground'>
          Monitor RSVP responses and manage your guest list.
        </p>
      </div>

      {/* Statistics Cards with Error Boundary and Lazy Loading */}
      <ErrorBoundary context='Admin Statistics'>
        <Suspense fallback={<LoadingSpinner text='Loading statistics...' />}>
          <AdminStats />
        </Suspense>
      </ErrorBoundary>

      {/* Attendee List with Error Boundary and Lazy Loading */}
      <ErrorBoundary
        context='Attendee List'
        fallback={<AttendeeListFallback />}
      >
        <Suspense fallback={<LoadingSpinner text='Loading attendees...' />}>
          <AttendeeList />
        </Suspense>
      </ErrorBoundary>

      {/* Quick Actions */}
      <div className='grid gap-4 md:grid-cols-3'>
        <div className='rounded-lg border p-6'>
          <h3 className='font-semibold mb-2'>Recent Activity</h3>
          <p className='text-sm text-muted-foreground'>
            View the latest RSVP responses and changes.
          </p>
        </div>

        <div className='rounded-lg border p-6'>
          <h3 className='font-semibold mb-2'>Quick Upload</h3>
          <p className='text-sm text-muted-foreground'>
            Bulk upload attendees from a CSV file.
          </p>
        </div>

        <div className='rounded-lg border p-6'>
          <h3 className='font-semibold mb-2'>Group Management</h3>
          <p className='text-sm text-muted-foreground'>
            Create and manage invitation groups.
          </p>
        </div>
      </div>
    </div>
  );
}
