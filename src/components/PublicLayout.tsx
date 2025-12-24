import PublicNavigation from "./PublicNavigation";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <PublicNavigation />
      <main>{children}</main>
    </>
  );
}
