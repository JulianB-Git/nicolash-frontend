import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AdminFallback } from "@/components/FallbackUI";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary context='Admin Dashboard' fallback={<AdminFallback />}>
      <ProtectedRoute>{children}</ProtectedRoute>
    </ErrorBoundary>
  );
}
