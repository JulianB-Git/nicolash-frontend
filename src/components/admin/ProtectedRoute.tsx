"use client";

import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoadingSpinner size='lg' text='Loading...' />
      </div>
    );
  }

  // Show authentication prompt if not signed in
  if (!isSignedIn) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto px-4'>
          <h1 className='text-2xl font-bold mb-4'>Admin Access Required</h1>
          <p className='text-muted-foreground mb-6'>
            Please sign in to access the admin dashboard.
          </p>
          <SignInButton mode='modal'>
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  // Show admin content with user button for signed-in users
  return (
    <div className='min-h-screen'>
      <header className='border-b bg-background'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold'>Wedding Admin Dashboard</h1>
            <p className='text-sm text-muted-foreground'>
              Manage attendees and RSVP responses
            </p>
          </div>
          <UserButton />
        </div>
      </header>
      <AdminNavigation />
      <main className='container mx-auto px-4 py-6'>{children}</main>
    </div>
  );
}
