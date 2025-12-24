import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
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
          <ErrorBoundary>{children}</ErrorBoundary>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
