import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Cinzel, Fraunces, Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nicole Carew & Lashca Pieterse | 1 April 2026",
  description:
    "Join Nicole Carew and Lashca Pieterse at Nibbana Farm, Boontjiesrivier Rd Wolseley on 1 April 2026.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Nicole Carew & Lashca Pieterse",
    description:
      "A modern garden-party celebration at Nibbana Farm, Boontjiesrivier Rd Wolseley on 1 April 2026.",
    type: "website",
    images: [
      {
        url: "/images/wedding/leading.jpg",
        width: 1200,
        height: 630,
        alt: "Nicole Carew and Lashca Pieterse wedding",
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
        <body
          className={`${inter.variable} ${fraunces.variable} ${cinzel.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
