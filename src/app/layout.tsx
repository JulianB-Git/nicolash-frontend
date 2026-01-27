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
        <head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap'
            rel='stylesheet'
          />
        </head>
        <body className='antialiased'>
          <ErrorBoundary context='Application Root'>{children}</ErrorBoundary>
          <Toaster />
          <PerformanceMonitor />
        </body>
      </html>
    </ClerkProvider>
  );
}
