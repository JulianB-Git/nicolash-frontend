import PlaceholderPage from "@/components/PlaceholderPage";
import PublicLayout from "@/components/PublicLayout";
import { MapPin } from "lucide-react";

export default function VenuePage() {
  return (
    <PublicLayout>
      <PlaceholderPage
        title='Venue'
        description="Discover the beautiful location where Nicole & Lashca will say 'I do' and celebrate their special day."
        icon={<MapPin className='h-8 w-8 text-blue-500' />}
      />
    </PublicLayout>
  );
}
