import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import "./globals.css";

export const metadata = {
  title: "Nicole & Lashca's Wedding | April 1, 2026",
  description:
    "Join us for our South of France inspired wedding at Nibbana Farm, Tulbagh on April 1, 2026",
  openGraph: {
    title: "Nicole & Lashca's Wedding",
    description: "Join us for our wedding celebration on April 1, 2026",
    type: "website",
    images: [
      {
        url: "/images/wedding/leading.jpg",
        width: 1200,
        height: 630,
        alt: "Nicole & Lashca's Wedding",
      },
    ],
  },
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
            href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&family=Great+Vibes&display=swap'
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
