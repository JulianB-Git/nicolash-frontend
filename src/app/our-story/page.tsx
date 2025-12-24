import PlaceholderPage from "@/components/PlaceholderPage";
import PublicLayout from "@/components/PublicLayout";
import { Heart } from "lucide-react";

export default function OurStoryPage() {
  return (
    <PublicLayout>
      <PlaceholderPage
        title='Our Story'
        description="Learn about Nicole & Lashca's journey together and how their love story began."
        icon={<Heart className='h-8 w-8 text-red-500' />}
      />
    </PublicLayout>
  );
}
