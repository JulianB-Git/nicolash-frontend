import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding RSVP",
  description: "RSVP for our wedding celebration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className='antialiased'>
          <ErrorBoundary context='Application Root'>{children}</ErrorBoundary>
          <Toaster />
          <PerformanceMonitor />
        </body>
      </html>
    </ClerkProvider>
  );
}
