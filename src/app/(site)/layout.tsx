import type { ReactNode } from "react";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import SaveDateBanner from "@/components/site/SaveDateBanner";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen'>
      <a href='#main-content' className='skip-link'>
        Skip to content
      </a>
      <SaveDateBanner />
      <Header />
      <main id='main-content'>{children}</main>
      <Footer />
    </div>
  );
}
